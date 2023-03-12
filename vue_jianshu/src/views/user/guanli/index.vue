<template>
    <div>
        <table>
            <div class="delete-account-content">
                <a class="show-button" :class="istrue ? 'b' : 'a'" @click="istrue = !istrue"><span
                        class="iconfont1">删除帐号&#xe665;</span></a>
                <div class="content" :class="istrue ? 'a' : 'b'">
                    <h4>永久删除帐号</h4>
                    <ul>
                        <li>如果你不小心创建出了多余的帐号，或在绑定帐号的时候提示帐号被占用，你可以在<a href="/p/eea64a29cf9d">简书帐号绑定解绑相关问题汇总</a>中获得相关帮助。
                        </li>
                        <li>如果你对简书上的某些内容、功能或社区规则不满意，你可以在<a href="/help">帮助与反馈页</a>向我们提出。</li>
                        <li>删除帐号前，请确保已经没有任何公开或私密文章，且钱包中全部余额已清零。</li>
                        <li>删除帐号是不可逆的操作，删除后将无法恢复。</li>
                        <li>如果账号已被封号，则删除账号后原有手机号无法再次注册，你可以先「<a href="https://www.jianshu.com/mobile/appeal/account"
                                target="_blank">申诉解封</a>」，或联系邮箱 help@jianshu.com。</li>
                    </ul>
                    <a class="btn btn-hollow" @click="love">保留我的帐号</a> <a class="btn btn-delete" @click="open" >删除帐号</a>
                    
                </div>
            </div>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from 'vue-router';
import { deleteuser } from '../../../api/user';
let istrue = ref(true);
let mydata
if(localStorage.length>0){
                 mydata = localStorage.getItem('uid');
            }
const userid = mydata;

const router = useRouter();

const del = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('uid');
    deleteuser({

        id: userid

    }).then((res) => {
        ElMessage({
        message: '账号已注销',
        type: 'success',
  });
  localStorage.removeItem('login');
  localStorage.removeItem('uid');
  router.push('/sign_in')
    });
};

const love = () => {
    ElMessage({
        message: '感谢留下',
        type: 'success',
  })
};

const open = () => {
  ElMessageBox.confirm(
    '确定要删除账号吗?X﹏X',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '我再想想',
      type: 'warning',
    }
  )
    .then(() => {
        del()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      
    })
    .catch(() => {
        
    //   ElMessage({
    //     type: 'info',
    //     message: '',
    //   })
    })
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.delete-account-content {
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;
}

.a {
    display: none;
}

.b {
    display: block;
}

.show-button {
    font-size: 15px;
    color: #969696;
    cursor: pointer;
}

a {
    text-decoration: none;
}

h4 {
    margin-bottom: 25px;
    font-size: 18px;
    margin-top: 10px;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
}

ul {
    margin-bottom: 25px;
    padding-left: 20px;
    font-size: 14px;
}

li {
    margin-bottom: 15px;
    line-height: 20px;
}

li::marker {
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
}



.btn-hollow {
    margin-right: 10px;
    font-size: 14px;
    border: 1px solid rgba(59, 194, 29, .7);
    color: #42c02e !important;
    padding: 4px 12px;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    line-height: normal;
    border-radius: 40px;
    background: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}

.btn-delete {
    color: #999 !important;
    border-color: #999;
    opacity: 1;
    pointer-events: unset;
    font-size: 14px;
    border: 1px solid rgba(236, 97, 73, .7);
    padding: 4px 12px;
    font-weight: 400;
    line-height: normal;
    border-radius: 40px;
    background: none;
    text-align: center;
    cursor: pointer;
}

/* @font-face {
    font-family: "iconfont"; */
    /* Project id 3552783 */
    /* src:
        url('../../inconfont/iconfont.woff2?t=1667205153988') format('woff2'),
        url('../../inconfont/iconfont.woff?t=1667205153988') format('woff'),
        url('../../inconfont/iconfont.ttf?t=1667205153988') format('truetype');

} */

.iconfont1 {
    font-family: "iconfont" !important;

    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 8px 0px 0px 0px;

    font-size: 15px;
    color: #a0a0a0;
    text-align: center;
    display: block;


}
</style>