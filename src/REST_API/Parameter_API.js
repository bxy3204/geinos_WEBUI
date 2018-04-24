const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');

export function add_param(param){
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
    return fetch( route + '/parameters',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
}
