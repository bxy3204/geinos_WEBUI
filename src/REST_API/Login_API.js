import {get_creds, get_route} from "./API";


export function login(user){
    let route = get_route();
    let creds = get_creds();
    creds = 'Basic '+btoa(user.name+':' + user.password);
    /*
    const formdata = new FormData();
    formdata.append('usr', user.name);
    formdata.append('password', user.password);
    formdata.append('retypepassword', user.retypepassword);
    formdata.append('email', user.email);
    formdata.append('role', user.role);
    */
    console.log(creds);

    const sess = fetch(route + '/login', {
        method: 'post',

        headers: new Headers({

            'Authorization': creds})
    });
    return sess;
}