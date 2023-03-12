<!-- 登录 -->
<template>
    <div class="sign_in">
        <div class="tel" :class="{ bgclass: isAddTelBgc }">
            <img src="../../../images/login/账号.png" alt="">
            <input type="text" placeholder="手机号" v-model="tel_num">
        </div>
        <div class="pwd" :class="{ bgclass: isAddPwdBgc }">
            <img src="../../../images/login/密码.png" alt="">
            <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="tab">
            <label for="rem"><input type="checkbox" id="rem" v-model="checked">记住我</label>
            <!-- 通过手机号发送验证码重置密码 -->
            <span>登录遇到问题？</span>
        </div>
        <button class="login_in" @click="submit">登录</button>
        <div class="more">
            <h6>社交账号登录</h6>
            <ul class="more_so">
                <li><img src="../../../images/login/微博.png" alt=""></li>
                <li><img src="../../../images/login/微信.png" alt=""></li>
                <li><img src="../../../images/login/QQ.png" alt=""></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
// import { login } from '../../../api/login';
import { ElMessage } from 'element-plus'
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// 记住账号密码 引入依赖
import { Base64 } from 'js-base64';
export default {
    setup() {
        const router = useRouter();
        let uid = ref<any>(null);
        let tel_num = ref<any>(null);
        let password = ref<any>(null);
        let checked = ref<any>(null);
        let isAddTelBgc = ref<any>(null);
        let isAddPwdBgc = ref<any>(null);
        onMounted(() => {
            // 勾选记住账号密码后 显示账号密码 并改变输入框背景颜色
            let telnum = localStorage.getItem("telnum");
            if (telnum) {
                tel_num.value = localStorage.getItem("telnum");
                password.value = Base64.decode((localStorage.getItem("pwd") as string));// base64解密
                checked.value = true;
                isAddTelBgc.value = tel_num.value == localStorage.getItem("telnum");
                isAddPwdBgc.value = password.value == Base64.decode((localStorage.getItem("pwd") as string));
            }
        })
        //  前端验证用户名密码 请求后端数据
        const submit = () => {
            // 是否记住账号密码
            if (checked.value) {
                let pwd = Base64.encode(password.value);
                localStorage.setItem("telnum", tel_num.value);
                localStorage.setItem("pwd", pwd);
                localStorage.setItem('check', checked.value)
            } else {
                localStorage.removeItem('telnum');
                localStorage.removeItem('pwd');
                localStorage.removeItem('check')
            };
            //  前端验证用户名密码 请求后端数据
            if (tel_num.value == null || password.value == null) {
                ElMessage.info('手机号码或密码不能为空');
            } else {
                axios
                    .post('http://127.0.0.1:7001/login', {
                        tel_num: tel_num.value,
                        password: password.value
                    })
                    .then((res) => {
                        if (res.data.msg == '登录成功') {
                            uid.value = res.data.uid;
                            localStorage.setItem('uid', uid.value);
                            localStorage.setItem('login', 'true');
                            console.log("登录成功，uid为" + res.data.uid);
                            ElMessage.success('登录成功');
                            router.push({ path: '/' });
                        } else if (res.data.msg == "该用户不存在" || res.data.msg == "密码错误") {
                            ElMessage.error('手机号码或密码不正确，请重试');
                        }
                    });
            }

        };
        return { submit, tel_num, password, checked, isAddTelBgc, isAddPwdBgc, uid };
    }
}
</script>

<style lang="scss" scoped>
$fontcolor :#969696;

.sign_in {
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

    .tel {
        @include inputbox;
        border-radius: 4px 4px 0 0;
    }



    .pwd {
        @include inputbox;
        border-top: none;
        border-radius: 0 0 4px 4px;
    }

    .bgclass {
        background-color: #E8F0FE;
    }

    .tab {
        width: 100%;
        height: 50px;
        color: $fontcolor;
        padding: 18px 0;
        box-sizing: border-box;

        label {
            float: left;
        }

        span {
            float: right;
        }
    }

    .login_in {
        background: #3194d0;
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