import request from '../axios/axios';
// 文章渲染
export function essayShow() {
    return request({
        method: 'get',
        url:'/getEssayShow.do'
    });
}

// 推荐阅读
export function essayHot() {
    return request({
        method: 'get',
        url: '/getEssayHot.do'
    });
}
// 作者名和头像
export function auNameHeadImg(data: any) {
    return request({
        method: 'get',
        url: '/getAuNameHeadImg.do',
        params: data
    });
}
// 作者文章推荐
export function auEssayHot(data: any) {
    return request({
        method: 'get',
        url: '/getAuEssayHot.do',
        params: data
    });
}
// 作者关注还没写!!!
export function auIsFollow(data:any) {
    return request({
        method: 'get',
        url: '/getAuIsFollow.do',
        params:data
    });
}
// 文章
export function auEssay(data:any) {
    return request({
        method: 'get',
        url: '/getAuEssay.do',
        params:data
    });
}

// 文章正文页面的作者个人信息
export function auEasyInfo(data: any) {
    return request({
        method: 'get',
        url: '/getAuEasyInfo.do',
        params: data
    });
}

// 首次渲染判断用户是否点赞
export function auEasyLike(data: any) {
    return request({
        method: 'get',
        url: '/getAuEasyLike.do',
        params: data
    });
}

// 文章正文取消点赞
export function auEasyLikeNo(data: any) {
    return request({
        method: 'get',
        url: '/getAuEasyLikeNo.do',
        params: data
    });
}
// 文章正文点赞
export function auEasyLikeYes(data: any) {
    return request({
        method: 'get',
        url: '/getAuEasyLikeYes.do',
        params: data
    });
}