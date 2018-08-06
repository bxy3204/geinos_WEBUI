import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css'
import {get_tasks} from '../REST_API/Tasks_API'
import './Tasks.css'
import {verify_token} from '../REST_API/Login_API'

class Tasks extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tasks: []
    }
  }

  componentWillMount () {
    console.log('BBBB!!!')
    let tasks = []
    this.setState({tasks: tasks})
  }

  componentDidMount () {
    verify_token().then((status) => {
      if (!status) {
        window.location.replace(window.location.origin.toString())
      }
    })
    get_tasks().then((items) => {
      console.log(items.data)
      this.setState({tasks: items.data})
    }
    )
  }

  render () {
    const options = {
      defaultSortName: 'status',
      defaultSortOrder: 'asc'
    }

    return (
      <div className="container-tasks">
          <div className="Home">
              <h2>Tasks</h2>
          </div>
          <br></br>
        <BootstrapTable className="table-tasks" data={this.state.tasks} options={options} striped={true} hover={true} pagination>
          <TableHeaderColumn dataField="serial_number" isKey={true} width="150" dataSort>Device</TableHeaderColumn>
          <TableHeaderColumn dataField="status" width="150" dataSort>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default Tasks
