import React, { Component } from 'react';
import './DeviceGroups.css';
import {create_devicegroup_list, DropdownTemplate, FormGroupCreate} from "../common/common";
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {add_device_group, get_device_groups} from "../common/rest_api";
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Select from 'react-select';


let products = [];

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
        this.handleModelChange = this.handleModelChange.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.state = {
            name: '',
            filter:'',
            deviceGroups: '',
            filterType: '',
            device_model: '',
            device_models: []
        }

    }
    componentWillMount(){
        let device_models = ['MDS Orbit ECR','MDS Orbit MCR'];
        let devicetypes = [];
        for(let i=0; i<device_models.length; i++){
            let dev={
                value: device_models[i],
                label: device_models[i]
            };
            devicetypes.push(dev);
        }
        this.setState({device_models:devicetypes})
    }


    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }

    handleModelChange = (device_model) => {
        this.setState({ device_model });
    };

    addGroup(){
        const newGroup={
            name: this.state.name,
            attribute: 'model',
            value: this.state.device_model.value
        };
        console.log(newGroup);
        add_device_group(newGroup);
    }
    componentDidMount() {
        get_device_groups().then(result=> result.json()).then((items) => {
                this.setState({deviceGroups: items.data});
            }
        );
    }

    render() {
        products = create_devicegroup_list({items:this.state.deviceGroups});
        return (
            <div className="container">
                <div className="Home">
                    <h2>Device Groups</h2>
                </div>
                <FormGroupCreate
                    className="group-name-input"
                    controlId="name"
                    label="Group Name"
                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter group name"
                    type="text"
                />

                <FormGroup
                    className="group-type-input"
                    controlId="filterType"
                >
                    <ControlLabel>Group By</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>

                        <option value="model">Model</option>
                    </FormControl>
                </FormGroup>


                <ControlLabel>Value</ControlLabel>
                <Select
                    name="form-field-name"
                    value={this.state.device_model}
                    onChange={this.handleModelChange}
                    options={this.state.device_models}
                />



                <Button className="button-group-submit" type="submit" onClick={this.addGroup}>Add Device Group</Button>
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