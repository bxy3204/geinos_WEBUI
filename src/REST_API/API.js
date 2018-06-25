
export function get_route()
{
    return 'http://' + window.location.hostname.toString() + ':5000';
}

export function get_creds()
{
    console.log(btoa(localStorage.getItem("session")))
    return 'Basic '+btoa(localStorage.getItem("session"));
    //return 'Basic '+btoa('test:password');
}

export function get_status()
{
    console.log(btoa(localStorage.getItem("session")))
    return 'Basic '+btoa(localStorage.getItem("session"));
    //return 'Basic '+btoa('test:password');
}