import React, { Component } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './Devices.css';




class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        }

    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }
    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        let device = ['One','Two','Three'];
        let devices = [];
        for(var i=0; i<device.length; i++){
            var user={
                value: device[i],
                label: device[i]
            }
            devices.push(user);
        }
        return (
            <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={devices}
            />
        );
    }
}


export default Devices;