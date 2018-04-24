const route='http://127.0.0.1:5000';
const creds = 'Basic '+btoa('test:password');

export function get_devices() {
    const devices = fetch( route + '/devices',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': creds}),

        });
    return devices;
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
