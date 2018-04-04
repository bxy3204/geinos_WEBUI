import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import './Templates.css';



class Templates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedOption: '',
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value},);
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    };

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

        render() {
            const { selectedOption } = this.state;
            const value = selectedOption && selectedOption.value;
            let device = ['MDS Orbit ECR','MDS Orbit MCR'];
            let devices = [];
            for(var i=0; i<device.length; i++){
                var user={
                    value: device[i],
                    label: device[i]
                }
                devices.push(user);
            }
        return (
            <form onSubmit={this.handleSubmit} className="template-form">
                <div className="config-area">
                    <div>
                        <FormGroup
                            className="name-input"
                            controlId="name"
                        >
                            <ControlLabel>Template Name</ControlLabel>

                            <FormControl
                                type="text"
                                value={this.state.name}
                                placeholder="Enter Template Name"
                                onChange={this.handleNameChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div>
                        <label>Device Model</label>
                        <Select
                            name="form-field-name"
                            value={value}
                            onChange={this.handleSelectChange}
                            options={devices}
                            clearable={false}
                            deleteRemoves={false}
                            backspaceRemoves={false}
                        />
                    </div>
                    <div>
                        <label className="label-textarea">Base Configuration File</label>
                    </div>
                    <div>
                    <textarea  value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div>
                    <input type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        );
    }
}

export default Templates;