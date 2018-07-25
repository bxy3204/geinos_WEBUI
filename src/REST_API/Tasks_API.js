import {get_creds, get_route} from './API'

export function get_tasks () {
  let route = get_route()
  let creds = get_creds()
  console.log(route + '/logs')
  return fetch(route + '/tasks',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}
