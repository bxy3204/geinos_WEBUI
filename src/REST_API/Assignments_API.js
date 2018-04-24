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