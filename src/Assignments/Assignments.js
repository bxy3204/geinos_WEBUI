import React, { Component } from 'react';
import './Assignments.css';
import Select from 'react-select'
import { Button, ControlLabel} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {assign, get_assignments, delete_assignments} from "../REST_API/Assignments_API";
import {get_device_groups} from "../REST_API/DeviceGroups_API";
import {get_templates} from "../REST_API/Templates_API";
import {verify_token} from "../REST_API/Login_API";
import * as ReactDOM from "react-dom";


let products = [];

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};


class Assignments extends Component {
    constructor(props,context) {
        super(props,context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectTemplateChange = this.handleSelectTemplateChange.bind(this);
        this.assign_template = this.assign_template.bind(this);
        this.state = {
            template: '',
            group: '',
            template_list:[],
            group_list:[],
            assignments:[],
            deviceGroups: '',
            status: '',
            message: '',
        };
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    handleSelectChange = (group) => {
        this.setState({ group });
    };

    handleSelectTemplateChange = (template) => {
        this.setState({ template });
    };

    onDeleteRow(rowKeys) {
        delete_assignments(rowKeys).then((fetched) => {
            fetched.json().then((data) => {
                alert(data.message + " - Status:" + data.status)
            })
        }).catch(function (err) {
            console.log(err)
        })
    }

    assign_template(){
        const newAssign={
            temp_name: this.state.template.label,
            group_name: this.state.group.label,
        };
        assign(newAssign).then((fetched) => {
            fetched.json().then((data) => {
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
            }).catch(function (err) {
                console.log(err)
            });
        }).catch(function (err) {
            console.log(err)
        });
        this.setState({ template:'' });
        this.setState({ group:'' });
    }



    componentDidMount() {
        verify_token().then((status) =>{
            if(!status){
                window.location.replace(window.location.origin.toString());
            }
        }).catch(function (err) {
            console.log(err)
        })
        get_assignments().then((items) => {
                this.setState({assignments: items.data});
            }
        ).catch(function (err) {
            console.log(err)
        })
        get_templates().then((items) => {
                //this.setState({template_list: items.data});
                /*for (let i = 0; i <= items.data.length -1; i++) {

                    let newTemplates ={
                        value: [i],
                        label:items.data[i]
                    };
                    this.state.template_list.push(newTemplates);

                }*/
                this.setState({template_list: []});
                let listOfTemplates = items.data;
                let groups = [];
                for (let i=0; i<listOfTemplates.length; i++)
                {
                    // tmplts.push(listOfTemplates[i]["name"]);
                    let newTemplates ={
                                value: [i],
                                label:listOfTemplates[i]["name"]
                            };
                    groups.push(newTemplates);
                }
            this.setState({ template_list:groups});
            }
        ).catch(function (err) {
            console.log(err)
        })
        get_device_groups().then((items) => {
                //this.setState({group_list: items.data});
                /*for (let i = 0; i <= items.data.length -1; i++) {

                    let newGroup ={
                        value: [i],
                        label:items.data[i]
                    };
                    this.state.group_list.push(newGroup);
                }*/
                this.setState({group_list: []});
                //this.state.group_list = [];
                let listOfGroups = items.data;
                let grouplist = [];
                if (undefined !== listOfGroups)
                {
                    for (let i=0; i<listOfGroups.length; i++)
                    {
                        // grps.push(listOfGroups[i]["device_group_name"]);
                        let newGroup ={
                            value: [i],
                            label:listOfGroups[i]["device_group_name"]
                        };
                        grouplist.push(newGroup);
                    }
                    this.setState({group_list:grouplist})
                }
            }
        ).catch(function (err) {
            console.log(err)
        })
        ReactDOM.findDOMNode(this).scrollTop = 0
    }

    render() {
        const options = {
            afterDeleteRow: this.onDeleteRow,
            defaultSortName: 'device_group_name',
            defaultSortOrder: 'asc'
        };
        let listOfGroups = this.state.group_list;

        let listOfTemplates = this.state.template_list;

        products = this.state.assignments;
        const templateLink = this.state.template, templateIsValid = templateLink;
        const groupLink = this.state.group, groupIsValid = groupLink;
        var complete = false;
        if (templateIsValid && groupIsValid){
            complete = true;

        }

        return (
            <div className="container">
                <div className="Home">
                    <h2>Assignments</h2>
                </div>
                <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
                </div>
                <ControlLabel className="label-group">Template</ControlLabel> <ControlLabel className="asterisk">  * </ControlLabel>
                <Select
                    className={ 'assignment-template-input'}
                    controlId="template"
                    label = "TEMP"
                    value={this.state.template}
                    onChange={this.handleSelectTemplateChange}
                    options= {listOfTemplates}
                />


                <ControlLabel className="label-group">Group</ControlLabel> <ControlLabel className="asterisk"> * </ControlLabel>
                <Select
                    className={'assignment-group-input'}
                    controlId="group"
                    value={this.state.group}
                    onChange={this.handleSelectChange}
                    options= {listOfGroups}
                />
                <Button className="button-assign-submit" disabled = {!complete} type="submit" onClick={this.assign_template}>Assign</Button>
                <BootstrapTable className="table-assign" data={products} options={options}  selectRow={selectRowProp} striped={true} hover={true} deleteRow pagination search>
                    <TableHeaderColumn dataField="device_group_name" isKey={true} width="150"  dataSort>Device Group</TableHeaderColumn>
                    <TableHeaderColumn dataField="template_name" width="150" dataSort>Template</TableHeaderColumn>
                    <TableHeaderColumn dataField="Added"  width="200" dataSort >Added</TableHeaderColumn>
                    <TableHeaderColumn dataField="Connected"  width="200" dataSort >Registered</TableHeaderColumn>
                    <TableHeaderColumn dataField="Authorized"  width="200" dataSort >SCEP Enrolled</TableHeaderColumn>
                    <TableHeaderColumn dataField="Configured"  width="200" dataSort >Configured</TableHeaderColumn>
                    <TableHeaderColumn dataField="last_modified"  width="200" dataSort >Last Modified</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Assignments;