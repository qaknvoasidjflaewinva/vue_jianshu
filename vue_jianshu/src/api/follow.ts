import request from "../axios/focusComfollow";

export function follow(status:any, follower:any, user:any) {
    return request({
        method: 'get',
        params: {
            status: status,
            follower: follower,
            user:user
        },
        url: '/follow',
    })
}