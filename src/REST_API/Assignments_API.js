import {get_route, get_creds} from './API'

export function assign (assign_data) {
  let route = get_route()
  let creds = get_creds()
  const assign = new FormData()
  assign.append('temp_name', assign_data.temp_name)
  assign.append('group_name', assign_data.group_name)
  let jsondata = {
    temp_name: assign_data.temp_name,
    group_name: assign_data.group_name

  }

  return fetch(route + '/assign', {
    method: 'post',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}

export function get_assignments () {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/assign', {
    method: 'get',
    headers: new Headers({
      'Authorization': creds})
  }).then(function (response) {
    return response.json()
  })
}

export function delete_assignments(names) {
    let route = get_route()
    let creds = get_creds()
    const jsondata = {
        group_names: names
    }
    return fetch(route + '/assign', {
        method: 'delete',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    })
}