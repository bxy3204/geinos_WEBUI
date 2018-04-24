const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');

export function get_device_groups() {
    const device_groups = fetch( route + '/device_groups',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),
        });

    return device_groups;
}

export function add_device_group(group) {
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
    console.log(formdata);
}