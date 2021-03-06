import React, { Component } from 'react'
import './Parameters.css'
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css'
import {add_param, add_dynamic_param, add_range_param, delete_param, get_param} from '../REST_API/Parameter_API'
import {verify_token} from '../REST_API/Login_API'
import ReactDOM from "react-dom";

function onDeleteRow (rowKeys) {
  delete_param(rowKeys).then((fetched) => {
    fetched.json().then((data) => {
      alert(data.message + " - Status:" + data.status)
    })
  })
}

const options = {
  afterDeleteRow: onDeleteRow,
    defaultSortName: 'param_name',
    defaultSortOrder: 'asc'
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true
}

class Parameters extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addParameter = this.addParameter.bind(this)
    this.state = {
      name: '',
      serial: '',
      param_type: '',
      params: '',
      value: '',
      range_start: '',
      params_list: [],
      template: '',
      interface: '',
      status: '',
      message: '',
      hyphen: ''
    }
  }

  componentWillMount () {
    let param = ['IP-Range', 'Scalar', 'IP-List', 'Dynamic-IP-Range']
    let params = []
    for (let i = 0; i < param.length; i++) {
      let param_type = {
        value: param[i],
        label: param[i]
      }
      params.push(param_type)
    }
    // this.setState({param_type: "Range"});
    this.setState({params: params})
  }

  componentDidMount () {
    verify_token().then((status) => {
      if (!status) {
        window.location.replace(window.location.origin.toString())
      }
    }).catch(function (err) {
        console.log(err)
    })
    get_param().then((items) => {
      this.setState({params_list: items.data})
    }
    ).catch(function (err) {
        console.log(err)
    })
      ReactDOM.findDOMNode(this).scrollTop = 0
  }

  addParameter () {
    var newparam = null
    if (this.state.param_type.localeCompare('IP-Range') === 0) {
      newparam = {
        name: this.state.name,
        value: this.state.range_start,
        type: this.state.param_type
      }
      add_range_param(newparam).then((fetched) => {
        fetched.json().then((data) => {
          console.log(data)
          this.setState({message: data.message})
          /*
                    Status codes between 400 and 500 are being forced to 400 because
                    they map to a specific CSS style class labeled with that status code.
                    The style name is used in render().
                     */
          if (data.status >= 400 && data.status < 500) {
            this.setState({status: 400})
          } else if (data.status >= 200 && data.status < 300) {
            this.setState({status: 200})
          } else {
            // any other status than success or error will be treated as 102, informational
            // this reflects in the css file to ensure proper message notification
            this.setState({status: 102})
          }
          this.componentDidMount()
        }).catch(function (err) {
            console.log(err)
        })
      }).catch(function (err) {
          console.log(err)
      })
    } else if (this.state.param_type.localeCompare('Dynamic-IP-Range') === 0) {
      newparam = {
        name: this.state.name,
        value: this.state.value,
        type: 'Dynamic',
        interface: this.state.interface
      }
      add_dynamic_param(newparam).then((fetched) => {
        fetched.json().then((data) => {
          console.log(data)
          this.setState({message: data.message})
          /*
                    Status codes between 400 and 500 are being forced to 400 because
                    they map to a specific CSS style class labeled with that status code.
                    The style name is used in render().
                     */
          if (data.status >= 400 && data.status < 500) {
            this.setState({status: 400})
          } else if (data.status >= 200 && data.status < 300) {
            this.setState({status: 200})
          } else {
            // any other status than success or error will be treated as 102, informational
            // this reflects in the css file to ensure proper message notification
            this.setState({status: 102})
          }
          this.componentDidMount()
        })
      }).catch(function (err) {
          console.log(err)
      })
    } else {
      newparam = {
        name: this.state.name,
        value: this.state.value,
        type: this.state.param_type
      }
      add_param(newparam).then((fetched) => {
        fetched.json().then((data) => {
          console.log(data)
          this.setState({message: data.message})
          /*
                    Status codes between 400 and 500 are being forced to 400 because
                    they map to a specific CSS style class labeled with that status code.
                    The style name is used in render().
                     */
          if (data.status >= 400 && data.status < 500) {
            this.setState({status: 400})
          } else if (data.status >= 200 && data.status < 300) {
            this.setState({status: 200})
          } else {
            // any other status than success or error will be treated as 102, informational
            // this reflects in the css file to ensure proper message notification
            this.setState({status: 102})
          }
          this.componentDidMount()
        }).catch(function (err) {
            console.log(err)
        })
      }).catch(function (err) {
          console.log(err)
      })
    }
    this.setState({name: ''})
    this.setState({value: ''})
  }

  renderTypeField () {
    if (this.state.param_type.localeCompare('IP-Range') === 0) {
      return <div className="range-div">
        <FormGroup
          className="range-start-input"
          controlId="range_start"
        >
          <ControlLabel>Start</ControlLabel>

          <FormControl
            type="text"
            value={this.state.range_start}
            placeholder="Enter Value"
            onChange={this.handleNameChange}
          />
        </FormGroup>
      </div>
    } else if (this.state.param_type.localeCompare('Dynamic-IP-Range') === 0) {
      return <div className="range-div"> <FormGroup
        className="value-input"
        controlId="value"
      >
        <ControlLabel>Value</ControlLabel>

        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Enter Value"
          onChange={this.handleNameChange}
        />
      </FormGroup>
      <FormGroup
        className="range-end-input"
        controlId="interface"
      >
        <ControlLabel>Interface</ControlLabel>

        <FormControl
          type="text"
          value={this.state.interface}
          placeholder="Enter Interface"
          onChange={this.handleNameChange}
        />
      </FormGroup>
      </div>
    } else {
      return <FormGroup
        className="value-input"
        controlId="value"
      >
        <ControlLabel>Value</ControlLabel>

        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Enter Value"
          onChange={this.handleNameChange}
        />
      </FormGroup>
    }
  }

  handleNameChange (e) {
    this.setState({ [e.target.id]: e.target.value})
  }

  handleChange (e) {
    this.setState({param_type: e.value})
  }

  render () {
    let List = this.state.params_list

    const nameLink = this.state.name; const nameIsValid = nameLink && nameLink !== ''
    const paramLink = this.state.param_type; const paramIsValid = paramLink && paramLink !== ''

    var complete = false
    console.log(paramIsValid)
    if (nameIsValid && paramIsValid) {
      complete = true
    }
    let hyphen = ''
    if (this.state.name.indexOf('-') > -1) {
      complete = false
      console.log('here')
      hyphen = '400'
    }
    return (
      <div className="container">
        <div className="Home">
          <h2>Parameters</h2>
        </div>
        <div className={'notify n' + hyphen} ><span className={'symbol icon-' + hyphen} ></span> {'Parameter names cannot contain hyphens.'}
        </div>
        <div className={'notify n' + this.state.status} ><span className={'symbol icon-' + this.state.status}></span> {this.state.message}
        </div>
        <FormGroup
          className={'name-input'}
          controlId="name"
        >
          <ControlLabel>Name</ControlLabel>

          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Enter Parameter Name"
            onChange={this.handleNameChange}
          />
        </FormGroup>
        <ControlLabel>Type</ControlLabel> <ControlLabel className="asterisk">   * </ControlLabel>
        <Select
          className= {'form-field-name'}
          id="param"
          value={this.state.param_type}
          onChange={this.handleChange}
          options={this.state.params}
        />

        {this.renderTypeField()}
          <Button className="button-param-submit" disabled = {!complete} onClick={this.addParameter} type="submit">Add</Button>

        <BootstrapTable className="table-user" data={List} selectRow={selectRowProp} options={options} striped={true} hover={true} deleteRow pagination search>
          <TableHeaderColumn dataField="param_name" isKey={true} width="150" dataSort>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="param_type" width="150" dataSort>Type</TableHeaderColumn>
          <TableHeaderColumn dataField="start_value" width="200" dataSort >Value</TableHeaderColumn>
        </BootstrapTable>

      </div>

    )
  }
}

export default Parameters
