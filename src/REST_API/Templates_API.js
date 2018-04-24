const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');


export function get_templates() {
    const templateList = fetch( route + '/templates',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });


    return templateList;
}


export function add_template(file){


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