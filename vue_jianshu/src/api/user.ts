import request from '../axios/axios';

/*
 * 描述：用户登录
 * 参数data: object  {username: '用户名', password: '密码'}
 */
export function get1(data: any) {
  return request({
    method: 'post',
    url: '/getall.do',
    data: data
  });
}


export function updatainfo(data: any) {
  return request({
    method: 'post',
    url: '/updatainfo.do',
    data: data
  });
}

export function updatainfo2(data: any) {
  return request({
    method: 'post',
    url: '/updatainfo2.do',
    data: data
  });
}


export function deleteuser(data: any) {
  return request({
    method: 'post',
    url: '/deleteuser.do',
    data: data
  });

  
}

export function selectinfo(data: any) {
  return request({
    method: 'post',
    url: '/selectinfo.do',
    data:data
  });
}