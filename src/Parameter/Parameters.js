import React, { Component } from 'react';
import './Parameters.css';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';
import {add_param, get_param} from "../REST_API/Parameter_API";

let List = [];

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
            range_end: '',
            params_list:[],
            template:''

        }

    }

    componentWillMount() {
        let param = ['IP-Range','Scalar','IP-List'];
        let params = [];
        for(let i=0; i<param.length; i++){
            let param_type={
                value: param[i],
                label: param[i]
            };
            params.push(param_type);
        }
        this.setState({param_type: "Range"});
        this.setState({params:params});
    }

    componentDidMount() {
        get_param().then(result=> result.json()).then((items) => {
                this.setState({params_list: items.data});
            }
        );
    }

    addParameter(){
        const newparam={
            name: this.state.name,
            value: this.state.value,
            type: this.state.param_type
        };
            add_param(newparam)
    }



    renderTypeField(){
        if (this.state.param_type.toString() !== "IP-Range"){
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
            <FormGroup
                className="range-end-input"
                controlId="range_end"
            >
                <ControlLabel>End</ControlLabel>

                <FormControl
                    type="text"
                    value={this.state.range_end}
                    placeholder="Enter Value"
                    onChange={this.handleNameChange}
                />
            </FormGroup>
               </div>;

    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleChange(e) {
        this.setState({param_type: e.value});
        console.log(this.state.param_type)
    }

    render() {
        let params = this.state.params_list;
        console.log(params);
        List = [];
        while(typeof params === "undefined"){}
        if (typeof params !== "undefined"){
            for(let i=0; i<params.length; i++){
                const param={
                    name: params[i][0],
                    type: params[i][1],
                    para: params[i][2],
                    };
                List.push(param);
            }
        }
        return (
            <div className="container">
                <div className="Home">
                    <h2>Parameters</h2>
                </div>

                <FormGroup
                    className="name-input"
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
                    name="form-field-name"
                    id="param"
                    value={this.state.param_type}
                    onChange={this.handleChange}
                    options={this.state.params}
                />


                {this.renderTypeField()}
                <Button className="button-param-submit" onClick={this.addParameter} type="submit">Add Parameter</Button>

                <BootstrapTable className="table-user" data={List} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="type"  width="150" dataSort>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="para"  width="200" dataSort >Value</TableHeaderColumn>
                    <TableHeaderColumn dataField="modified"  width="150" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}


export default Parameters;