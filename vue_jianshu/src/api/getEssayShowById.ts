import request from "../axios/getEssayShowById"

export function essayShowById(id: any) {
    return request({
        method: 'get',
        url: '/getEssayShowByUid',
        params: {
            id:id
        }
    });
}


export function essayShowBysta(statu:any) {
    return request({
        method: 'get',
        url: '/getEssayShowBysta',
        params: {
            statu:statu
        }
    });
}