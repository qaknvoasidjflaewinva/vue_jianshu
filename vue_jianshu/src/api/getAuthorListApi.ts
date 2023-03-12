import request from "../axios/focusCom";

export function showList(id?:any) {
    return request({
        method: 'get',
        url: '/getAuthor',
        params: {
            id:id
        }
    })
}