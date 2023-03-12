<template>
    <div class="container">
        <div class="aside">
            <ul class="ul1" id="ul1">
                <li class="item-1" :class="{ 'item-active': active == 1 }" @click="changeActive(ref(1))">
                    <router-link to="/information/pinglun" class="luyou"><span class="iconfont1">&#xe637;</span>评论</router-link>
                </li>
                <li class="item-2" :class="{ 'item-active': active == 2 }" @click="changeActive(ref(2))">
                    <router-link to="/information/love" class="luyou"><span class="iconfont1">&#xe761;</span>喜欢和赞</router-link>
                </li>
                <li class="item-3" :class="{ 'item-active': active == 3 }" @click="changeActive(ref(3))">
                    <router-link to="/information/sfocus" class="luyou"><span class="iconfont1">&#xe64c;</span>关注</router-link>
                </li>

            </ul>
        </div>
        <!-- <router-view class="aa"></router-view> -->
        <RouterView  class="aa"/>
    </div>
</template>

<script setup lang="ts">
import RouterView from '../../components/RouterView.vue';
import { ref, computed, Ref, onMounted } from 'vue';
import $ from 'jquery';
import router from '../../Router/router';


let active = ref(1);

const changeActive = (index: Ref<number>) => {
    active.value = index.value;
};

onMounted(() => {

router.push('/information/pinglun'); 


});
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.aa {
    margin-left: 28%;
    margin-top: 20px;
    width: 66.66667%;
    height: 804px;
    background-color: #ea6f5a;
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    box-sizing: border-box;
}

.aside {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 86px 0 0;
    padding: 0 0 30px;
    width: 280px;
    overflow: auto;
}

.container {

    width: 1000px;
    margin: 0 auto;
}

.ul1 {
    margin-top: 0;
    margin-bottom: 10px;
}

.ul1>li {
    line-height: 20px;
}

.aside li:focus a {
    color: #ea6f5a;
    font-weight: 500;
}

.aside li.active a,
.aside li:hover a {
    color: #ea6f5a;
    background-color: #f0f0f0;
    border-radius: 4px;
}

.luyou {
    color: black;
    padding: 10px 15px;
    font-size: 15px;
    display: block;
}

#ul1 .item-active a {
    background-color: #f0f0f0;
    color: #ea6f5a;
}

.iconfont1{
    font-family: "iconfont" !important;

    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 15px;
    font-size: 24px;
    color: #ea6f5a;
    vertical-align: middle;
}
</style>