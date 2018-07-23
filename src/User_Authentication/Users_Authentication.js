import React, { Component } from 'react'
import './Users_Authentication.css'
import {Button} from 'react-bootstrap'
import {update_radius, get_radius} from '../REST_API/Radius_API'
import {FormGroupCreate} from '../common/common'
import {verify_token} from '../REST_API/Login_API'

class Users_Authentication extends Component {
  constructor (props, context) {
    super(props, context)
    this.addRadius = this.addRadius.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      host: '',
      port: '',
      secret: '',
      status: '',
      message: ''
    }
  }

  handleChange (e) {
    this.setState({ [e.target.id]: e.target.value})
  }

  addRadius () {
    const newRadius = {
      host: this.state.host,
      port: this.state.port,
      secret: this.state.secret

    }
    update_radius(newRadius).then((fetched) => {
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
    })
  }

  componentDidMount () {
    verify_token().then((status) => {
      if (!status) {
        window.location.replace(window.location.origin.toString())
      }
    })
    get_radius().then((items) => {
      this.setState({
        host: items.data[0]['host'],
        port: items.data[0]['port'],
        secret: items.data[0]['secret']})
    }
    ).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className="container">
        <div className="Home">
          <h2>Radius</h2>
        </div>
        <div className={'notify n' + this.state.status} ><span className={'symbol icon-' + this.state.status}></span> {this.state.message}</div>
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
    )
  }
}

export default Users_Authentication
