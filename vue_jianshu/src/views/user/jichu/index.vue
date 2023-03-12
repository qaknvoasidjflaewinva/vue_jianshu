<template>
    <div>
<table>
    <tbody class="base">
        <tr>
            <td class="top-line">
                <div class="avatar">
                    <img :src="src1" class="userimg" >
                </div>
            </td>
            <td class="top-line">
            <button class="btn-h" @click="upfile()">
                <input unselectable="on" class="btn-h2" type="file" id="file_c" @change="uploadImg($event)"/>更改头像
            </button>
            </td>
        </tr>
        <tr>
            <td class="setting-title">
                昵称
            </td>
            <td>
                <input type="text" placeholder="请输入昵称" v-model="username">
            </td>
        </tr>
        <tr>
            <td class="setting-title">手机</td>
            <td><button class="btn-h" @click="phone()">绑定手机</button><span class="phone"  :style="{display:a}"   >当前已绑定</span></td>
            <!-- <input type="text" class="phone" :style="{display:a}"> -->
            
        </tr>
        <tr>
            <td class="setting-title">修改密码</td>
            <td>
                <div>请至简书APP(设置-->编辑个人资料-->重置密码）中修改密码</div>
            </td>
        </tr>
        <tr>
            <td class="setting-title">语言设置</td>
            <td>
                <div class="col-8">
                    <input type="radio" value="zh-cn" name="ziti">
                    <span>中文简体</span>
                </div>
                <div>
                    <input type="radio" value="zh-tw" name="ziti">
                    <span>中文繁体</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<input type="submit" class="but-save" value="保存" @click="submit">
    </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, onMounted, watch } from 'vue';
import { get1 } from '../../../api/user'
import { updatainfo } from '../../../api/user'
import $ from 'jquery';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const username = ref(null);
const src1 = ref();


let mydata
if(localStorage.length>0){
                 mydata = localStorage.getItem('uid');
            }
const userid = mydata;




let a = ref('none');
const upfile = () => {
    $('#file_c').click();
};
const phone = () =>{

    a.value = 'inline-block';
}
const uploadImg = async (e: any) => {
    console.log(e.target.files);
    let file=e.target.files[0];
    let formData = new FormData();
    let id = <string>userid;
	if(file) {//如果修改了头像
		formData.append("uploadFile", file, file.name);
	}
    formData.append("id" , id);
    const config = {
		headers: {
			"Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
		}
	};
    let res = await axios.post("http://127.0.0.1:7001/updateimg.do", formData, config); 
	if(res.data==1) {//修改成功
		ElMessage({
        message: '修改成功',
        type: 'success',
  });
        get1({
        id:userid
      }).then((res: any) => {
        if (res.data[0].head_img_url) {
        src1.value = res.data[0].head_img_url;
        }else{
        src1.value = "http://localhost:7001/public/headimg/邓紫棋.jpg"
        }   
      }).catch((err: string) => {
        console.log("获取数据失败" + err);
    });
        
		//刷新显示班级中的学生
	}else {//修改失败
		ElMessage({
        message: '修改失败',
        type: 'error',
  });
	}
};
onMounted(() => {
    get1({
        id:userid
      }).then((res: any) => {
        username.value = res.data[0].user_name
        if (res.data[0].head_img_url) {
        src1.value = res.data[0].head_img_url;
        }else{
        src1.value = "http://localhost:7001/public/headimg/邓紫棋.jpg"
        }   
      }).catch((err: string) => {
        console.log("获取数据失败" + err);
    });
  });

const submit = () => {
      updatainfo({
        username: username.value,
        id: userid,
      }).then((res: any) => {
        ElMessage({
        message: '修改成功',
        type: 'success',
  })
      });
    }
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
.base tr:first-child{
    border: none;
}
.base td{
    padding: 20px 0;
}

.base>.top-line{
    padding: 20px 0;
}
.btn-h{
    font-size: 14px;
    border: 1px solid rgba(59,194,29,.7);
    color: #42c02e!important;
    border-radius: 40px;
    cursor: pointer;
    text-align: center;
    line-height: 14px;
    padding: 4px 12px;
    background: none;
    outline: none;
    
}
.btn-h2{
    display: none;
}
.avatar{
    width: 100px;
    height: 100px;
    display: block;
    cursor: pointer;
    margin-right: 40px;
}
.setting-title{
    font-size: 15px;
    color: #969696;
}

input[type=text] {
    padding: 5px 10px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
}

tr {
    border-bottom: 1px solid #f0f0f0;
}

input[type=checkbox], input[type=radio] {
    margin: 4px 0 0;
    
    line-height: normal;
}
.col-8{
    float: left;
    width: 33.33333%;
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
    outline: none;
}

.userimg{
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
}

/* .phone{
    display: block;
} */

</style>