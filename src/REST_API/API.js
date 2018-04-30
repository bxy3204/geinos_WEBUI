export function get_route()
{
    return window.location.hostname + ":5000";
}

export function get_creds()
{
    return 'Basic '+btoa('test:password');
}