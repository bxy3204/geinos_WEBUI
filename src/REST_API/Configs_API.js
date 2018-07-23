import {get_creds, get_route} from './API'

export function get_config (device) {
  console.log('device is:' + device)
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/configs',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data)
    })
}
