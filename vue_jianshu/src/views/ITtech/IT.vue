<template>

    <div class="container">
        <div class="aside">
            <ul class="ul1" id="ul1">
                <li class="item-1" :class="{ 'item-active': active == 1 }" @click="changeActive(ref(1))">
                    <router-link to="/IT/houduan" class="luyou">后端</router-link>
                </li>
                <li class="item-2" :class="{ 'item-active': active == 2 }" @click="changeActive(ref(2))">
                    <router-link to="/IT/qianduan" class="luyou">前端</router-link>
                </li>
                <li class="item-3" :class="{ 'item-active': active == 3 }" @click="changeActive(ref(3))">
                    <router-link to="/IT/Andriod" class="luyou">Andriod</router-link>
                </li>
                <li class="item-4" :class="{ 'item-active': active == 4 }" @click="changeActive(ref(4))">
                    <router-link to="/IT/IOS" class="luyou">IOS</router-link>
                </li>
                <li class="item-5" :class="{ 'item-active': active == 5 }" @click="changeActive(ref(5))">
                    <router-link to="/IT/zhineng" class="luyou">人工智能</router-link>
                </li>
                <li class="item-6" :class="{ 'item-active': active == 6 }" @click="changeActive(ref(6))">
                    <router-link to="/IT/database" class="luyou">数据库</router-link>
                </li>
                <li class="item-7" :class="{ 'item-active': active == 7 }" @click="changeActive(ref(7))">
                    <router-link to="/IT/chenxu" class="luyou">程序开发</router-link>
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

    router.push('/IT/houduan'); 


});

</script>

<style lang="scss" scoped>
// @import '../../style/style.scss'
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
    // height: 804px;
    // background-color: #ea6f5a;
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
</style>