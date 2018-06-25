import React, { Component } from 'react';
import './Scep.css';
import {Button} from 'react-bootstrap'
import {add_scep} from "../REST_API/Scep_API";
import {FormGroupCreate, create_user_list} from "../common/common";

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
            digest:'',
            encrypt:'',
        };
    }



    addUser(){
        const newUser={
            name: this.state.name,
            password: this.state.password,
            server: this.state.server,
            digest: this.state.digest,
            encrypt: this.state.encrypt
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

                    <FormGroupCreate
                        className = { 'digest-input'}
                        controlId="digest"
                        label="Digest"
                        value={this.state.digest}
                        change={this.handleChange}
                        placeholder="Enter digest"
                        type="text"
                    />
                    <FormGroupCreate
                        className = {'encrypt-input'}
                        controlId="encrypt"
                        label="Encryption"
                        value={this.state.encrypt}
                        change={this.handleChange}
                        placeholder="Enter encryption"
                        type="text"
                    />


                    <Button className="button-submit" disabled = {!complete} onClick={this.addUser} >Update Scep</Button>
                </form>
            </div>
        );
    }
}

export default Scep;