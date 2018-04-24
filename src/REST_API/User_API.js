const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');

export function get_users() {
    const users = fetch( route + '/users',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
    return users;
}



export function delete_user(user){
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