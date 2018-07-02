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
            org_unit: this.state.org_unit

        };
        add_scep(newUser);

        window.location.reload();
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
        const digestLink = this.state.digest, digestIsValid = digestLink && digestLink.indexOf( ' ' ) < 0;
        const encryptionLink = this.state.encrypt, encryptionIsValid = encryptionLink && encryptionLink.indexOf( ' ' ) < 0;

        var complete = false;
        console.log("tesdst");
        if (usrIsValid && passwordIsValid && serverIsValid && digestIsValid && encryptionIsValid){
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
                <Button className="scep-button-submit" disabled={!complete} onClick={this.addUser} >Update Scep</Button>
            </div>
        );
    }
}

export default Scep;