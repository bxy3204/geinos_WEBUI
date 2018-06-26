import {get_creds, get_route} from "./API";

export function add_param(param){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        'name' : param.name,
        'type' : param.type,
        'value' : param.value
    };
    fetch(route + '/parameters', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}

export function add_dynamic_param(param){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        'name' : param.name,
        'type' : param.type,
        'value' : param.value,
        'interface' : param.interface
    };
    fetch(route + '/parameters', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}

export function add_range_param(param){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        'name' : param.name,
        'type' : param.type,
        'range_start' : param.range_start,
        'range_end' : param.range_end
    };
    fetch(route + '/parameters', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}

export function get_param() {
    let route = get_route();
    let creds = get_creds();
    return fetch( route + '/parameters',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        }).then(function(response) {
            return response.json();
        });
}

export function delete_param(param_name){
    let route = get_route();
    let creds = get_creds();
    const formdata = new FormData();
    formdata.append('param_name', param_name);
    fetch( route + '/parameters', {
        method: 'delete',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}
