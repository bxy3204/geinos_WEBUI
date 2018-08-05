import {get_creds, get_route} from './API'

export function get_users () {
  let route = get_route()
  let creds = get_creds()

  return fetch(route + '/users',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}

export function delete_user (users) {
  let route = get_route()
  let creds = get_creds()
  let jsondata = {
    rmusr: users
  }
  return fetch(route + '/users', {
    method: 'delete',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}

export function add_user (user) {
  let route = get_route()
  let creds = get_creds()
  let jsondata = {
    usr: user.name,
    password: user.password,
    retypepassword: user.retypepassword,
    email: user.email,
    role: user.role
  }
  return fetch(route + '/users', {
    method: 'put',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}
