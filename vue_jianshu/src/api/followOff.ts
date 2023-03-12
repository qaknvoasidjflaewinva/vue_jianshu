import request from "../axios/focusComfollowOff";

export function followOff(follower: any, user: any) {
    return request({
        method: 'get',
        params: {
            follower: follower,
            user: user
        },
        url: '/followOff',
    })
}