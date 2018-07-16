import React, { Component } from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import 'react-select/dist/react-select.css';
import './Templates.css';
import {add_template} from "../REST_API/Templates_API";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {get_param} from "../REST_API/Parameter_API";
import SkyLight from 'react-skylight';

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
            params_list: [],
            status: '',
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
    }

    componentDidMount() {
        get_param().then((items) => {
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
            });
        });
        //window.location.reload();
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

        let List = this.state.params_list;

        const nameLink = this.state.name, nameIsValid = nameLink && nameLink.indexOf( ' ' ) < 0;
            console.log(nameIsValid);

        const fileTextLink = this.state.filename, fileTextIsValid = fileTextLink && fileTextLink.indexOf( ' ' ) < 0;
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
                        <label className="label-textarea">Base Configuration File</label> <label className="asterisk">*</label>
                    </div>
                    <div>
                    <textarea  className=  {'file-input'} value={this.state.filetext} onChange={this.handleTextChange} />
                        <div>
                            <section>
                                <button onClick={() => this.simpleDialog.show()}>Show Parameters</button>
                            </section>
                            <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Config File">
                                <BootstrapTable className="table-template" data={List}    striped={true} hover={true} pagination>
                                    <TableHeaderColumn dataField="param_name" isKey={true}  width="150"  dataSort>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="param_type"  width="150" dataSort>Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField="start_value"  width="200" dataSort >Value</TableHeaderColumn>
                                </BootstrapTable>
                            </SkyLight>
                        </div>

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
                        <Button className="button-templates-submit" disabled = {!complete} onClick={this.addTemplate}  >Add</Button>

                    </div>

                </div>
            </form>
        );
    }
}

export default Templates;