import {get_creds, get_route} from "./API";

export function get_templates() {
    let route = get_route();
    let creds = get_creds();
    return fetch( route + '/templates',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        }).then(function(response) {
            return response.json();
        });
}

export function add_template(file){
    let route = get_route();
    let creds = get_creds();

    const templateForm = JSON.stringify({
        "file" : file,
    });
    return fetch( route + '/templates',
        {
            method: 'post',
            body: templateForm,
            headers: new Headers({
                'Authorization': creds,
                'Content-Type': 'application/json'})
        });
}