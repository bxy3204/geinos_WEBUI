import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import {get_tasks} from "../REST_API/DeviceStatus_API";
import './DeviceStatus.css';
import {verify_token} from "../REST_API/Login_API";


class DeviceStatus extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            tasks:[]
        }
    }

    componentWillMount() {
        console.log("BBBB!!!");
        let tasks = [];
        this.setState({tasks:tasks});
    }

    componentDidMount() {
        verify_token().then((status) =>{
            if(!status){
                window.location.replace(window.location.origin.toString());
            }
        });
        get_tasks().then((items) => {
                console.log(items.data);
                this.setState({tasks: items.data});
            }
        );
    }

    render() {
        const options = {
            defaultSortName: 'status',
            defaultSortOrder: 'desc'
        };

        return (
            <div className="container-tasks">
                <BootstrapTable className="table-tasks" data={this.state.tasks} options={options}   striped={true} hover={true} pagination search>
                    <TableHeaderColumn dataField="serial_number" isKey={true}  width="150"  dataSort>Device</TableHeaderColumn>
                    <TableHeaderColumn dataField="status"  width="150" dataSort>Status</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DeviceStatus;