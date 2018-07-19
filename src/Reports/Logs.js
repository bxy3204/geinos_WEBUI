import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import {get_logs} from "../REST_API/Logs_API";
import {verify_token} from "../REST_API/Login_API";

class Logs extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            logs:[]
        }
    }

    componentWillMount() {
    	console.log("BBBB!!!");
        let logs = [];
        this.setState({logs:logs});
    }

    componentDidMount() {
        verify_token().then((status) =>{
            if(!status){
                window.location.replace(window.location.origin.toString());
            }
        });
        get_logs().then((items) => {
                this.setState({logs: items.data});
            }
        );
    }

    render() {
        const options = {
            defaultSortName: 'date_created',
            defaultSortOrder: 'desc'
        };
    	let List = this.state.logs;

        return (
                <div className="container">
                <BootstrapTable className="table-logs" data={this.state.logs} options={options}   striped={true} hover={true} pagination>
                    <TableHeaderColumn dataField="user" isKey={true}  width="150"  dataSort>User</TableHeaderColumn>
                    <TableHeaderColumn dataField="IP"  width="150" dataSort>IP</TableHeaderColumn>
                    <TableHeaderColumn dataField="log_message"  width="300" dataSort >Event</TableHeaderColumn>
                    <TableHeaderColumn dataField="event_type"  width="300" dataSort >Event Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="date_created"  width="150" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
                </div>
        );
    }
}

export default Logs;