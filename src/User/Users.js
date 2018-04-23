import React, { Component } from 'react';
import './Users.css';
import {Button, ControlLabel} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {get_users,delete_user,add_user} from "../common/rest_api";
import {FormGroupCreate, DropdownFormGroupCreate, create_user_list} from "../common/common";

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
            items: []
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
        console.log("ADD_USER")
        const newUser={
            name: this.state.name,
            password: this.state.password,
            retypepassword: this.state.passwordverify,
            email: this.state.email,
            role: this.state.role
        };
        if(this.getVerifyPassword() && this.getValidationState()){
            add_user(newUser)
        }
        window.location.reload();
    }

    handleChange(e) {

        this.setState({ [e.target.id]: e.target.value});
    }

    componentDidMount() {
        get_users().then(result=> result.json()).then((items) => {
                this.setState({items: items.data});
            }
        );
    }

    render() {
        let new_list={
            items:this.state.items,
        };
        products = create_user_list(new_list);
        console.log(products);
        return (

            <div className="container">
                <div className="Home">
                    <h2>Users</h2>
                </div>
            <form className="form-createuser">
                <FormGroupCreate
                    className="name-input"
                    controlId="name"
                    label="User Name"
                    value={this.state.name}
                    change={this.handleChange}
                    placeholder="Enter user name"
                    type="text"
                />
                <FormGroupCreate
                    className="email-input"
                    controlId="email"
                    label="Email"
                    value={this.state.email}
                    change={this.handleChange}
                    placeholder="Enter email"
                    type="text"
                />
                <FormGroupCreate
                    className="pass-input"
                    controlId="password"
                    label="Password"
                    validationState={this.getValidationState()}
                    value={this.state.password}
                    change={this.handleChange}
                    placeholder="Enter password"
                    type="password"
                />
                <FormGroupCreate
                    className="pass-verify-input"
                    controlId="passwordverify"
                    label="Verify Password"
                    validationState={this.getVerifyPassword()}
                    value={this.state.passwordverify}
                    change={this.handleChange}
                    placeholder="Re-Enter password"
                    type="password"
                />
                <div>

                <DropdownFormGroupCreate
                    className="role-input"
                    controlId="role"
                    value={this.state.role}
                    change={this.handleChange}
                />

                </div>

                    <Button className="button-submit" onClick={this.addUser} >Create User</Button>
            </form>
            <BootstrapTable className="table-user" data={products} selectRow={selectRowProp} options={options}   striped={true} hover={true} deleteRow pagination>
               <TableHeaderColumn dataField="name" isKey={true}  width="150"  dataSort>User Name</TableHeaderColumn>
               <TableHeaderColumn dataField="role"  width="150" dataSort>Role</TableHeaderColumn>
               <TableHeaderColumn dataField="email"  width="200" dataSort >Email</TableHeaderColumn>
               <TableHeaderColumn dataField="lastlogin"  width="150" dataSort >last Login</TableHeaderColumn>
            </BootstrapTable>
            </div>
        );
    }
}

export default Users;