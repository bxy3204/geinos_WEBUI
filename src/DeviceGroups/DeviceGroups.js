import React, { Component } from 'react';
import './DeviceGroups.css';
import {FormGroupCreate} from "../common/common";
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {add_device_group, get_device_groups,delete_group} from "../REST_API/DeviceGroups_API";
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Select from 'react-select';
import {verify_token} from "../REST_API/Login_API";
import ReactDOM from "react-dom";


let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_group(rowKeys).then((fetched) => {
        fetched.json().then((data) => {
            console.log(data);
            this.setState({message:data.message});
            /*
            Status codes between 400 and 500 are being forced to 400 because
            they map to a specific CSS style class labeled with that status code.
            The style name is used in render().
             */
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
        });
    });

}
const options = {
    afterDeleteRow: onDeleteRow,
    defaultSortName: 'device_group_name',
    defaultSortOrder: 'asc'
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
            filterType: 'model',
            device_model: '',
            device_models: [],
            status: '',
            message: '',
            filters: [{ parm:'' ,name: '' }],
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
        if (this.state.filterType.localeCompare("model") === 0)
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
            filters : this.state.filters
        };
        var filtersformated = "";
        newGroup.filters.forEach(function(entry) {
            filtersformated = filtersformated + entry['parm'] + "=" + entry["name"]  +","
            console.log("in for loop")
        });
        newGroup.filters = filtersformated.slice(0, -1); //the slice is to remove the last comma
        add_device_group(newGroup).then((fetched) => {
            fetched.json().then((data) => {
                console.log(data);
                this.setState({message:data.message});
                /*
                Status codes between 400 and 500 are being forced to 400 because
                they map to a specific CSS style class labeled with that status code.
                The style name is used in render().
                 */
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
                this.componentDidMount()
            });
        });
        this.setState({name: ''});
        this.setState({filters: [{ parm:'' ,name: '' }]});

    }

    componentDidMount() {
        verify_token().then((status) =>{
            if(!status){
                window.location.replace(window.location.origin.toString());
            }
        });
        get_device_groups().then((items) => {
                this.setState({deviceGroups: items.data});
            }
        );
        ReactDOM.findDOMNode(this).scrollTop = 0
    }
    handleShareholderNameChange = (idx) => (evt) => {
        const newfilters = this.state.filters.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });
        console.log(this.state.filters);
        this.setState({ filters: newfilters });
    }

    handleShareholderParmChange = (idx) => (evt) => {
        const newfilters = this.state.filters.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, parm: evt.target.value };
        });
        console.log(this.state.filters);
        this.setState({ filters: newfilters });
    }
    handleSubmit = (evt) => {
        const { name, filters } = this.state;
        alert(`Incorporated: ${name} with ${filters.length} filters`);
    }

    handleAddShareholder = () => {
        this.setState({
            filters: this.state.filters.concat([{ name: '' }])
        });
    }

    handleRemoveShareholder = (idx) => () => {
        this.setState({
            filters: this.state.filters.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        products = this.state.deviceGroups;
        const nameLink = this.state.name, nameIsValid = nameLink && nameLink !== "";

        var complete = false;
        if (nameIsValid){
            complete = true;
        }

        return (
            <div className="container">
                <div className="Home">
                    <h2>Device Groups</h2>
                </div>
                <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
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

                {this.state.filters.map((shareholder, idx) => (
                    <div className="shareholder">
                        <input
                            type="text"
                            placeholder={`Filter #${idx + 1}`}
                            value={shareholder.parm}
                            onChange={this.handleShareholderParmChange(idx)}
                        />
                        <input
                            type="text"
                            placeholder={`Value #${idx + 1}`}
                            value={shareholder.name}
                            onChange={this.handleShareholderNameChange(idx)}
                        />
                        <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddShareholder} className="button-group-submit">Add Filter</button>
                <div> </div>

                <Button className="button-group-submit" disabled = {!complete} type="submit" onClick={this.addGroup}>Add</Button>
                <BootstrapTable className="table-group" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination search>
                    <TableHeaderColumn dataField="device_group_name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="template_name"  width="150" dataSort>Template</TableHeaderColumn>
                    <TableHeaderColumn dataField="last_modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DeviceGroups;