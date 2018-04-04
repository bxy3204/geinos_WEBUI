import React, { Component } from 'react';
import './Parameters.css';
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css';

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



class Parameters extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: '',
            serial:'',
            param_type: '',
            params: '',
            value: '',
            range_start: '',
            range_end: ''

        }

    }

    componentWillMount() {
        let param = ['IP-Range','Value','IP-List'];
        let params = [];
        for(let i=0; i<param.length; i++){
            let param_type={
                value: param[i],
                label: param[i]
            };
            params.push(param_type);
        }
        this.setState({value: "Range"});
        this.setState({params:params});
    }

    renderTypeField(){
        if (this.state.value.toString() === "Value"){
            return <FormGroup
                className="value-input"
                controlId="serial"
            >
                <ControlLabel>Value</ControlLabel>

                <FormControl
                    type="text"
                    value={this.state.serial}
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
        this.setState({value: e.value});
    }

    render() {

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
                    value={this.state.value}
                    onChange={this.handleChange}
                    options={this.state.params}
                />


                {this.renderTypeField()}
                <Button className="button-param-submit" type="submit">Add Parameter</Button>
                <Button className="button-param-import-submit" type="submit">Import from file</Button>
                <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
                    <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="type"  width="150" dataSort>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="table-value"  width="200" dataSort >Value</TableHeaderColumn>
                    <TableHeaderColumn dataField="modified"  width="150" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>

            </div>

        );
    }
}


export default Parameters;