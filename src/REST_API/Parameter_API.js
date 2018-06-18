import {get_creds, get_route} from "./API";

export function add_param(param){
    let route = get_route();
    let creds = get_creds();
    const jsondata = {
        'name' : param.name,
        'type' : param.type
    };
    const paramdata = new FormData();
    paramdata.append('name', param.name);
    paramdata.append('type', param.type);
    if (param.type !==  "IP-Range") {
        paramdata.append('value', param.value);
        jsondata['value'] = param.value;
    }
    else{
        paramdata.append('range_start', param.range_start);
        paramdata.append('range_end', param.range_end);
        jsondata['range_start'] = param.range_start;
        jsondata['range_end'] = param.range_end;
    }
    console.log(jsondata);
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
