import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

export function FormGroupCreate(props){
    return <FormGroup
        className={props.className}
        controlId={props.controlId}
        validationState={props.validationState}
    >
        <ControlLabel>{props.label}</ControlLabel>

        <FormControl
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.change}
        />
    </FormGroup>
}

export function DropdownFormGroupCreate(props){
    return <FormGroup
        className={props.className}
        controlId={props.controlId}
    >
        <ControlLabel>Role</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.change}>

            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
        </FormControl>
    </FormGroup>
}



export function DropdownTemplate(props){
    return <FormGroup
        className={props.className}
        controlId={props.controlId}
    >
        <ControlLabel>{props.label}</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.change}>
        </FormControl>
    </FormGroup>
}

export function create_user_list(props){
    let users = props.items;
    let products = [];
    if (typeof users !== "undefined"){
        for(let i=0; i<users.length; i++){
            const user={
                name: users[i][0],
                role: users[i][1],
                email: "Unknown",
                lastlogin: users[i][2]
            };
            products.push(user);
        }
    }
    return products;
}

export function create_device_list(props){
    console.log(props.items);
    let devices = props.items;
    let products = [];
    while(typeof devices === "undefined"){}
    if (typeof devices !== "undefined"){
        for(let i=0; i<devices.length; i++){
            const device={
                vendor: devices[i][0],
                serial: devices[i][1],
                model: devices[i][2]
            };
            products.push(device);
        }
    }
    return products;
}

export function create_devicegroup_list(props){
    let device_groups = props.items;
    let products = [];
    while(typeof device_groups === "undefined"){}
    if (typeof device_groups !== "undefined"){
        for(let i=0; i<device_groups.length; i++){
            const group_name={
                name: device_groups[i],
            };
            products.push(group_name);
        }
    }
    return products;
}

