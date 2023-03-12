<!-- /*
*导航栏组件
*/ -->
<template>
    <div class="navbar">
        <div class="main">
            <!-- logo链接到首页 -->
            <a href="/" class="left_logo"><img src="../images/login/login_logo.png" alt=""></a>

            <!-- 登录前后导航栏中间部分 -->
            <div class="container">
                <ul class="nav_list" v-if="isShow()">
                    <li class="disappear" :class="{ click_changecolor: '/' === $route.path }"><a href="/">发现</a> </li>
                    <li class="disappear" :class="{ click_changecolor: '/focus/circle' === $route.path }"><a
                            href="/#/focus">关注</a>
                    </li>
                    <li class="disappear" :class="{ click_changecolor: '/vip' === $route.path }"><a href="/#/vip">会员</a>
                    </li>
                    <li class="disappear" :class="{ click_changecolor: '/IT/houduan' === $route.path }"><a
                            href="/#/IT">IT技术</a>
                    </li>
                    <li class="disappear" :class="{ click_changecolor: '/information/pinglun' === $route.path }"><a
                            href="/#/information">消息</a>
                    </li>
                    <li class="nav_search">
                        <input type="text" placeholder="搜索" v-model="searchValue">
                        <div><img src="../images/navbar/放大镜.png" alt="" @click="search(searchValue)"></div>
                    </li>
                </ul>
                <ul class="nav_list" v-else>
                    <li class="disappear" :class="{ click_changecolor: '/' === $route.path }"><a href="/">首页</a> </li>
                    <li class="disappear" :class="{ click_changecolor: '/downloadAPP' === $route.path }"><a
                            href="/#/downloadAPP">下载App</a> </li>
                    <li class="disappear" :class="{ click_changecolor: '/vip' === $route.path }"><a href="/#/vip">会员</a>
                    </li>
                    <li class="disappear message" :class="{ click_changecolor: '/IT' === $route.path }">
                        <a href="/#/IT">IT技术</a>
                    </li>
                    <li class="nav_search">
                        <input type="text" placeholder="搜索">
                        <div><img src="../images/navbar/放大镜.png" alt="" @click="search(searchValue)"></div>
                    </li>
                </ul>


                <div class="nav_draw">抽奖</div>
            </div>
            <!-- 登录前后导航栏右边部分 -->
            <div class="right_nav" v-if="isShow()">
                <a href="/#/Write" class="write"><img src="../images/navbar/用研.png" alt="">写文章</a>
                <!-- 头像 -->
                <div class="nav_user">
                    <a href="#" class="user"><img :src="src1" alt=""></a>
                    <ul class="dropdown">
                        <li>
                            <router-link :to="'../zhuye?id=' + uid">
                                <i class="iconfont icon-geren"></i>
                                <span>我的主页</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#">
                                <i class="iconfont icon-xihuan"></i>
                                <span>喜欢的文章</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#/user">
                                <i class="iconfont icon-shezhi"></i>
                                <span>设置</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="log_out">
                                <i class="iconfont icon-tuichu"></i>
                                <span>退出</span>
                            </a>
                        </li>

                    </ul>
                </div>


            </div>
            <div class="right_nav" v-else>
                <a href="/#/sign_in" class="write"><img src="../images/navbar/用研.png" alt="">写文章</a>
                <a href="/#/sign_up" class="sign_up">注册</a>
                <a href="/#/sign_in" class="sign_in">登录</a>
            </div>
            <!-- 切换黑夜 文字 -->
            <div class="change_dark">
                <a class="change_word">Aa</a>
                <ul class="darkdetail">
                    <li class="dark_btn">
                        <i class="iconfont"></i>
                        <span>夜间模式</span>
                        <div class="switch">
                            <a class="btn">开</a>
                            <a class="btn">关</a>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

        <div style="clear:both"></div>

    </div>
    <div style="height:60px"></div>
    <router-view></router-view>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { get1 } from '../api/user'
export default {
    data() {
        return {
            followData: {
                msg: '关注',
                flag: true
            },
            eid: this.$route.params.eid,
            uid: localStorage.getItem("uid")
        }
    },
    methods: {
        // 关注的变化
        enFollow() {
            if (this.followData.msg == '关注') {
                this.followData.msg = '关注'
            } else {
                this.followData.msg = '取消关注'
            }
        },

        outFollow() {
            if (this.followData.msg == '取消关注') {
                this.followData.msg = '已关注'
            } else {
                this.followData.msg = '关注'
            }
        },
        isFollow() {
            if (this.followData.flag) {
                this.followData.msg = '已关注';
                ElMessage({
                    message: '关注成功.',
                    type: 'success',
                });
            } else {
                this.followData.msg = '关注';
                ElMessage({
                    message: '取消关注成功.',
                    type: 'success',
                });
            }
            this.followData.flag = !this.followData.flag;
        }
    },
    components: {

    },
    setup() {
        let src1 = ref<any>(null)
        const router = useRouter();
        let changeI = ref<number>(1);
        const currentId = ref<any>(null);
        const searchValue = ref<any>(null);
        // 
        const search = (v: any) => {
            console.log(v);
            let promise = axios.get('http://localhost:7001/getPositionInfoByKey.do', {
                params: {
                    key: v
                }
            });
            promise.then(res => {
                let list = res.data;
                console.log(list);

            }).catch(e => {
                console.log(e);
            })

        };



        // 通过登录状态控制导航栏的显示
        const isShow = () => {
            let check = localStorage.getItem('login');
            return check;
        };
        // 退出登录
        const log_out = () => {
            localStorage.removeItem('login');
            localStorage.removeItem('uid');
            // 退出后刷新页面
            // location.reload();
            // router.go(0);
            router.replace("/");

        };
        onMounted(() => {
            // currentId.value = localStorage.getItem('uid');
            // console.log(currentId.value);
            // console.log(localStorage.getItem("uid"));


            get1({
                id: localStorage.getItem('uid')
            }).then((res: any) => {
                if (res.data[0].head_img_url) {
                    src1.value = res.data[0].head_img_url;
                } else {
                    src1.value = "http://localhost:7001/public/headimg/邓紫棋.jpg"
                }
            }).catch((err: string) => {
                console.log("获取数据失败" + err);
            });
        });
        return { isShow, log_out, changeI, src1, currentId, searchValue, search }
    },


}
</script>


<style lang="scss" scoped>
$nav_hovercolor: #ea6f5a;
$nav_color: #333;
$nav_hoverbgc: #f5f5f5;

.navbar {
    background-color: #fff;
    border: 1px solid #f0f0f0;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    z-index: 10;

    .main {
        min-width: 768px;
        max-width: 1440px;
        margin: 0 auto;
        height: 100%;
        transform: translateY(0);
        transition: transform .3s cubic-bezier(.645, .045, .355, 1);

        .left_logo {
            float: left;
            height: 54px;
            padding-left: 18px;
            line-height: 54px;

            img {
                height: 26px;
                vertical-align: middle;
            }
        }

        .container {
            width: 960px;
            margin-right: auto;
            margin-left: auto;
            padding-left: 15px;
            padding-right: 15px;

            .nav_list {

                li {
                    height: 100%;
                    float: left;
                    // padding: 19px 18px;

                    a {
                        height: 55px;
                        // width: 70px;
                        padding: 0 18px;
                        color: $nav_color;
                        font-size: 17px;
                        display: inline-block;
                        line-height: 55px;
                        text-align: center;
                    }

                    &:hover {
                        background-color: $nav_hoverbgc;
                    }
                }

                .click_changecolor {
                    a {
                        color: $nav_hovercolor;
                    }
                }

                .nav_search {
                    position: relative;
                    padding: 0 40px 0 20px;
                    margin: 8px 0 0 15px;
                    height: 38px;
                    font-size: 14px;
                    border-radius: 40px;
                    background: #eee;

                    input {
                        width: 98px;
                        height: 36px;
                        background-color: transparent;
                        outline-style: none;
                        border: none;
                        transition: width .5s;
                        transition-delay: .1s;

                        &:focus {
                            width: 220px;
                        }

                        &:focus {
                            width: 220px;
                        }
                    }

                    img {
                        position: absolute;
                        top: 9px;
                        right: 8px;
                        width: 18px;
                        height: 18px !important;
                        line-height: normal !important;
                        padding: 0 !important;
                        color: #969696 !important;
                        text-align: center;
                        z-index: 3;
                    }

                }
            }

            .nav_draw {
                float: left;
                height: 40px;
                width: 94px;
                margin-left: 24px;
                margin-top: 10px;
                background-size: 94px 40px;
                background-repeat: no-repeat;
                font-size: 14px;
                color: #FFC961;
                font-weight: 400;
                padding: 13px 0 0 51px;
                display: inline-block;
                background-image: url(../images/navbar/nav_draw.png);
                box-sizing: border-box;
            }
        }

        .change_dark {
            float: right;
            position: relative;


            .change_word {
                line-height: 54px;
                padding: 11px 10px;
                font-size: 24px;
                color: #969696;
            }

            .darkdetail {
                position: absolute;
                top: 54px;
                left: -80px;
                z-index: 900;
                display: none;
                // float: left;
                min-width: 160px;
                padding: 5px 0;
                margin: 2px 0 0;
                list-style: none;
                font-size: 14px;
                text-align: center;
                background-color: #fff;
                border-radius: 0 0 4px 4px;
                border-color: transparent;
                box-shadow: 0 2px 8px rgb(0 0 0 / 10%);

                .dark_btn {
                    .switch {
                        display: inline-block;
                    }

                    .btn {
                        width: 49%;
                        text-align: center;
                        font-size: 14px;
                        letter-spacing: 0 !important;
                        color: #969696;
                        border: 1px solid #e5e5e5;
                        vertical-align: middle;
                        display: inline-block;

                    }
                }

                li {
                    line-height: 50px;
                }
            }
        }

        .right_nav {
            float: right;

            .write {
                float: right;
                width: 100px;
                height: 40px;
                line-height: 40px;
                margin: 8px 12px 0;
                // padding-left: 5px;
                border-radius: 20px;
                font-size: 15px;
                color: #fff;
                background-color: #ea6f5a;

                &:hover {
                    color: #fff;
                    background-color: #ec6149;
                }

                img {
                    width: 16px;
                    margin: auto 4px auto 14px;
                }
            }

            .sign_up {
                float: right;
                width: 80px;
                height: 38px;
                line-height: 36px;
                margin: 9px 5px 0 15px;
                border: 1px solid rgba(236, 97, 73, .7);
                border-radius: 20px;
                font-size: 15px;
                color: #ea6f5a;
                background-color: transparent;
                text-align: center;

                &:hover {
                    color: #ec6149;
                    border-color: #ec6149;
                    background-color: rgba(236, 97, 73, .05);
                }
            }

            .sign_in {
                color: #969696;
                line-height: 54px;
                float: right;
                margin: auto 18px;
            }

            .change_word {
                color: #969696;
                line-height: 54px;
                float: right;
                margin: auto 18px;
            }

            .nav_user {
                float: right;
                position: relative;

                // height: 54px;
                // line-height: 54px;
                &:hover .dropdown {
                    display: block;
                }

                .iconfont {
                    color: #ea6f5a;
                    font-weight: 600;
                    margin-right: 14px;
                    font-size: 18px;
                }

                .user {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    margin: 8px 24px 8px 16px;
                    display: block;
                    cursor: pointer;

                    &::after {
                        content: "";
                        position: absolute;
                        right: -16px;
                        top: 18px;
                        width: 0px;
                        height: 0px;
                        border: 5px solid transparent;
                        border-top-color: #969696;
                    }

                    img {
                        // width: 100%;
                        // height: 100%;
                        width: 40px;
                        height: 40px;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                    }
                }

                .dropdown {
                    position: absolute;
                    top: 54px;
                    left: 0;
                    z-index: 1000;
                    display: none;
                    float: left;
                    min-width: 160px;
                    padding: 5px 0;
                    margin: 2px 0 0;
                    list-style: none;
                    font-size: 14px;
                    text-align: left;
                    background-color: #fff;
                    left: auto;
                    border-radius: 0 0 4px 4px;
                    border-color: transparent;
                    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);

                    li {
                        line-height: 50px;

                        &:hover {
                            background-color: #f5f5f5;
                        }

                        a {
                            padding: 10px 20px;
                            line-height: 30px;
                            color: #333;
                            display: block;
                        }

                    }
                }
            }
        }
    }

    @media screen and (max-width: 1040px) {

        .disappear,
        .nav_draw {
            display: none !important;
        }

    }

    @media screen and (max-width: 700px) {
        .container {
            display: none;
        }

    }

    .essay_nav {
        opacity: 0;
        display: flex;
        justify-content: space-between;
        height: 56px;
        box-sizing: content-box;
        padding-left: 16px;
        padding-right: 16px;
        margin-left: auto;
        margin-right: auto;
        width: 830px;
        transform: translateY(0);
        transition: transform .3s cubic-bezier(.645, .045, .355, 1);
        transition: opacity delay;


        .essay_title {
            overflow: hidden;
            padding: 0 24px;
            max-width: 730px;

            h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #404040;
                line-height: 52px;
            }
        }


        .authorInfo {
            display: flex;
            align-items: center;
            margin-right: 20px;

            .authorImg {
                img {
                    display: block;
                    border-radius: 50%;
                    // border: 1px solid #eee;
                    min-width: 45px;
                    min-height: 45px;
                    width: 45px;
                    height: 45px;
                }
            }

            .authorTitle {
                width: 150px;
                display: flex;
                justify-content: space-between;
                padding-left: 10px;
                margin-right: 55px;

                .nickName {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 28px;
                    color: #7d7d7d;
                }

                .guanZhu {
                    height: 28px;
                    padding: 2px 12px;
                    font-size: 12px;
                    border-radius: 50px;
                    color: #ec7259;
                    background-color: #fff;
                    border: 1px solid #ec7259;
                }
            }
        }

    }
}
</style>
<!-- <template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style> -->