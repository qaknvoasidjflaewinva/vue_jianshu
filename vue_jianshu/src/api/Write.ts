import request from '../axios/Write';

export function upOneFile() {
    return request({
        url: '/upOneFile.do',
        method: 'post'
    });
}
export function addWrite(data: any) {
    return request({
        url: '/addWrite.do',
        method: 'post',
        data: data
    });
}

export function getEssay(data: any) {
    return request({
        url: '/getEssay.do',
        method: 'get',
        // get请求
        params: data
        // post请求
        // data:data
    });
}
export function getEssayo(data: any) {
    return request({
        url: '/getEssayo.do',
        method: 'get',
        // get请求
        params: data
        // post请求
        // data:data
    });
}
export function deleteWrite(data: any) {
    return request({
        url: '/deleteWrite.do',
        method: 'get',
        // get请求
        params: data
        // post请求
        // data:data
    });
}
export function releaseWrite(data: any) {
    return request({
        url: '/releaseWrite.do',
        method: 'get',
        // get请求
        params: data
        // post请求
        // data:data
    });
}