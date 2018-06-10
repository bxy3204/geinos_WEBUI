import {get_creds, get_route} from "./API";

export function get_logs() {
    let route = get_route();
    let creds = get_creds();
    console.log(route + '/logs');
    return fetch( route + '/logs',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        }).then(function(response) {
            console.log(route + '/logsassssssssss');
            return response.json();
        });
}