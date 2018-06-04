export function get_route()
{
    return 'http://' + window.location.hostname.toString() + ':5000';
}

export function get_creds()
{

    return 'Basic '+btoa(localStorage.getItem("session"));
}