import React, { Component } from 'react';
import {get_route, get_creds} from "../REST_API/API";

import './App.css'
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Devices from "../Devices/Devices";
import DeviceGroups from "../DeviceGroups/DeviceGroups";
import Templates from "../Templates/Templates";
import Parameters from "../Parameter/Parameters";
import Assignments from "../Assignments/Assignments";
import Users from "../User/Users";
import Deployments from "../Reports/Deployments"
import Login from "../Login/Login";
import Logs from "../Reports/Logs"
import Scep from "../Scep/Scep"
import {verify_token} from "../REST_API/Login_API";

class App extends Component {

  render() {
    return (

      <HashRouter>

      <div className="App">

          <div className="panel-heading panel-heading-custom">
            <h1>Device Provisioning</h1>
          </div>
          <ul className="header">
              <h1>Administration</h1>
              <li><NavLink to="/Login">Login</NavLink></li>
              <li><NavLink exact to="/Users">Users</NavLink></li>
              <li><NavLink exact to="/UserAuthentication">User Authentication</NavLink></li>
              <li><NavLink to="/Scep">Scep</NavLink></li>
              <h1>Device Inventory</h1>
              <li><NavLink to="/Devices">Devices</NavLink></li>
              <li><NavLink to="/DeviceGroups">Device Groups</NavLink></li>
              <h1>Template Inventory</h1>
              <li><NavLink to="/Parameters">Parameters</NavLink></li>
              <li><NavLink to="/Templates">Templates</NavLink></li>
              <li><NavLink to="/Assignments">Assignments</NavLink></li>
              <h1>Logging</h1>
              <li><NavLink to="/Logs">Event Logs</NavLink></li>
              <li><NavLink to="/Deployments">Deployments</NavLink></li>
              <h1>Settings</h1>
          </ul>

          <div className="content">
              <Route exact path="/Users" component={Users}/>
              <Route path="/Devices" component={Devices}/>
              <Route exact path="/DeviceGroups" component={DeviceGroups}/>
              <Route path="/Templates" component={Templates}/>
              <Route path="/Parameters" component={Parameters}/>
              <Route path="/Assignments" component={Assignments}/>
              <Route path="/Deployments" component={Deployments}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Logs" component={Logs}/>
              <Route path="/Scep" component={Scep}/>
          </div>

      </div>
      </HashRouter>
    );
  }
}
export default App;