<template>
    <div class="login_page">
        <div class="logo">
            <!-- 链接到首页 --><a href="#"><img src="../../images/login/login_logo.png" alt=""></a>
        </div>

        <div class="login_container">
            <div class="downcontent">
                <!-- 链接到下载页 --><a href="#" class="download">下载简书APP</a>
                <div class="download_code">
                    <div class="big">
                    </div>
                    <div class="tri">
                    </div>
                </div>
            </div>

            <div class="main">
                <h4 class="title">
                    <!-- 应该放路由router-link  链接到登录路由 -->
                    <router-link to="/sign_in" class="sign " :class="{ on_click: '/sign_in' === $route.path }">登录
                    </router-link>
                    <b>·</b>
                    <!-- 应该放路由router-link  链接到注册路由 -->
                    <router-link to="/sign_up" class="sign" :class="{ on_click: '/sign_up' === $route.path }">注册
                    </router-link>
                </h4>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { onMounted, ref } from '@vue/runtime-core';
import { method } from 'lodash';
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    setup() {

        onMounted(() => {

        })
        return {}
    },
}
</script>

<style lang="scss" scoped>
$bgcolor: #f1f1f1;
$fontcolor: #969696;

.login_page {
    width: 100%;
    background-color: $bgcolor;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 14px;
    min-width: 900px;
    height: 100vh;
    position: relative;

    .logo {
        position: absolute;
        top: 56px;
        margin-left: 50px;

        img {
            width: 100px;
        }
    }

    .login_container {
        width: 820px;
        height: 600px;
        margin: 0 auto;
        background-image: url(../../images/login/sign_in_bg.png);
        background-size: 40%;
        background-repeat: no-repeat;
        background-position: 45px 0;
        position: relative;

        .downcontent {
            display: flex;
            align-items: center;
            position: absolute;
            left: 60px;
            top: 452px;

            .download {
                display: block;
                width: 252px;
                height: 46px;
                margin-right: 15px;
                background-color: #ea6f5a;
                border-radius: 30px;
                font-size: 18px;
                font-weight: 500;
                color: #fff;
                line-height: 46px;
                cursor: pointer;
            }

            .download_code {
                width: 46px;
                height: 46px;
                position: relative;
                border-radius: 5px;
                background-image: url(../../images/login/login_page_download_code.png);
                background-size: 38px;
                background-repeat: no-repeat;
                background-color: #fff;
                background-position: 4px 4px;
                cursor: pointer;

                &:hover .big {
                    display: block;
                }

                &:hover .tri {
                    display: block;
                }

                .tri {
                    width: 0px;
                    height: 0px;
                    border: 20px solid transparent;
                    border-top-color: #fff;
                    position: absolute;
                    left: 10px;
                    top: -30px;
                    display: none;
                    z-index: 11;
                }

                .big {
                    width: 160px;
                    height: 160px;
                    display: none;
                    background-color: #fff;
                    position: absolute;
                    top: -185px;
                    left: -100px;
                    border-radius: 10px;
                    background-image: url(../../images/login/login_page_download_code.png);
                    background-size: 132px;
                    background-position: 50%;
                    background-repeat: no-repeat;
                    box-shadow: 0 0 15px 0 rgb(0 0 0 / 15%);
                    z-index: 10;
                }

            }
        }

        .main {
            float: right;
            width: 400px;
            margin: 0 auto;
            padding: 50px 50px 30px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 0 8px rgb(0 0 0 / 10%);
            box-sizing: border-box;
            display: inline-block;

            .title {
                margin: 0 auto 50px;
                padding: 10px;
                font-weight: 400;
                color: #969696;

                .sign {
                    font-size: 18px;
                    padding: 10px;
                    font-weight: 700;
                    color: $fontcolor;
                }

                .on_click {
                    color: #ea6f5a;
                    border-bottom: 2px solid #ea6f5a;
                }

                b {
                    padding: 10px;
                    font-weight: 700;
                }
            }
        }
    }


}
</style>