import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import 'react-select/dist/react-select.css';
import './Templates.css';
import {add_template} from "../REST_API/Templates_API";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {get_param} from "../REST_API/Parameter_API";

let List = [];
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
            filename: '',
            params_list: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
    }

    componentDidMount() {
        get_param().then(result=> result.json()).then((items) => {
                this.setState({params_list: items.data});
            }
        );
    }


    handleChange(event) {
        this.setState({value: event.target.value},);
    }

    handleTextChange(event) {
        this.setState({filetext: event.target.value},);
    }

    handleNameChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }



    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    };

    addTemplate(){
        let newtemp = new File([this.state.filetext], this.state.name);
        add_template(newtemp);
        window.location.reload();
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

    }




    render() {
            let device = ['MDS Orbit ECR','MDS Orbit MCR'];
            let devices = [];
            for(var i=0; i<device.length; i++){
                var user={
                    value: device[i],
                    label: device[i]
                };
                devices.push(user);
            }

            let params = this.state.params_list;
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

        const nameLink = this.state.name, nameIsValid = nameLink && nameLink.indexOf( ' ' ) < 0;
            console.log(nameIsValid);

        const fileTextLink = this.state.filetext, fileTextIsValid = fileTextLink && fileTextLink.indexOf( ' ' ) < 0;
        var complete = false;
        if (fileTextIsValid && nameIsValid){
            complete = true;
        }
        return (
                <form onSubmit={this.handleSubmit} className="template-form">
                <div className="config-area">
                    <div className="Home">
                        <h2>Templates</h2>
                    </div>
                    <div>
                        <FormGroup
                            className=  { nameIsValid ? 'name-input' : 'name-input-error'}
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
                        <label className="label-param-table">Available Parameters</label>
                    </div>
                    <div>
                    <textarea  className=  { fileTextIsValid ? 'file-input' : 'file-input-error'} value={this.state.filetext} onChange={this.handleTextChange} />

                        <BootstrapTable className="table-template" data={List}    striped={true} hover={true} pagination>
                            <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="type"  width="150" dataSort>Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="para"  width="200" dataSort >Value</TableHeaderColumn>
                        </BootstrapTable>
                    </div>

                    <div>
                        <FormGroup
                            className=  "file-upload"
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
                        <Button className="button-templates-submit" disabled = {!complete} onClick={this.addTemplate}  >Submit</Button>

                    </div>

                </div>
            </form>
        );
    }
}

export default Templates;