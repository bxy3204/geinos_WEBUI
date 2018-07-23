import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-select/dist/react-select.css'
import {verify_token} from '../REST_API/Login_API'

let List = []

class Deployments extends Component {
  componentDidMount () {
    verify_token().then((status) => {
      if (!status) {
        window.location.replace(window.location.origin.toString())
      }
    })
  }

  render () {
    return (
      <BootstrapTable className="table-user" data={List} striped={true} hover={true} pagination search>
        <TableHeaderColumn dataField="name" isKey={true} width="150" dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="type" width="150" dataSort>Type</TableHeaderColumn>
        <TableHeaderColumn dataField="para" width="200" dataSort >Value</TableHeaderColumn>
        <TableHeaderColumn dataField="modified" width="150" dataSort >Last Modified</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Deployments
