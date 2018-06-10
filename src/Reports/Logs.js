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
                    <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="type"  width="150" dataSort>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="para"  width="200" dataSort >Value</TableHeaderColumn>
                    <TableHeaderColumn dataField="modified"  width="150" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
        );
    }
}

export default Logs;