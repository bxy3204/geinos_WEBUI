import {get_creds, get_route} from './API'

export function add_scep (user) {
  let route = get_route()
  let creds = get_creds()
  let jsondata = {
    usr: user.name,
    password: user.password,
    server: user.server,
    digest: user.digest,
    encrypt: user.encrypt,
    country: user.country,
    state: user.state,
    locale: user.locale,
    organization: user.organization,
    org_unit: user.org_unit,
    sys_server: user.sys_server
  }
  return fetch(route + '/scep', {
    method: 'put',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}

export function get_scep () {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/scep',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}
