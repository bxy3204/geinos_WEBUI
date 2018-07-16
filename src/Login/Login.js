import React, { Component,  } from 'react';
import './Login.css';
import {Button} from 'react-bootstrap'
import {login} from "../REST_API/Login_API";
import {FormGroupCreate} from "../common/common";
import {verify_token} from "../REST_API/Login_API";
import {get_users} from "../REST_API/User_API";





class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.log_in = this.log_in.bind(this);
        this.state = {
            name: '',
            password: '',
            status: '',
        };
    }

    async saveItem(item, selectedValue) {
        try {
            await localStorage.setItem(item, selectedValue)
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    log_in() {
        const newUser={
            name: this.state.name,
            password: this.state.password,
        };
        login(newUser).then(result=> result.json()).then((items) => {
            console.log(items);
            this.setState({items: items.data})
            this.saveItem("session" ,  items["auth_token"])
        });
    }

    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }
    verify() {
        verify_token().then((status) => {
                this.setState({status: status});
            }
        );
    }

    render() {

        console.log(this.state.status);
        const nameLink = this.state.name, nameIsValid = nameLink && nameLink.indexOf( ' ' ) < 0;
        const passwordLink = this.state.password, passwordIsValid = passwordLink && passwordLink.length >= 6;
        var complete = false;
        if (nameIsValid && passwordIsValid){
            complete = true;
        }

        return (

            <div className="container">
                <div className="Home">
                    <h2>Login</h2>
                </div>
            <form className="form-login_user">
                <FormGroupCreate
                    className = {'name-input'}
                    controlId="name"
                    label="User Name"
                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter user name"
                    type="text"
                />
                <FormGroupCreate
                    className = {'pass-input-login'}
                    controlId="password"
                    label="password"
                    value={this.state.password}
                    change={this.handleChange}
                    placeholder="Enter password"
                    type="Password"
                />
                <div>


                </div>
                <br></br>
                <br></br>
                    <Button className="button-submit" disabled = {!complete} onClick={this.log_in} >Login</Button>
            </form>
            </div>
        );
    }
}

export default Login;