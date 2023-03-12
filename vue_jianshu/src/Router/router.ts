// 1引入      Hash模式 History模式 
import { createRouter, createWebHashHistory } from 'vue-router';

// 登录注册
import Login from '../views/login/login.vue';
import SignIn from '../views/login/sign/sign_in.vue';
import SignUp from '../views/login/sign/sign_up.vue';
import Footer from '../components/Footer.vue';
import NavBar from '../components/NavBar.vue';
import RouterView from '../views/ITtech/IT.vue';
import RouterView2 from '../views/focus/focusindex.vue';
import RouterView3 from '../views/user/userindex.vue';
import RouterView4 from '../views/information/information.vue';
import Write from '../views/Write/index.vue';
import userHome from '../views/userHome/userHome.vue'
import recommendAttention from '../views/focus/recommendAttention.vue'
import LayOut from '../components/layOut.vue'
import p from '../views/essay/index.vue';
import Vip from '../views/vip/index.vue'
import DownloadAPP from '../views/download/index.vue'
import comments from '../views/essay/comment/comment.vue'
import release from '../views/Write/release.vue'
// 2创建路由表

const routes: any[] = [
    {
        name: 'LayOut',
        path: '/',
        component: LayOut,
        children: [
            {
                name: 'IT',
                path: 'IT',
                component: RouterView,
                redirect: '/IT/houduan',
                children: [
                    { name: 'qian', path: 'qianduan', component: () => import('../views/ITtech/qianduan/index.vue') },
                    { name: 'hou', path: 'houduan', component: () => import('../views/ITtech/houduan/index.vue') },
                    { name: 'chenxu', path: 'chenxu', component: () => import('../views/ITtech/chenxu/index.vue') },
                    { name: 'Andriod', path: 'Andriod', component: () => import('../views/ITtech/Andriod/index.vue') },
                    { name: 'database', path: 'database', component: () => import('../views/ITtech/database/index.vue') },
                    { name: 'IOS', path: 'IOS', component: () => import('../views/ITtech/IOS/index.vue') },
                    { name: 'zhineng', path: 'zhineng', component: () => import('../views/ITtech/zhineng/index.vue') },
                ]
            },
            {
                name: 'user',
                path: 'user',
                component: RouterView3,
                redirect: '/user/jichu',
                children: [
                    { name: 'geren', path: 'geren', component: () => import('../views/user/geren/index.vue') },
                    { name: 'jichu', path: 'jichu', component: () => import('../views/user/jichu/index.vue') },
                    { name: 'guanli', path: 'guanli', component: () => import('../views/user/guanli/index.vue') }
                ]
            },
            {
                name: 'focus',
                path: 'focus',
                component: RouterView2,
                redirect: '/focus/circle',
                children: [
                    { name: 'addfocus', path: 'addfocus', component: () => import('../views/focus/addfocus/index.vue') },
                    { name: 'circle', path: 'circle', component: () => import('../views/focus/circle/index.vue') },
                    { name: 'follower', path: 'follower', component: () => import('../views/focus/follower/index.vue') }
                ]
            },
            {
                name: 'information',
                path: 'information',
                component: RouterView4,
                redirect: '/information/pinglun',
                children: [
                    { name: 'pinglun', path: 'pinglun', component: () => import('../views/information/pinglun/pinglun.vue') },
                    { name: 'love', path: 'love', component: () => import('../views/information/love/love.vue') },
                    { name: 'sfocus', path: 'sfocus', component: () => import('../views/information/sfocus/sfocus.vue') },
                ]
            },
            { path: 'vip', name: 'Vip', component: Vip },
            {
                name: 'DownloadAPP',
                path: 'downloadAPP',
                component: DownloadAPP
            },
            {
                name: 'userHome',
                path: 'userHome',
                component: userHome
            },
        ]
    },
    
    { path: '/Write', name: 'Write', component: Write },
    { path: '/release', name: 'release', component: release },
    {
        name: 'Login',
        path: '/',
        component: Login,
        redirect: '/sign_in',
        children: [
            {
                name: 'SignIn',
                path: 'sign_in',
                component: SignIn
            },
            {
                name: 'SignUp',
                path: 'sign_up',
                component: SignUp
            }
        ]
    },
    {
        name: 'zhuye',
        path: '/zhuye',
        component: userHome
    },
    {
        name: 'tuijianzuozhe',
        path: '/tuijianzuozhe',
        component: recommendAttention
    },
    {
        name: 'p',
        path: '/p',
        // path: '/p/:eid:title',
        component: p
    },

    {
        name: 'comments',
        path: '/comments',
        component: comments
    }
];
// 3创建路由器
const router = createRouter({
    routes,
    history: createWebHashHistory()
});



// 4导出路由器
export default router;
