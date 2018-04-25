import {get_creds, get_route} from "./API";

export function get_templates() {
    let route = get_route();
    let creds = get_creds();
    const templateList = fetch( route + '/templates',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });


    return templateList;
}


export function add_template(file){
    let route = get_route();
    let creds = get_creds();

    let templateForm = new FormData();
    templateForm.append('file',file);
    return fetch( route + '/templates',
        {
            method: 'post',
            body: templateForm,
            headers: new Headers({
                'Authorization': creds}),

        });
}