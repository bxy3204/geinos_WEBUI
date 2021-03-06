import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import 'react-select/dist/react-select.css';
import './Templates.css';
import {add_template, get_template, get_templates, delete_templates} from "../REST_API/Templates_API";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {get_param} from "../REST_API/Parameter_API";
import SkyLight from 'react-skylight';
import {verify_token} from "../REST_API/Login_API";
import ReactDOM from 'react-dom';
import Creatable from 'react-select/lib/Creatable';

export function uploadFail(error) {
    return {
        type: 'UPLOAD_DOCUMENT_FAIL',
        error,
    };
}

let products = [];

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true
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
            params_list: [],
            templates: [],
            status: '',
            message: '',
            content: '',
            template_names: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
		this.getTemplate = this.getTemplate.bind(this);
        this.getTemplateByName = this.getTemplateByName.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

    componentDidMount() {
        verify_token().then((status) => {
            if (!status) {
                window.location.replace(window.location.origin.toString());

            }
        }).catch(function (err) {
            console.log(err)
        });
        get_param().then((items) => {
                this.setState({params_list: items.data});
            }
        ).catch(function (err) {
            console.log(err)
        });
        get_templates().then((items) => {
                this.setState({templates: items.data});
                console.log(this.state.templates);
                this.setState({template_names: []});
                var arr = []
                for(var i = 0, size = items.data.length; i < size ; i++)
                {
                    let dev={
                        value: items.data[i]['name'],
                        label: items.data[i]['name']
                    };
                    arr.push(dev);
                }
                this.setState({template_names: arr});
            }
        ).catch(function (err) {
            console.log(err)
        });
        this.setState({name: ''});
        this.setState({filetext: ''});
        ReactDOM.findDOMNode(this).scrollTop = 0
    }

    handleChange(event) {
        this.setState({value: event.target.value},);
    }

    handleTextChange(event) {
        this.setState({filetext: event.target.value},);
    }

    handleNameChange(event) {
        if (event && event.value && this.state.filetext === '') {
            console.log(event);
            console.log(this.state.template_names);
            for (var i = 0; i < this.state.template_names.length; i++) {
                //console.log(this.state.template_names[i].value);
                if (this.state.template_names[i].value === event.value) {
                    this.getTemplateByName(event.value);
                }
            }
            console.log(this.state.name);
        }
        this.setState({name: event.value});
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleSubmit(event) {
        event.preventDefault();
    };

    addTemplate(){
        let newtemp = new File([this.state.filetext], this.state.name);
        add_template(newtemp).then((fetched) => {
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
                this.componentDidMount();

            });
        }).catch(function (err) {
            console.log(err)
        });
        //window.location.replace(window.location.origin.toString());
    }
	
	getTemplate(){
        get_template(this.state.name).then((items) => {
                this.setState({filetext: items.data});
            }
        ).catch(function (err) {
            console.log(err)
        });
    }

    getTemplateByName(name){
        get_template(name).then((items) => {
                this.setState({filetext: items.data});
            }
        ).catch(function (err) {
            console.log(err)
        });
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

    onDeleteRow(rowKeys) {
        delete_templates(rowKeys).then((fetched) => {
            fetched.json().then((data) => {
                alert(data.message + " - Status:" + data.status)

            }).catch(function (err) {
                console.log(err)
            })
        }).catch(function (err) {
            console.log(err)
        })
    }

    render() {
        const options = {
            afterDeleteRow: this.onDeleteRow,
            defaultSortName: 'name',
            defaultSortOrder: 'asc'
        }
        products = this.state.templates;
        let device = ['MDS Orbit ECR','MDS Orbit MCR'];
        let devices = [];
        for(var i=0; i<device.length; i++){
            var user={
                value: device[i],
                label: device[i]
            };
            devices.push(user);
        }


        const nameLink = this.state.name, nameIsValid = nameLink && nameLink.indexOf( ' ' ) < 0;
            console.log(nameIsValid);

        var complete = false;
        if (nameIsValid){
            complete = true;
        }
        return (
                <form onSubmit={this.handleSubmit} className="template-form">
                <div className="config-area">
                    <div className="Home">
                        <h2>Templates</h2>
                    </div>
                    <div>
                        <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
                        </div>

                        <FormGroup
                            className=  { 'name-input' }
                            controlId="name"
                        >
                            <ControlLabel>Template Name</ControlLabel>
                            <Creatable
                                name="form-field-name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                options={this.state.template_names}
                            />
                        </FormGroup>
                    </div>

                    <div>
                        <label className="label-textarea">Base Configuration File</label> <label className="asterisk">*</label>
                    </div>
                    <div>
                    <textarea  className=  {'file-input'} value={this.state.filetext} onChange={this.handleTextChange} />
                        <div>
                            <section>
                                <button onClick={() => this.simpleDialog.show()}>Show Parameters</button>
                            </section>
                            <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Parameters">
                                <BootstrapTable className="table-template" data={this.state.params_list}    striped={true} hover={true} pagination search>
                                    <TableHeaderColumn dataField="param_name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="param_type"  width="150" dataSort>Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField="start_value"  width="200" dataSort >Value</TableHeaderColumn>
                                </BootstrapTable>
                            </SkyLight>
                        </div>

                    </div>

                    <div>
                        <br></br>
                        <label htmlFor="file" className={'label_file_input_template'}>Import from file</label>
                        <FormGroup
                            className=  "file-upload"
                            controlId="file"
                        >
                            <FormControl
                                type="file"
                                multiple
                                label="File"
                                value={this.state.filename}
                                onChange={this.onFilesChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div>
                        <Button className="button-templates-submit" disabled = {!complete} onClick={this.addTemplate}  >Add</Button>

                    </div>
                    <br></br>
                    <br></br>
            <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} striped={true} hover={true} deleteRow pagination search options={options}>
                <TableHeaderColumn dataField="name" isKey={true} width="150" dataSort>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="date_created" width="200" dataSort >Date Created</TableHeaderColumn>
            </BootstrapTable>

                </div>
            </form>
        );
    }
}

export default Templates;