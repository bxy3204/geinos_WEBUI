import React, { Component } from 'react';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import './Devices.css';
import {add_device, get_devices,delete_device, retrieve_config} from "../REST_API/Devices_API";
import SkyLight from 'react-skylight';
import {verify_token} from "../REST_API/Login_API";



let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_device(rowKeys)
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
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.addDevice = this.addDevice.bind(this);
        this.state = {
            device_model: '',
            name: '',
            serial:'',
            deviceList:'',
            location:'',
            scep:'False',
            device_models: [],
            devices: [],
            status: '',
            message: '',
            content: '',
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

    componentDidMount() {
        verify_token().then((status) =>{
            if(!status){
                window.location.replace(window.location.origin.toString());
            }
        });
        get_devices().then((items) => {

                for (var i = 0; i < items.data.length; i++) {
                    console.log("thing" + items.data[i]["serial_number"]);
                }
                this.setState({devices: items.data});
                console.log(items.data);
            }
        ).catch(err => {
            console.log(err);
        });
    }

    addDevice(){
        const newDevice={
            name: this.state.name,
            model: this.state.device_model.value,
            serial: this.state.serial,
            location: this.state.location,
            scep: this.state.scep,

        };
        add_device(newDevice).then((fetched) => {
            fetched.json().then((data) => {
                console.log("data" + data);
               // this.setState({message:data.message});
                /*
                Status codes between 400 and 500 are being forced to 400 because
                they map to a specific CSS style class labeled with that status code.
                The style name is used in render().
                 */
                this.setState({message:data.message});
                if(data.status >= 400 && data.status < 500){
                    this.setState({status:400});
                }
                else if(data.status >= 200 && data.status < 300){
                    this.setState({status:200});
                } else {
                    //any other status than success or error will be treated as 102, informational
                    // this reflects in the css file to ensure proper message notification
                    this.setState({status:102});
                }
                this.componentDidMount();
            });
        });
        //window.location.replace(window.location.origin.toString());;
        this.setState({name : ''});
        this.setState({serial : ''});
        this.setState({location : ''});
        this.setState({scep : ''});
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleChange = (device_model) => {
        this.setState({ device_model });
    }

    handleCheckboxChange(e) {
        this.setState({scep:  e.target.checked ? 'TRUE' : 'FALSE'});
    }

    faxformat(cell, row){
        this.simpleDialog.show();
        this.setState({content:"Loading..."});
        console.log(row);
        retrieve_config(row["serial_number"]).then((fetched) => {
            fetched.json().then((data) => {
                console.log(data)
                console.log("data" + data.data);
                this.setState({content:data.data});

            });
        }).catch((error) => {
            console.log('error: ' + error);
        });
    }
    cellButton(cell, row, enumObject, rowIndex) {
        return       <div>
            <section>
                <button onClick={() => this.faxformat(cell, row)}>Open</button>
            </section>
            <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Config File">
                {this.state.content}
            </SkyLight>
        </div>;
    }
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
                <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
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

                <FormGroup
                    className = {'scep-input'}
                    controlId="scep"
                >
                    <ControlLabel>SCEP</ControlLabel>

                    <FormControl
                        type="checkbox"
                        value={this.state.scep}
                        onChange={this.handleCheckboxChange}
                    />
                </FormGroup>


                <Button className="button-add-submit" disabled = {!complete} onClick={this.addDevice} type="submit">Add</Button>
                <Button className="button-import-submit" type="submit">Import</Button>
                <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination search>
                    <TableHeaderColumn dataField="vendor_id"  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="model_number"  width="150" dataSort>Model</TableHeaderColumn>
                    <TableHeaderColumn dataField="serial_number"  isKey={true}  width="200" dataSort >Serial-Number</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.cellButton.bind(this)} width="150" >Config File</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}

export default Devices;