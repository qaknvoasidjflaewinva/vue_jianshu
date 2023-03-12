<template>
    <div>
<table>
    <tbody class="base">
         <tr>
            <td class="setting-title top-line">性别</td>
            <td class="top-line">
                <input type="radio" value="1" name="sex" v-model="gender">
                <span>男</span>
                <input type="radio" value="2" name="sex" v-model="gender">
                <span>女</span>
                <input type="radio" value="3" name="sex" v-model="gender">
                <span>保密</span>
            </td>
         </tr>
         <tr>
            <td class="setting-title">个人简介</td>
            <td>
                <form>
                    <textarea placeholder="请填写个人简介" v-model="introduction"></textarea>
                </form>
            </td>
         </tr>
         <tr>
            <td class="setting-title">修改密码</td>
            <td>
                <el-input
                v-model="input"
                type="password"
                placeholder="输入修改后的密码"
                show-password
                 />
            </td>
         </tr>
         <tr>
            <td class="setting-title" id="wbs">个人网站</td>
            <td>
                <form>
                     <input type="text" name="website" placeholder="http://你的网址"> 
                     <p class="pull-right">填写后会在个人主页显示图标</p>
                </form>
            </td>
         </tr>
    </tbody>
</table>
<input type="submit" class="but-save" value="保存" @click="submit">
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { updatainfo2,get1 } from '../../../api/user';
import { ElMessage } from 'element-plus';
import router from '../../../Router/router';
const input = ref(null)
const gender = ref(null)
const introduction = ref()
let mydata
if(localStorage.length>0){
                 mydata = localStorage.getItem('uid');
            }
const userid = mydata;



const submit = () => {
    
    
    
        updatainfo2({
        password: input.value,
        gender: gender.value,
        introduction: introduction.value,
        id: userid,
      }).then((res: any) => {
        ElMessage({
        message: '修改成功',
        type: 'success',
  })
      });  
      
    }

onMounted(() => {
    
        get1({
        id:userid
      }).then((res: any) => {
        gender.value = res.data[0].sex
        introduction.value = res.data[0].introduction
      }).catch((err: string) => {
        console.log("获取数据失败" + err);
    });
    
   
  });
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
table{
    border-collapse: collapse;
    border-spacing: 0;
}
.base td{
    padding: 20px 0;
}

tr {
    border-bottom: 1px solid #f0f0f0;
}

.setting-title{
    width: 150px;
    font-size: 15px;
    color: #969696;
}

#wbs{
padding-bottom: 40px;
}
.top-line{
    padding-top: 0;
}

input[type=radio] {
    margin: 4px 0 0;
    
    line-height: normal;
}
.top-line span{
    margin: 0 20px 0 6px;
    font-size: 15px;
    vertical-align: middle;
}

textarea{
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    padding: 8px 10px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    display: block;
    resize: none;
    outline-style: none;
}

.base input[name=website] {
    width: 475px;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    outline: none;
}

.pull-right {
    float: right!important;
    margin: 0;
    padding: 8px 0 0;
    font-size: 12px;
    color: #969696;
    clear: both;
}

.but-save{
    width: 100px;
    margin: 30px 0 60px;
    border-radius: 20px;
    border: none;
    background-color: #3db922;
    color: #fff;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857;
    cursor: pointer;
    outline: none;
}
</style>