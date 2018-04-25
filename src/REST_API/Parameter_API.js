import {get_creds, get_route} from "./API";

export function add_param(param){
    let route = get_route();
    let creds = get_creds();

    const paramdata = new FormData();
    paramdata.append('name', param.name);
    paramdata.append('type', param.type);
    paramdata.append('value', param.value);
    fetch(route + '/parameters', {
        method: 'put',
        body: paramdata,
        headers: new Headers({
            'Authorization': creds})
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

        });
}
