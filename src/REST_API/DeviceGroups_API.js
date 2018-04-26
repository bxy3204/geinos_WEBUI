import {get_creds, get_route} from "./API";

export function get_device_groups() {
    let route = get_route();
    let creds = get_creds();
    const device_groups = fetch( route + '/device_groups',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),
        });

    return device_groups;
}

export function add_device_group(group) {
    let route = get_route();
    let creds = get_creds();

    let formdata = new FormData();
    formdata.append('group_name', group.name);
    formdata.append('attribute', group.attribute);
    formdata.append('value', group.value);


    fetch( route + '/device_groups',
        {
            method: 'post',
            body: formdata,
            headers: new Headers({
                'Authorization': creds}),
        });
}