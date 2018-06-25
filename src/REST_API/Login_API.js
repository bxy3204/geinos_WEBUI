import {get_creds, get_route} from "./API";


export function login(user) {
    let route = get_route();
    let creds = get_creds();
    creds = 'Basic ' + btoa(user.name + ':' + user.password);
    /*
    const formdata = new FormData();
    formdata.append('usr', user.name);
    formdata.append('password', user.password);
    formdata.append('retypepassword', user.retypepassword);
    formdata.append('email', user.email);
    formdata.append('role', user.role);
    */
    console.log(creds);

    return fetch(route + '/login', {
        method: 'post',
        headers: new Headers({
            'Authorization': creds,
            'content-type': 'application/json'
        })
    });
}
    export function verify_token(){
        let route = get_route();
        let creds = get_creds();
        console.log("in verify")
        /*
        const formdata = new FormData();
        formdata.append('usr', user.name);
        formdata.append('password', user.password);
        formdata.append('retypepassword', user.retypepassword);
        formdata.append('email', user.email);
        formdata.append('role', user.role);
        */

        return fetch(route + '/verify_token', {
            method: 'get',
            headers: new Headers({
                'Authorization': creds,
                'content-type': 'application/json'})
        }).then(function(response)  {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        })
            .then((data) => {

                if(data.messsage == "User not logged in."){
                    return false;
                } else if (data.message == "User logged in.") {
                    return true;
                }
                console.log(data.message);
                throw "API Response not recognized";
            })
            .catch((error) => {
                console.log('error: ' + error);
            });

}