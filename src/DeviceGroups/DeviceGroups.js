import React, { Component } from 'react';
import './DeviceGroups.css';
import {create_devicegroup_list, FormGroupCreate} from "../common/common";
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {add_device_group, get_device_groups,delete_group} from "../REST_API/DeviceGroups_API";
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Select from 'react-select';


let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_group(rowKeys[0]);

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
        let device_models = ['MDS Orbit ECR', 'MDS Orbit MCR-4E2S', 'MDS Orbit MCR-2E1S', 'MDS Orbit MCR-1E2S'];
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

    renderTypeField() {
        if (this.state.filterType.localeCompare("model") == 0)
        {
            return <div>
                <ControlLabel>Value</ControlLabel> <ControlLabel className="asterisk">  * </ControlLabel>
                <Select
                    className={'form-field-name' }
                    value={this.state.device_model}
                    onChange={this.handleModelChange}
                    required="true"
                    options={this.state.device_models}
                />
            </div>
        }
        else
        {
            return <div>
                <FormGroupCreate
                    className={ 'group-name-input'}
                    controlId="device_model"
                    label="Value"

                    value={this.state.device_model}
                    change={this.handleChange}
                    placeholder="Enter value"
                    type="text"
                    required="true"
                />
            </div>
        }
    }

    addGroup(){
        const newGroup={
            name: this.state.name,
            attribute: 'model',
        };

        if (this.state.filterType.localeCompare("model") == 0)
        {
            newGroup.attribute = 'model';
            newGroup.value = this.state.device_model.value
        }
        else
        {
            newGroup.attribute = 'other';
            newGroup.value = this.state.device_model
        }

        add_device_group(newGroup);
        this.setState({name: ''});
        this.componentDidMount();
        //window.location.reload();
    }
    componentDidMount() {
        get_device_groups().then((items) => {
                this.setState({deviceGroups: items.data});
            }
        );
    }

    render() {
        products = this.state.deviceGroups;
        const nameLink = this.state.name, nameIsValid = nameLink && nameLink !== "";
        const valueLink = this.state.device_model.value, valueIsValid = valueLink && valueLink !== "";

        var complete = false;
        if (nameIsValid){
            complete = true;
        }

        return (
            <div className="container">
                <div className="Home">
                    <h2>Device Groups</h2>
                </div>
                <FormGroupCreate
                    className={ 'group-name-input'}
                    controlId="name"
                    label="Group Name"

                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter group name"
                    type="text"
                    required="true"
                />

                <FormGroup
                    className="group-type-input"
                    controlId="filterType"
                >
                    <ControlLabel>Group By</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                        <option value="model">Model</option>
                        <option value="other">Other</option>
                    </FormControl>
                </FormGroup>

                {this.renderTypeField()}

                <Button className="button-group-submit" disabled = {!complete} type="submit" onClick={this.addGroup}>Add</Button>
                <BootstrapTable className="table-group" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="device_group_name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="template_name"  width="150" dataSort>Template</TableHeaderColumn>
                    <TableHeaderColumn dataField="last_modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                    <TableHeaderColumn dataField="staged"  width="200" dataSort >Staged</TableHeaderColumn>
                    <TableHeaderColumn dataField="provisioned"  width="200" dataSort >Provisioned</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DeviceGroups;