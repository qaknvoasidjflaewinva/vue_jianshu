<template>
    <div>
        <div class="container">
    <div class="aside">
        <ul class="ul1">
            <li class="item-0" :class="{'item-active' : active == 0}" @click="changeActive(ref(0))"><router-link to="/user/jichu" class="luyou"><span class="iconfont1">&#xe62e;</span><span class="text">基础设置</span></router-link></li>
            <li class="item-1" :class="{'item-active' : active == 1}" @click="changeActive(ref(1))"><router-link to="/user/geren" class="luyou"><img src="../../images/个人图标.png" alt=""><span class="text">个人资料</span></router-link></li>
            <!-- <li class="item-2" :class="{'item-active' : active == 2}" @click="changeActive(ref(2))"><router-link to="/user/heimingdan" class="luyou">黑名单</router-link></li> -->
            <li class="item-3" :class="{'item-active' : active == 3}" @click="changeActive(ref(3))"><router-link to="/user/guanli" class="luyou"><img src="../../images/设置图标.png" alt=""><span class="text">账号管理</span></router-link></li>
        </ul>
    </div>
    <!-- <router-view class="aa"></router-view> -->
    <RouterView class="aa" />
</div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, Ref, onMounted } from 'vue';
import RouterView from '../../components/RouterView.vue';

import $ from 'jquery';
import router from '../../Router/router';




let active = ref(0);

const changeActive = (index: Ref<number>) => {
  active.value = index.value;
};

onMounted(() => {

router.push('/user/jichu'); 


});

</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}

a {
    text-decoration: none;
}
.aside{
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 86px 0 0;
    padding: 0 0 30px;
    width: 280px;
    overflow: auto;
    box-sizing: border-box;
}
.container{
    
    width: 1000px;
    margin: 0 auto;
}
.ul1{
    margin-top: 0;
    margin-bottom: 10px;
}
.ul1>li{
    line-height: 20px;
}

.aside li:hover a {
    
    background-color: #f0f0f0;
    border-radius: 4px;
}
.aside a {
    color: black;
    padding: 10px 15px;
    font-size: 15px;
    display: block;
}

.aa{
    margin-left: 28%;
    margin-top: 20px;
    width: 66.66667%;
    // height: 804px;
    
    float: left;
    position: relative;
    top: 0;
    min-height: 1px;
    padding-right: 15px;
    box-sizing: border-box;
}

@font-face {
  font-family: "iconfont"; /* Project id 3552783 */
  src: 
  url('../../inconfont/iconfont.woff2?t=1667205153988') format('woff2'),
  url('../../inconfont/iconfont.woff?t=1667205153988') format('woff'),
  url('../../inconfont/iconfont.ttf?t=1667205153988') format('truetype');
       
}

.iconfont1 {
  font-family: "iconfont" !important;
  
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 8px 0px 0px 0px;
  
  font-size: 40px;
  color: #a0a0a0;
  text-align: center;
  display: block;
  
  
}

.text{
    font-size: 18px;
    line-height: 18px;
    
    
}

.luyou{
    display: flex !important;
    justify-content:flex-start;
    align-items:center;
}

.item-active{
background-color: #f0f0f0;
}
</style>