import {get_creds, get_route} from "./API";


export function get_users() {
    let route = get_route();
    let creds = get_creds();

    return fetch( route + '/users',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        }).then(function(response) {
            return response.json();
        });
}



export function delete_user(user){
    let route = get_route();
    let creds = get_creds();
    const formdata = new FormData();
    formdata.append('rmusr', user);
    fetch( route + '/users', {
        method: 'delete',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}

export function add_user(user){
    let route = get_route();
    let creds = get_creds();
    const formdata = new FormData();
    formdata.append('usr', user.name);
    formdata.append('password', user.password);
    formdata.append('retypepassword', user.retypepassword);
    formdata.append('email', user.email);
    formdata.append('role', user.role);
    fetch(route + '/users', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}