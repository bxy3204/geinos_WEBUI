import React, { Component } from 'react';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import './Devices.css';
import {add_device, get_devices,delete_device} from "../REST_API/Devices_API";
import {create_device_list} from "../common/common";



let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_device(rowKeys[0])
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
        this.addDevice = this.addDevice.bind(this);
        this.state = {
            device_model: '',
            name: '',
            serial:'',
            deviceList:'',
            location:'',
            device_models: [],
            devices: [],
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

    componentDidMount() {
        get_devices().then((items) => {
                this.setState({devices: items.data});
            }
        );
    }

    addDevice(){
        const newDevice={
            name: this.state.name,
            model: this.state.device_model.value,
            serial: this.state.serial,
            location: this.state.location,
        };
        add_device(newDevice);
        //window.location.reload();
        this.forceUpdate();
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleChange = (device_model) => {
        this.setState({ device_model });
    };
    render() {
        products = this.state.devices;
        const modelLink = this.state.device_model, modelIsValid = modelLink;
        const serialLink = this.state.serial, serialIsValid = serialLink && serialLink.indexOf( ' ' ) < 0;
        var complete = false;
        if (modelIsValid && serialIsValid){
            complete = true;
        }

        return (
            <div className="container">
                <div className="Home">
                    <h2>Devices</h2>
                </div>

            <FormGroup
                className = {'devicename-input'}
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

                <ControlLabel>Model </ControlLabel><ControlLabel className="asterisk">   * </ControlLabel>
            <Select
                className = {'model-input'}
                name="form-field-name"
                value={this.state.device_model}
                onChange={this.handleChange}
                options={this.state.device_models}
            />

                <FormGroup
                    className = {'serial-input'}
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

                <FormGroup
                    className = {'serial-input'}
                    controlId="location"
                >
                    <ControlLabel>Location</ControlLabel>

                    <FormControl
                        type="text"
                        value={this.state.location}
                        placeholder="Enter Location"
                        onChange={this.handleNameChange}
                    />
                </FormGroup>


                <Button className="button-add-submit" disabled = {!complete} onClick={this.addDevice} type="submit">Add Device</Button>
                <Button className="button-import-submit" type="submit">Import from file</Button>
                <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="vendor_id"  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="model_number"  width="150" dataSort>Model</TableHeaderColumn>
                    <TableHeaderColumn dataField="serial_number"  isKey={true}  width="200" dataSort >Serial-Number</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}

export default Devices;