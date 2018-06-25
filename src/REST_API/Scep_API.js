import {get_creds, get_route} from "./API";


export function add_scep(user){
    let route = get_route();
    let creds = get_creds();
    let jsondata ={
        usr: user.name,
        password : user.password,
        server : user.server,
        digest : user.digest,
        encrypt : user.encrypt
    };
    fetch(route + '/scep', {
        method: 'put',
        body: JSON.stringify(jsondata),
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'})
    });
}