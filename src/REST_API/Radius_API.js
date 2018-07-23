import {get_creds, get_route} from './API'

export function update_radius (newRadius) {
  let route = get_route()
  let creds = get_creds()
  const jsondata = {
    'host': newRadius.host,
    'port': newRadius.port,
    'secret': newRadius.secret
  }
  return fetch(route + '/radius', {
    method: 'put',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}

export function get_radius () {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/radius',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}
