import {get_creds, get_route} from './API'

export function login (user) {
  let route = get_route()
  let creds = get_creds()
  creds = 'Basic ' + btoa(user.name + ':' + user.password)

  return fetch(route + '/login', {
    method: 'post',
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'
    })
  })
}
export function verify_token () {
  let route = get_route()
  let creds = get_creds()

  return fetch(route + '/verify_token', {
    method: 'get',
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  }).then(function (response) {
    if (!response.ok) throw new Error(response.status)
    else return response.json()
  })
    .then((data) => {
      console.log(data.status)

      if (data.status === 403) {
        console.log(data.status)
        return false
      } else if (data.message === 'User logged in.') {
        return true
      }
      throw new Error('API Response not recognized')
    })
    .catch((e) => {
      console.log('Error: ' + e.message)
    })
}
