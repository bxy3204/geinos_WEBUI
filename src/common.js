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

