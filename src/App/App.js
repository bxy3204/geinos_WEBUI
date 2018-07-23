import React, { Component } from 'react'
import './App.css'
import {
  Route,
  NavLink,
  BrowserRouter as Router
} from 'react-router-dom'
import Devices from '../Devices/Devices'
import DeviceGroups from '../DeviceGroups/DeviceGroups'
import Templates from '../Templates/Templates'
import Parameters from '../Parameter/Parameters'
import Assignments from '../Assignments/Assignments'
import Users from '../User/Users'
import Deployments from '../Reports/Deployments'
import Logs from '../Reports/Logs'
import Scep from '../Scep/Scep'
import Users_Authentication from '../User_Authentication/Users_Authentication'
import {verify_token, login} from '../REST_API/Login_API'
import {Button} from 'react-bootstrap'
import {FormGroupCreate} from '../common/common'

class App extends Component {
  constructor (props, context) {

    super(props, context)
    this.handleChange = this.handleChange.bind(this)
    this.log_in = this.log_in.bind(this)
    this.state = {
      auth: false,
      name: '',
      password: '',
      status: '',
    }
  }

  componentDidMount () {
  }
  verify() {
      console.log("inverify");
      verify_token().then((status) => {
          this.setState({auth: status})
          if (!status && window.location.pathname.toString() !== '/Login') {
              window.location.replace(window.location.origin.toString() + '/Login')
          }
      })
  }
    async saveItem (item, selectedValue) {
        try {
            await localStorage.setItem(item, selectedValue)
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message)
        }
    }

    log_in () {
        const newUser = {
            name: this.state.name,
            password: this.state.password
        }
        login(newUser).then(result => result.json()).then((items) => {
          console.log(items);
            this.saveItem('session', items['auth_token'])
            if(items['auth_token']){
              this.setState({auth:true});
            }
        })
    }

    handleChange (e) {
        this.setState({ [e.target.id]: e.target.value})
    }
  logOut(){
      localStorage.clear();
      this.setState({auth:false});
  }

  render () {
    if (this.state.auth) {
        window.onbeforeunload = function() {
            localStorage.removeItem("session");
            return '';
        };
        window.onbeforeunload = null;
      return (

        <Router>

          <div className="App">
            <div className="panel-heading panel-heading-custom">
              <h1>Device Provisioning</h1>
            </div>
            <ul className="header">
              <h1>Administration</h1>
              <li><NavLink onClick={() => this.verify()} exact to="/Users">Users</NavLink></li>
              <li><NavLink onClick={() => this.verify()} exact to="/UserAuthentication">User Authentication</NavLink></li>
              <li><NavLink onClick={() => this.verify()} to="/Scep">Scep</NavLink></li>
              <li><NavLink onClick={() => this.logOut()} to="/Login">Logout</NavLink></li>
              <h1>Device Inventory</h1>
              <li><NavLink onClick={() => this.verify()} to="/Devices">Devices</NavLink></li>
              <li><NavLink onClick={() => this.verify()} to="/DeviceGroups">Device Groups</NavLink></li>
              <h1>Template Inventory</h1>
              <li><NavLink onClick={() => this.verify()} to="/Parameters">Parameters</NavLink></li>
              <li><NavLink onClick={() => this.verify()} to="/Templates">Templates</NavLink></li>
              <li><NavLink onClick={() => this.verify()} to="/Assignments">Assignments</NavLink></li>
              <h1>Logging</h1>
              <li><NavLink onClick={() => this.verify()} to="/Logs">Event Logs</NavLink></li>
              <li><NavLink onClick={() => this.verify()} to="/Deployments">Reports</NavLink></li>
              <li><NavLink to="/DeviceStatus">Device Status</NavLink></li>
              <h1>Settings</h1>
            </ul>

            <div className="content">
              <Route exact path="/Users" component={Users} />
              <Route exact path="/UserAuthentication" component={Users_Authentication}/>
              <Route path="/Devices" component={Devices}/>
              <Route exact path="/DeviceGroups" component={DeviceGroups}/>
              <Route path="/Templates" component={Templates}/>
              <Route path="/Parameters" component={Parameters}/>
              <Route path="/Assignments" component={Assignments}/>
              <Route path="/Deployments" component={Deployments}/>
              <Route path="/Login" component={Users}/>
              <Route path="/Logs" component={Logs}/>
              <Route path="/Scep" component={Scep}/>
              <Route exact path="/DeviceStatus" component={DeviceStatus}/>
            </div>
          </div>
        </Router>
      )
    } else {
      console.log(this.state.status)
      const nameLink = this.state.name; const nameIsValid = nameLink && nameLink.indexOf(' ') < 0
      const passwordLink = this.state.password; const passwordIsValid = passwordLink && passwordLink.length >= 6
      var complete = false
      if (nameIsValid && passwordIsValid) {
        complete = true
      }
      return (

        <Router>
          <div className="App">
            <div className="panel-heading panel-heading-custom">
              <h1> Device Provisioning</h1>
            </div>;
            <ul className="header1">
            </ul>
            <div className="content">
                <div className="login-container">
                    <div className="Home">
                        <h2>Login</h2>
                    </div>
                    <form className="form-login_user">
                        <FormGroupCreate
                            className = {'login-name-input'}
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

            </div>

          </div>
        </Router>

      )
    }
  }
}
export default App
