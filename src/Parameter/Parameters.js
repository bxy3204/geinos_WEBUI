import React, { Component } from 'react';
import './Parameters.css';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import {add_param, add_dynamic_param, add_range_param, delete_param, get_param} from "../REST_API/Parameter_API";

let List = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_param(rowKeys[0])
}

const options = {
    afterDeleteRow: onDeleteRow
};

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};



class Parameters extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addParameter= this.addParameter.bind(this);
        this.state = {
            name: '',
            serial:'',
            param_type: '',
            params: '',
            value: '',
            range_start: '',
            params_list:[],
            template:'',
            interface:''
        }

    }

    componentWillMount() {
        let param = ['IP-Range','Scalar','IP-List', 'Dynamic-IP-Range'];
        let params = [];
        for(let i=0; i<param.length; i++){
            let param_type={
                value: param[i],
                label: param[i]
            };
            params.push(param_type);
        }
        //this.setState({param_type: "Range"});
        this.setState({params:params});
    }

    componentDidMount() {
        get_param().then((items) => {
                this.setState({params_list: items.data});
            }
        );
    }

    addParameter(){
        var newparam = null;
        if (this.state.param_type.localeCompare("IP-Range") === 0){
            var newparam={
                name: this.state.name,
                value: this.state.range_start,
                type: this.state.param_type
            };
            add_range_param(newparam);
            //window.location.reload();
        }
        else if (this.state.param_type.localeCompare("Dynamic-IP-Range") === 0)
        {
            var newparam={
                name: this.state.name,
                value: this.state.value,
                type: "Dynamic",
                interface: this.state.interface
            };
            add_dynamic_param(newparam);
        }
        else {
            var newparam={
                name: this.state.name,
                value: this.state.value,
                type: this.state.param_type
            };
            add_param(newparam);
        }
        this.setState({name: ''});
        this.setState({value: ''});
        this.componentDidMount();
    }



    renderTypeField(){
        if (this.state.param_type.localeCompare("IP-Range") == 0)
        {
            return <div className="range-div">
                <FormGroup
                    className="range-start-input"
                    controlId="range_start"
                >
                    <ControlLabel>Start</ControlLabel>

                    <FormControl
                        type="text"
                        value={this.state.range_start}
                        placeholder="Enter Value"
                        onChange={this.handleNameChange}
                    />
                </FormGroup>
            </div>;
        }
        else if (this.state.param_type.localeCompare("Dynamic-IP-Range") == 0)
        {
            return <div className="range-div"> <FormGroup
                className="value-input"
                controlId="value"
            >
                <ControlLabel>Value</ControlLabel>

                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter Value"
                    onChange={this.handleNameChange}
                />
            </FormGroup>
            <FormGroup
                className="range-end-input"
            controlId="interface"
                >
                <ControlLabel>Interface</ControlLabel>

            <FormControl
                type="text"
                value={this.state.interface}
                placeholder="Enter Interface"
                onChange={this.handleNameChange}
            />
            </FormGroup>;
            </div>
        }
        else
        {
            return <FormGroup
                className="value-input"
                controlId="value"
            >
                <ControlLabel>Value</ControlLabel>

                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter Value"
                    onChange={this.handleNameChange}
                />
            </FormGroup>;
        }
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleChange(e) {
        this.setState({param_type: e.value});
    }

    render() {
        let List = this.state.params_list;

        const nameLink = this.state.name, nameIsValid = nameLink && nameLink !== "";
        const valueLink = this.state.value, valueIsValid = valueLink && valueLink !== "";
        const paramLink = this.state.param_type, paramIsValid = paramLink && paramLink !== "";

        var complete = false;
        console.log(paramIsValid);
        if (nameIsValid && paramIsValid){
            complete = true;
        }
        return (
            <div className="container">
                <div className="Home">
                    <h2>Parameters</h2>
                </div>

                <FormGroup
                    className={ nameIsValid ? "name-input" : "name-input-error"}
                    controlId="name"
                >
                    <ControlLabel>Name</ControlLabel>

                    <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Enter Parameter Name"
                        onChange={this.handleNameChange}
                    />
                </FormGroup>
                    <ControlLabel>Type</ControlLabel>
                <Select
                    className= { paramIsValid ? "form-field-name" : "form-field-name-error"}
                    id="param"
                    value={this.state.param_type}
                    onChange={this.handleChange}
                    options={this.state.params}
                />


                {this.renderTypeField()}
                <Button className="button-param-submit" disabled = {!complete} onClick={this.addParameter} type="submit">Add</Button>

                <BootstrapTable className="table-user" data={List} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="param_name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="param_type"  width="150" dataSort>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="start_value"  width="200" dataSort >Value</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}

export default Parameters;