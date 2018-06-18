import {get_creds, get_route} from "./API";

export function get_device_groups() {
    let route = get_route();
    let creds = get_creds();
    return fetch( route + '/device_groups',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),
        }).then(function(response) {
            return response.json();
        });
}

export function add_device_group(group) {
    let route = get_route();
    let creds = get_creds();

    let jsondata = {
        group_name: group.name,
        attribute : group.attribute,
        value : group.value
    };

    fetch( route + '/device_groups',
        {
            method: 'post',
            body: JSON.stringify(jsondata),
            headers: new Headers({
                'Authorization': creds,
                'content-type': 'application/json'})
        });
}

export function delete_group(group_name){
    let route = get_route();
    let creds = get_creds();
    let jsondata = {
        group_name: group_name,
    };
    fetch( route + '/device_groups', {
        method: 'delete',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}
