import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import {get_logs} from "../REST_API/Logs_API";

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
    	console.log("AA!!!!!!!");
        get_logs().then((items) => {
                this.setState({logs: items.data});
            }
        );
    }

    render() {
    	let List = this.state.logs;

        return (
                <BootstrapTable className="table-user" data={List}   striped={true} hover={true} pagination>
                    <TableHeaderColumn dataField="log_id" isKey={true}  width="150"  dataSort>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="user"  width="150" dataSort>User</TableHeaderColumn>
                    <TableHeaderColumn dataField="IP"  width="200" dataSort >IP</TableHeaderColumn>
                    <TableHeaderColumn dataField="log_message"  width="150" dataSort >Message</TableHeaderColumn>
                    <TableHeaderColumn dataField="date_created"  width="150" dataSort >Date Added</TableHeaderColumn>
                </BootstrapTable>
        );
    }
}

export default Logs;