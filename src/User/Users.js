import React, { Component } from 'react';
import './Users.css';
import {Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {get_users,delete_user,add_user} from "../REST_API/User_API";
import {FormGroupCreate, DropdownFormGroupCreate, create_user_list} from "../common/common";
import {verify_token} from "../REST_API/Login_API";
const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let products = [];

function onDeleteRow(rowKeys) {
    alert('You deleted: ' + rowKeys);
    delete_user(rowKeys[0]);
}


const options = {
    afterDeleteRow: onDeleteRow
};

const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
};


class Users extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.state = {
            name: '',
            password: '',
            passwordverify: '',
            email:'',
            role:'Operator',
            items: [],
            status: '',
            message: ''
        };
    }



    getValidationState() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }
    getVerifyPassword(){
        if(this.state.passwordverify==='') return null;
        if(this.state.password === this.state.passwordverify) return 'success';
        else return 'error';
    }

    addUser(){
        const newUser={
            name: this.state.name,
            password: this.state.password,
            retypepassword: this.state.passwordverify,
            email: this.state.email,
            role: this.state.role
        };
        if(this.getVerifyPassword() && this.getValidationState()){
            add_user(newUser).then((fetched) => {
                fetched.json().then((data) => {
                    this.setState({message:data.message})
                    /*
                    Status codes between 400 and 500 are being forced to 400 because
                    they map to a specific CSS style class labeled with that status code.
                    The style name is used in render().
                     */
                    if(data.status >= 400 && data.status < 500){
                        this.setState({status:400})
                    }
                    else if(data.status >= 200 && data.status < 300){
                        this.setState({status:200})
                    } else {
                        //any other status than success or error will be treated as 102, informational
                        // this reflects in the css file to ensure proper message notification
                        this.setState({status:102})
                    }
                    this.componentDidMount();
                });
            });
        }
        /*
    .catch((error) => {
            console.log("Error:" + error);
        })*/
        //window.location.reload();
        this.setState({name : ''});
        this.setState({password: ''});
        this.setState({passwordverify: ''});
        this.setState({email:''});
        this.componentDidMount()
    }

    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }

    componentDidMount() {
        get_users().then((items) => {
                this.setState({items: items.data});
            }
        );
    }

    render() {
        let new_list={
            items:this.state.items,
        };
        products = create_user_list(new_list);
        products = this.state.items;
        const nameLink = this.state.name, nameIsValid = nameLink && nameLink.indexOf( ' ' ) < 0;
        const emailLink = this.state.email, emailIsValid = emailLink;
        const passwordLink = this.state.password, passwordIsValid = passwordLink && passwordLink.length >= 6;
        const passwordVerifyLink = this.state.passwordverify, verifyPasswordIsValid = passwordLink === passwordVerifyLink;
        var complete = false;
        if (nameIsValid && emailIsValid && passwordIsValid && verifyPasswordIsValid){
            complete = true;
        }

        return (

            <div className="container">
                <div className="Home">
                    <h2>Users</h2>
                </div>
                <div className={"notify n" +this.state.status} ><span className={"symbol icon-"+this.state.status}></span> {this.state.message}
                </div>

                <form className="form-createuser">
                <FormGroupCreate
                    className = { 'name-input' }
                    controlId="name"
                    label="User Name"
                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter user name"
                    type="text"
                />
                <FormGroupCreate
                    className = {'email-input'}
                    controlId="email"
                    label="Email"
                    value={this.state.email}
                    change={this.handleChange}
                    placeholder="Enter email"
                    type="text"
                />
                <div className = 'error-placeholder'> { passwordIsValid && this.state.password !== this.state.passwordverify? "passwords don't match" : ''}
                <FormGroupCreate
                    className = { 'pass-input' }
                    controlId="password"
                    label="Password"
                    validationState={this.getValidationState()}
                    value={this.state.password}
                    change={this.handleChange}
                    placeholder="Enter password"
                    type="password"
                />
                <FormGroupCreate
                    className = {'pass-verify-input'}
                    controlId="passwordverify"
                    label="Verify Password"
                    validationState={this.getVerifyPassword()}
                    value={this.state.passwordverify}
                    change={this.handleChange}
                    placeholder="Re-Enter password"
                    type="password"
                />
                </div>
                <div>

                <DropdownFormGroupCreate
                    className="role-input"
                    controlId="role"
                    value={this.state.role}
                    change={this.handleChange}
                />

                </div>

                    <Button className="button-submit" disabled = {!complete} onClick={this.addUser} >Add</Button>
            </form>
            <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
               <TableHeaderColumn dataField="username" isKey={true}  width="150"  dataSort>User Name</TableHeaderColumn>
               <TableHeaderColumn dataField="role_type"  width="150" dataSort>Role</TableHeaderColumn>
               <TableHeaderColumn dataField="email"  width="200" dataSort >Email</TableHeaderColumn>
               <TableHeaderColumn dataField="last_login"  width="150" dataSort >last Login</TableHeaderColumn>
            </BootstrapTable>
            </div>
        );
    }
}

export default Users;