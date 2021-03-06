import {get_creds, get_route} from './API'

export function get_devices () {
  let route = get_route()
  let creds = get_creds()
  return fetch(route + '/devices',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': creds})

    }).then(function (response) {
    return response.json()
  })
}

export function add_device (device) {
  let route = get_route()
  let creds = get_creds()
  let jsondata = {
    vendor_id: device.name,
    serial_num: device.serial,
    model_num: device.model,
    // TODO: fix location
    location: device.location,
    scep: device.scep
  }
  return fetch(route + '/devices', {
    method: 'put',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'
    })
  })
}

export function retrieve_config (device_sn) {
  let route = get_route()
  let creds = get_creds()
  console.log('looking up ' + device_sn)
  let jsondata = {
    device_sn: device_sn
  }
  return fetch(route + '/configs', {
    method: 'post',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'
    })
  })
}

export function import_devices (file) {
  let route = get_route()
  let creds = get_creds()
  const formData = new FormData()
  formData.append('file', file)
  return fetch(route + '/devices', {
    method: 'put',
    body: formData,
    headers: new Headers({
      'Authorization': creds})
  })
}

export function delete_device (serial_nums) {
  let route = get_route()
  let creds = get_creds()
  let jsondata = {
    serial_nums: serial_nums
  }
  return fetch(route + '/devices', {
    method: 'delete',
    body: JSON.stringify(jsondata),
    headers: new Headers({
      'Authorization': creds,
      'content-type': 'application/json'})
  })
}
