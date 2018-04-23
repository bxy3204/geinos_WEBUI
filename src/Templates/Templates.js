import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './Templates.css';
import {add_template} from "../common/rest_api";






export function uploadFail(error) {
    return {
        type: 'UPLOAD_DOCUMENT_FAIL',
        error,
    };
}


class Templates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedOption: '',
            value: '',
            filetext: '',
            filename: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value},);
    }

    handleTextChange(event) {
        this.setState({filetext: event.target.value},);
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
        console.log(this.state.value);
    }



    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    };

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    };

    addTemplate(){
        let newtemp = new File([this.state.filetext], this.state.filename);
        add_template(newtemp);
        console.log(newtemp);
    }


    onFilesChange(event) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        this.setState({filename: event.target.value});
        let state = this;
        reader.onload = function(){
            state.setState({filetext: reader.result})
        }
    };

    onFilesError(error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
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
                    <div className="Home">
                        <h2>Templates</h2>
                    </div>
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
                        <label className="label-textarea">Base Configuration File</label>
                    </div>
                    <div>
                    <textarea  value={this.state.filetext} onChange={this.handleTextChange} />
                    </div>

                    <div>
                        <FormGroup
                            className="file-input"
                            controlId="file"
                        >
                            <FormControl
                                type="file"
                                label="File"
                                value={this.state.filename}
                                onChange={this.onFilesChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div>
                        <Button className="button-templates-submit" onClick={this.addTemplate}  >Submit</Button>
                    </div>

                </div>
            </form>
        );
    }
}

export default Templates;