import React, { Component } from 'react';

import './App.css'
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Devices from "./Devices";
import DeviceGroups from "./DeviceGroups";
import Templates from "./Templates";
import Parameters from "./Parameters";
import Assignments from "./Assignments";
import LogOut from "./LogOut";
import Users from "./Users";

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className="App">
          <div className="panel-heading panel-heading-custom">
            <h1>Device Provisioning</h1>
          </div>
          <div className="panel-heading-Navbar">
          </div>
          <ul className="header">
              <h1>Administration</h1>
              <li><NavLink exact to="/Users">Users</NavLink></li>
              <li><NavLink exact to="/Logout">Log Out</NavLink></li>
              <h1>Device Inventory</h1>
              <li><NavLink to="/Devices">Devices</NavLink></li>
              <li><NavLink to="/DeviceGroups">Device Groups</NavLink></li>
              <h1>Template Inventory</h1>
              <li><NavLink to="/Templates">Templates</NavLink></li>
              <li><NavLink to="/Parameters">Parameters</NavLink></li>
              <li><NavLink to="/Assignments">Assignments</NavLink></li>
              <h1>Reports</h1>
          </ul>

          <div className="content">
              <Route exact path="/Users" component={Users}/>
              <Route path="/logout" component={LogOut}/>
              <Route path="/Devices" component={Devices}/>
              <Route exact path="/DeviceGroups" component={DeviceGroups}/>
              <Route path="/Templates" component={Templates}/>
              <Route path="/Parameters" component={Parameters}/>
              <Route path="/Assignments" component={Assignments}/>
          </div>
      </div>
      </HashRouter>
    );
  }
}
export default App;