import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

export function FormGroupCreate(props){
    return <FormGroup
        className={props.className}
        requird ={props.required}
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

export function ScepEncryptDropdownFormGroupCreate(props){
    return <FormGroup
        className={props.className}
        controlId={props.controlId}
    >
        <ControlLabel>Encryption</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.change}>
            des_cbc, 3des_cbc, aes128_cbc, aes192_cbc, aes256_cbc
            <option value="3des_cbc">3des_cbc</option>
            <option value="des_cbx">des_cbc</option>
            <option value="aes128_cbc">aes128_cbc</option>
            <option value="aes192_cbc">aes192_cbc</option>
            <option value="aes256_cbc">aes256_cbc</option>
        </FormControl>
    </FormGroup>
}

export function ScepDigestDropdownFormGroupCreate(props){
    return <FormGroup
        className={props.className}
        controlId={props.controlId}
    >
        <ControlLabel>Digest</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.change}>
            <option value="sha256">sha256</option>
            <option value="md5">md5</option>
            <option value="sha1">sha1</option>
            <option value="sha384">sha384</option>
            <option value="sha512">sha512</option>
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
                email: users[i][3],
                lastlogin: users[i][2]
            };
            products.push(user);
        }
    }
    return products;
}

export function create_device_list(props){
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
                name: device_groups[i][0],
                last_modified: device_groups[i][1],
                template_name: device_groups[i][2]
            };
            products.push(group_name);
        }
    }
    return products;
}

