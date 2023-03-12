import request from "../axios/focusComfollow";

export function getFollowStatus(follower: any, user: any) { 
    return request({
        method: 'get',
        params: {
            follower: follower,
            user: user
        },
        url:'/getFollowStatus'
    })
}