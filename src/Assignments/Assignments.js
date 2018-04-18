import React, { Component } from 'react';
import './Assignments.css';
import Select from 'react-select'
import {DropdownTemplate} from "../common/common";
import { Button, ControlLabel} from 'react-bootstrap'
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


class Assignments extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            template: '',
            group: ''
        }
    }
    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }
    render() {
        return (
            <div className="container">
                <div className="Home">
                    <h2>Assignments</h2>
                </div>
                <ControlLabel className="label-template">Template Name</ControlLabel>
                <Select
                    name="assignment-template-input"
                    value={this.state.template}
                    onChange={this.handleChange}
                />
                <ControlLabel className="label-group">Group</ControlLabel>
                <Select
                    name="assignment-group-input"
                    value={this.state.group}
                    onChange={this.handleChange}
                />
                <Button className="button-assign-submit" type="submit">Assign</Button>
                <BootstrapTable className="table-assign" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="templateName" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="groupName"  width="150" dataSort>Devices</TableHeaderColumn>
                    <TableHeaderColumn dataField="last-modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Assignments;