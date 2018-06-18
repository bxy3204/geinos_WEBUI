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
    let jsondata = {
        vendor_id : device.name,
        serial_num: device.serial,
        model_num: device.model,
        //TODO: fix location
        location: "none"
    };
    fetch(route + '/devices', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'
            })
    });
}

export function delete_device(serial_num){
    let route = get_route();
    let creds = get_creds();
    let jsondata = {
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
