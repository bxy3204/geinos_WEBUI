import React, { Component } from 'react';
import './Assignments.css';
import {DropdownTemplate} from "./common";
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
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
                <DropdownTemplate
                    className="assignment-template-input"
                    controlId="assignment-template"
                    label="Template Name"
                    value={this.state.template}
                    change={this.handleChange}
                    placeholder="Enter template name"
                    type="text"
                />
                <DropdownTemplate
                    className="assignment-group-input"
                    controlId="assignment-group"
                    label="Group"
                    value={this.state.group}
                    change={this.handleChange}
                    type="text"
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