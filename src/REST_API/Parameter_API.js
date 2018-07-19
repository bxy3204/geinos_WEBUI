import {get_creds, get_route} from "./API";

export function add_param(param){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        'name' : param.name,
        'type' : param.type,
        'value' : param.value
    };
    return fetch(route + '/parameters', {
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
        'type' : 'DYNAMIC',
        'value' : param.value,
        'interface' : param.interface
    };
    return fetch(route + '/parameters', {
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
        'type' : 'RANGE',
        'value' : param.value
    };
    return fetch(route + '/parameters', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
    //window.location.replace(window.location.origin.toString());
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
    return fetch( route + '/parameters', {
        method: 'delete',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}
