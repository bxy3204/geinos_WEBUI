import React, { Component } from 'react';
import './Users_Authentication.css';
import {Button} from 'react-bootstrap'
import {update_radius, get_radius} from "../REST_API/Radius_API";
import {FormGroupCreate} from "../common/common";

class Users_Authentication extends Component {
    constructor(props, context) {
        super(props, context);
        this.addRadius = this.addRadius.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            host: '',
            port: '',
            secret: ''
        };
    }


    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    }

    addRadius(){
        const newRadius={
            host: this.state.host,
            port: this.state.port,
            secret: this.state.secret

        };
        update_radius(newRadius);
    }

    componentDidMount() {
        get_radius().then((items) => {
                this.setState({
                    host: items.host,
                    port: items.port,
                    secret: items.secret});
            }
        );
    }

    render() {
        return (
            <div className="container">
                <div className="Home">
                    <h2>Radius</h2>
                </div>

                <form className="form-createuser">
                    <FormGroupCreate
                        className = 'name-input'
                        controlId="host"
                        label="Host"
                        value={this.state.host}
                        change={this.handleChange}
                        placeholder="Enter server address..."
                        type="text"
                    />
                    <FormGroupCreate
                        className = { 'server-input'}
                        controlId="port"
                        label="Port"
                        value={this.state.port}
                        change={this.handleChange}
                        placeholder="Enter port..."
                        type="text"
                    />
                    <FormGroupCreate
                        className = { 'country-input'}
                        controlId="secret"
                        label="Secret"
                        value={this.state.secret}
                        change={this.handleChange}
                        placeholder="Enter secret..."
                        type="text"
                    />
                </form>
                <Button className="scep-button-submit" onClick={this.addRadius} >Update</Button>
            </div>
        );
    }
}

export default Users_Authentication;