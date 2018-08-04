import {get_creds, get_route} from './API'

export function get_templates () {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/templates',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}

export function get_template (name) {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/templates/' + name,
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}

export function add_template (file) {
  let route = get_route()
  let creds = get_creds()

  let templateForm = new FormData()
  templateForm.append('file', file)
  return fetch(route + '/templates',
    {
      method: 'post',
      body: templateForm,
      headers: new Headers({
        'Authorization': creds})
    })
}

export function delete_templates (names) {
    let route = get_route()
    let creds = get_creds()
    const jsondata = {
        names: names
    }
    console.log(jsondata)
    fetch(route + '/templates', {
        method: 'delete',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    })
}

