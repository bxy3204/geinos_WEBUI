import React, { Component } from 'react';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import './Devices.css';



const products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys)
    /*   const data = new FormData(event.target);
        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });*/
}



const options = {
    afterDeleteRow: onDeleteRow
};

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};




class Devices extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {
            selectedOption: '',
            name: '',
            serial:''
        }

    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }


    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        let device = ['MDS Orbit ECR','MDS Orbit MCR'];
        let devices = [];
        for(let i=0; i<device.length; i++){
            let user={
                value: device[i],
                label: device[i]
            };
            devices.push(user);
        }
        return (
            <div className="container">
            <FormGroup
                className="name-input"
                controlId="name"
            >
                <ControlLabel>Name</ControlLabel>

                <FormControl
                    type="text"
                    value={this.state.name}
                    placeholder="Enter Device Name"
                    onChange={this.handleNameChange}
                />
            </FormGroup>
                <ControlLabel>Model</ControlLabel>
            <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={devices}
            />

                <FormGroup
                    className="serial-input"
                    controlId="serial"
                >
                    <ControlLabel>Serial</ControlLabel>

                    <FormControl
                        type="text"
                        value={this.state.serial}
                        placeholder="Enter Serial Number"
                        onChange={this.handleNameChange}
                    />
                </FormGroup>
                <Button className="button-add-submit" type="submit">Add Device</Button>
                <Button className="button-import-submit" type="submit">Import from file</Button>
                <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="model"  width="150" dataSort>Model</TableHeaderColumn>
                    <TableHeaderColumn dataField="serial"  width="200" dataSort >Serial-Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="group"  width="150" dataSort >Group</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}


export default Devices;