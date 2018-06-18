import {get_creds, get_route} from "./API";

export function get_devices() {

    let route = get_route();
    let creds = get_creds();
    return fetch( route + '/devices',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        }).then(function(response) {
            return response.json();
        });
}

export function add_device(device){
    let route = get_route();
    let creds = get_creds();
    let formdata = new FormData();
    formdata.append('vendor_id', device.name);
    formdata.append('serial_num', device.serial);
    formdata.append('model_num', device.model);
    fetch(route + '/devices', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}

export function delete_device(serial_num){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        serial_num : serial_num
    };
    fetch( route + '/devices', {
        method: 'delete',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}
