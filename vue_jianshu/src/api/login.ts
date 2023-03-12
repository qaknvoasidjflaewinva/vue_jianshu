// import request from "../axios/axios";
// export function login(data: any) {
//     return request(
//         {
//             method: 'post',
//             url: '/login',
//             data: data,
//         }
//     )
// }
import request from '../axios/axios';
// 文章渲染
export function essayShow() {
    return request({
        method: 'get',
        url: '/getEssayShow.do'
    });
}
