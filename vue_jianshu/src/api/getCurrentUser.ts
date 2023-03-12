import request from "../axios/getCurrentUser";

export function showList(id:any) {
    return request({
        method: 'get',
        params: {
            key:id
        },
        url: '/getCurrentUser',
    })
}