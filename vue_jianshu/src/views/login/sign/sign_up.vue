<!-- 注册 -->
<template>
    <div class="sign_up">
        <div class="nick">
            <img src="../../../images/login/账号.png" alt="">
            <input type="text" placeholder="你的昵称" @input="nick_yan" v-model="user_name">
            <el-tag class="tip" :class="{ disapper: isnickright }">昵称格式不正确，长度：2~16（中文、英文字母、数字、下划线），下划线位置不限
            </el-tag>
        </div>
        <div class="tel">
            <img src="../../../images/login/手机号.png" alt="">
            <input type="text" placeholder="手机号" @input="tel_change" v-model="tel_num">
            <el-tag class="tip" :class="{ disapper: tel_status }">请输入正确的手机号
            </el-tag>
        </div>
        <div class="code" :class="{ apper: isapper }">
            <img src="../../../images/login/验证码.png" alt="">
            <!-- <div class="sendcode" :class="{ allow: tel_status }" @click="send">发送验证码</div> -->
            <span @click="randyzm()" :class="{ allow: tel_status }" class="sendcode">{{ code }}</span>
            <input type="text" placeholder="验证码" v-model="send_code">
        </div>
        <div class="pwd">
            <img src="../../../images/login/密码.png" alt="">
            <input type="password" placeholder="请输入6-16位密码" @input="pwd_change" v-model="password">
            <el-tag class="tip" :class="{ disapper: ispwdright }">请输入6-16位密码，字母区分大小写</el-tag>
        </div>
        <button class="login_up" @click="register">注册</button>
        <div class="tab">
            <p>
                点击“注册”即代表您同意并愿意遵守简书
                <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
                和<a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>。
            </p>
        </div>
        <div class="more">
            <h6>社交账号直接注册</h6>
            <ul class="more_so">
                <li><img src="../../../images/login/微信.png" alt=""></li>
                <li><img src="../../../images/login/QQ.png" alt=""></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted, ref } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';




// import http from '@/common/api/request.js'
export default {
    setup() {
        let code = ref<any>('获取验证码');
        const router = useRouter();
        let user_name = ref<any>(null);
        let tel_num = ref<any>(null);
        let password = ref<any>(null);
        let send_code = ref<any>(null);
        const tel_status = ref<any>(true);
        const isapper = ref<any>(null);
        const isnickright = ref<any>(true);
        const ispwdright = ref<any>(true);
        // 检查是否登录
        let checkLogin = async function () {
            let res = await axios.get("http://127.0.0.1:7001/checkLogin");
            let flag = res.data;
            if (flag.state == 0) {
                // ElMessage.info('未登录，请先登录，浏览更多精彩内容！');
            } else {
                console.log("已登录");
            }
        }
        // 检查输入的昵称是否正确
        const nick_yan = () => {
            let nickreg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/;
            if (nickreg.test(user_name.value)) {
                isnickright.value = true;
            } else {
                isnickright.value = false;
            }
        };
        // 输入时检查手机号输入是否符合要求
        const tel_change = () => {
            isapper.value = true;
            // 检查手机号输入是否符合要求
            let telreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (telreg.test(tel_num.value)) {
                // 符合要求 按钮高亮
                tel_status.value = true;
            } else {
                tel_status.value = false;
            }
        };
        // 发送验证码
        const randyzm = () => {
            if (tel_status.value) {
                //生成随机验证码
                // let code = ''
                let coden = ''
                var codeLength = 4 //验证码的长度
                var random = new Array(
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                ) //随机数
                for (var i = 0; i < codeLength; i++) {
                    //循环操作
                    var index = Math.floor(Math.random() * 62) //取得随机数的索引（0~61）
                    code.value += random[index] //根据索引取得随机数加到code上
                    coden += random[index] //根据索引取得随机数加到code上
                }
                code.value = coden //把code值赋给验证码
            }
        };

        // 输入时检查密码输入是否符合要求
        const pwd_change = () => {
            let pwdreg = /^([a-zA-Z0-9]){6,16}$/i;
            if (pwdreg.test(password.value)) {
                // 符合要求
                ispwdright.value = true;
            } else {
                ispwdright.value = false;
            }
        };
        onMounted(() => {
            checkLogin();
        });
        // 注册
        const register = () => {
            if (send_code.value.toLowerCase() !== code.value.toLowerCase()) {
                ElMessage.error('验证码错误');
            }
            else if (isnickright && tel_status && ispwdright) {
                user_name = user_name.value;
                tel_num = tel_num.value;
                // send_code = send_code.value;
                password = password.value;
                const url = "http://127.0.0.1:7001/register";
                let promise = axios.post(url, {
                    user_name,
                    tel_num,
                    password
                });
                promise.then(res => {
                    if (res.data.code == 0) {
                        //成功
                        ElMessage.success('注册成功');
                        router.push({ path: '/sign_in' });
                        console.log(res.data.msg);
                    } else {
                        //失败
                        ElMessage.info("msg===" + res.data.msg);
                    }
                }).catch(e => {
                    console.log(e);
                    ElMessage.error('注册异常');
                })
            }

        }
        return { nick_yan, tel_change, register, pwd_change, randyzm, code, ispwdright, isnickright, isapper, user_name, tel_num, password, send_code, tel_status }
    }
}
</script>

<style lang="scss" scoped>
$fontcolor :#969696;

.sign_up {
    width: 300px;

    @mixin sign_icon {
        position: absolute;
        top: 14px;
        left: 10px;
        font-size: 18px;
        color: $fontcolor;
        width: 20px;

    }

    @mixin inputbox {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        margin-bottom: 0;
        padding: 4px 12px 4px 35px;
        border: 1px solid #c8c8c8;
        background-color: hsla(0, 0%, 71%, .1);
        vertical-align: middle;
        position: relative;

        input {
            width: 100%;
            height: 34px;
            background-color: transparent;
            border: none;
            outline: none;
            padding-top: 4px;
        }

        img {
            @include sign_icon;
        }
    }

    .tip {
        position: absolute;
        height: auto;
        width: 190px;
        top: 1px;
        left: 307px;
        white-space: pre-wrap;
        background-color: #EaF1FF;
        padding: 10px 10px;
        // border: 1px solid #b5b5b5;
        border-radius: 5px;
        color: #818181;
        box-shadow: 0 0 3px #e9e9e9;
        // line-height: 45px;


        &::before {
            content: "";
            position: absolute;
            width: 0px;
            height: 0px;
            border: 10px solid transparent;
            border-right-color: #EaF1FF;
            left: -20px;
            top: 7px
        }
    }

    .nick {
        @include inputbox;
        border-radius: 4px 4px 0 0;
        position: relative;
    }

    .tel {
        @include inputbox;
        border-top: none;
    }

    .code {
        display: none;
        @include inputbox;
        border-top: none;



        .sendcode {
            cursor: pointer;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 100px;
            height: 36px;
            font-size: 13px;
            color: #fff;
            background-color: #9DDC93;
            border-radius: 20px;
            line-height: 36px;
            letter-spacing: 4px;
        }

        .allow {
            background-color: #42c02e !important;
        }
    }

    .apper {
        display: block !important;
    }

    .disapper {
        display: none !important;
    }

    .pwd {
        @include inputbox;
        border-top: none;
        border-radius: 0 0 4px 4px;
    }



    .tab {
        width: 100%;
        color: $fontcolor;
        box-sizing: border-box;
        margin: 10px 0;
        padding: 0 30px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;

        a {
            color: #3194d0;
            text-decoration: none;
        }
    }

    .login_up {
        margin-top: 18px;
        background: #42c02e;
        width: 100%;
        padding: 9px 18px;
        font-size: 18px;
        border: none;
        border-radius: 25px;
        color: #fff;
        cursor: pointer;
        outline: none;
        display: block;
        clear: both;
    }

    .more {
        margin-top: 50px;

        h6 {
            position: relative;
            margin: 0 0 10px;
            font-size: 12px;
            color: #b5b5b5;

            @mixin line {
                content: "";
                border-top: 1px solid #b5b5b5;
                display: block;
                position: absolute;
                width: 60px;
                top: 7px;
            }

            &::after {
                @include line;
                right: 30px;
            }

            &::before {
                @include line;
                left: 30px;
            }
        }

        .more_so {
            margin: 18px auto;
            width: 200px;
            display: flex;
            justify-content: space-around;

            li {
                cursor: pointer;
                list-style: none;
            }

        }
    }
}
</style>