import React, { Component } from 'react';
import './Scep.css';
import {Button} from 'react-bootstrap'
import {add_scep} from "../REST_API/Scep_API";
import {FormGroupCreate, create_user_list,ScepDigestDropdownFormGroupCreate,ScepEncryptDropdownFormGroupCreate} from "../common/common";

let products = [];



class Scep extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.state = {
            name: '',
            password: '',
            server: '',
            digest:'sha256',
            encrypt:'3des_cbc',
            country:'',
            state: '',
            locale:'',
            organization:'',
            org_unit:'',
            status: '',
            message: '',
            sys_server: ""

        };
    }



    addUser(){
        const newUser={
            name: this.state.name,
            password: this.state.password,
            server: this.state.server,
            digest: this.state.digest,
            encrypt: this.state.encrypt,
            country: this.state.country,
            state: this.state.state,
            locale: this.state.locale,
            organization: this.state.organization,
            org_unit: this.state.org_unit,
            sys_server: this.state.sys_server

        };
        add_scep(newUser).then((fetched) => {
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
    }

    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }


    render() {
        let new_list={
            items:this.state.items,
        };
        console.log(this.state.items);
        products = create_user_list(new_list);
        products = this.state.items;
        console.log(products);
        const usrLink = this.state.name, usrIsValid = usrLink && usrLink.indexOf( ' ' ) < 0;
        const passwordLink = this.state.password, passwordIsValid = passwordLink && passwordLink.indexOf( ' ' ) < 0;
        const serverLink = this.state.server, serverIsValid = serverLink && serverLink.indexOf( ' ' ) < 0;
        const sys_serverLink = this.state.sys_server, sys_serverIsValid = sys_serverLink && sys_serverLink.indexOf( ' ' ) < 0;
        const digestLink = this.state.digest, digestIsValid = digestLink && digestLink.indexOf( ' ' ) < 0;
        const encryptionLink = this.state.encrypt, encryptionIsValid = encryptionLink && encryptionLink.indexOf( ' ' ) < 0;

        var complete = false;
        console.log("tesdst");
        if (usrIsValid && passwordIsValid && serverIsValid && digestIsValid && encryptionIsValid && sys_serverIsValid){
            complete = true;
        } else{
            complete = false;
            console.log("start")
            console.log(usrIsValid)
            console.log(passwordIsValid)
            console.log(serverIsValid)
            console.log(digestIsValid)
            console.log(encryptionIsValid)
            console.log("end")
        }

        return (

            <div className="container">
                <div className="Home">
                    <h2>Scep</h2>
                </div>
                <div className="System _Header_div">
                    <h2 className="System_Header">System Settings</h2>
                </div>

                <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
                </div>
                <form className="form-createuser">
                    <FormGroupCreate
                        className = 'name-input'
                        controlId="name"
                        label="User Name"
                        value={this.state.name}
                        change={this.handleChange}
                        placeholder="Enter user name"
                        type="text"
                    />


                    <FormGroupCreate
                        className = {'password-input'}
                        controlId="password"
                        label="Password"
                        value={this.state.password}
                        change={this.handleChange}
                        placeholder="Enter password"
                        type="password"
                    />
                    <FormGroupCreate
                        className = {'sys-server-input'}
                        controlId="sys_server"
                        label="System Server"
                        value={this.state.sys_server}
                        change={this.handleChange}
                        placeholder="Enter System Server"
                        type="text"
                    />
                    <div className="System _Header_div">
                        <h2 className="System_Header">Device Settings</h2>
                    </div>
                    <FormGroupCreate
                        className = { 'server-input'}
                        controlId="server"
                        label="Server"
                        value={this.state.server}
                        change={this.handleChange}
                        placeholder="Enter server"
                        type="text"
                    />

                    <ScepDigestDropdownFormGroupCreate
                        className="digest-input"
                        controlId="digest"
                        value={this.state.digest}
                        change={this.handleChange}
                    />

                    <ScepEncryptDropdownFormGroupCreate
                        className="encrypt-input"
                        controlId="encrypt"
                        value={this.state.encrypt}
                        change={this.handleChange}
                    />


                    <FormGroupCreate
                        className = { 'country-input'}
                        controlId="country"
                        label="Country"
                        value={this.state.country}
                        change={this.handleChange}
                        placeholder="Enter Country"
                        type="text"
                    />

                    <FormGroupCreate
                        className = { 'state-input'}
                        controlId="state"
                        label="State"
                        value={this.state.state}
                        change={this.handleChange}
                        placeholder="Enter State"
                        type="text"
                    />

                    <FormGroupCreate
                        className = { 'locale-input'}
                        controlId="locale"
                        label="Locale"
                        value={this.state.locale}
                        change={this.handleChange}
                        placeholder="Enter Locale"
                        type="text"
                    />

                    <FormGroupCreate
                        className = { 'organization-input'}
                        controlId="organization"
                        label="Organization"
                        value={this.state.organization}
                        change={this.handleChange}
                        placeholder="Enter Organization"
                        type="text"
                    />

                    <FormGroupCreate
                        className = { 'org_unit-input'}
                        controlId="org_unit"
                        label="Org Unit"
                        value={this.state.org_unit}
                        change={this.handleChange}
                        placeholder="Enter Org Unit"
                        type="text"
                    />
                </form>
                <Button className="scep-button-submit" disabled={!complete} onClick={this.addUser} >Update</Button>
            </div>
        );
    }
}

export default Scep;