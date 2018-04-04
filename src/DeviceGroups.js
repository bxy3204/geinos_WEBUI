import React, { Component } from 'react';
import './DeviceGroups.css';
import {FormGroupCreate} from "./common";
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


const products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys)

}
const options = {
    afterDeleteRow: onDeleteRow
};

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};

class DeviceGroups extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: '',
            filter:''
        }

    }
    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }
    render() {
        return (
            <div className="container">
                <div className="Home">
                    <h2>Device Groups</h2>
                </div>
                <FormGroupCreate
                    className="group-name-input"
                    controlId="group-name"
                    label="Group Name"
                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter group name"
                    type="text"
                />
                <FormGroupCreate
                    className="filter-input"
                    controlId="filter"
                    label="Filter"
                    value={this.state.filter}
                    change={this.handleChange}
                    type="text"
                />
                <Button className="button-group-submit" type="submit">Add Device Group</Button>
                <BootstrapTable className="table-group" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="devices"  width="150" dataSort>Devices</TableHeaderColumn>
                    <TableHeaderColumn dataField="last-modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                    <TableHeaderColumn dataField="staged"  width="200" dataSort >Staged</TableHeaderColumn>
                    <TableHeaderColumn dataField="provisioned"  width="200" dataSort >Provisioned</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DeviceGroups;