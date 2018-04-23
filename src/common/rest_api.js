const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');

export function assign(assign_data){
    const assign = new FormData();
    assign.append('temp_name', assign_data.temp_name);
    assign.append('group_name', assign_data.group_name);


    fetch(route + '/assign', {
        method: 'post',
        body: assign,
        headers: new Headers({
            'Authorization': creds})
    });
}



export function add_template(file){


    let templateForm = new FormData();
    templateForm.append('file',file);
       return fetch( route + '/templates',
        {
            method: 'post',
            body: templateForm,
            headers: new Headers({
                'Authorization': creds}),

        });
}


export function get_templates() {
    const templateList = fetch( route + '/templates',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });


    return templateList;
}

export function get_devices() {
    const devices = fetch( route + '/devices',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
    return devices;
}

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





export function add_device(device){
    let formdata = new FormData();
    formdata.append('vendor_id', device.name);
    formdata.append('serial_num', device.serial);
    formdata.append('model_num', device.model);
    fetch(route + '/devices', {
        method: 'put',
        body: formdata,
        headers: new Headers({
            'Authorization': creds})
    });
}


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

export function add_param(param){
    const paramdata = new FormData();
    paramdata.append('name', param.name);
    paramdata.append('type', param.type);
    paramdata.append('value', param.value);
    fetch(route + '/parameters', {
        method: 'put',
        body: paramdata,
        headers: new Headers({
            'Authorization': creds})
    });
}

export function get_param() {
    return fetch( route + '/parameters',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
}
