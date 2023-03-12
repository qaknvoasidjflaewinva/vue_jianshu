<template>
    <div>
        <div class="container">
            <div class="aside">
                <span class="change-type">关注作者</span>
                <router-link to="/focus/addfocus" class="add-people" @click="changeActive(ref(999))"><i
                        class="iconfont1">&#xe772;</i><span>添加关注</span></router-link>

                <ul class="people-list">
                    <li class="item-1000" :class="{ 'item-active': active == 1000 }" @click="changeActive(ref(1000))">

                        <router-link to="/focus/circle" class="wrap">
                            <div class="avatar">
                                <img src="../../images/简友.png" alt="" style="border:none">
                            </div>
                            <div class="name">简友圈</div>
                        </router-link>

                    </li>
                </ul>
                <ul class="people-list2" v-for="(i, index) in listData">
                    <li class="item-index" :class="{ 'item-active': active == index }" @click="changeActive(ref(index))">
                        <router-link :to="'/focus/follower?id=' + i.uid" class="wrap">
                            <div class="avatar">
                                <img :src="i.head_img_url" alt="" style="border:none">
                            </div>
                            <div class="name">{{ i.user_name }}</div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- <router-view class="aa"></router-view> -->
            <RouterView class="aa" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, onMounted } from 'vue';
import { selectinfo } from '../../api/user'
const listData = <any>ref([
]);
let b: any;
let mydata
if (localStorage.length > 0) {
    mydata = localStorage.getItem('uid');
}
const userid = mydata;
let active = ref(1000);

const changeActive = (index: Ref<number>) => {
    active.value = index.value;
};
onMounted(() => {
  selectinfo({id:userid}).then((res: any) => { 
    let qq = res.data;
        for(let i = 0; i < qq.length; i++) {
            if (qq[i].head_img_url) {
                  b = qq[i].head_img_url
            }else{ b =  "http://localhost:7001/public/headimg/邓紫棋.jpg"}
            let a = { user_name: qq[i].user_name, uid: qq[i].uid, head_img_url: b }
            listData.value.push(a);
        }
    // listData.value = res.data;
    // console.log(listData);
    }).catch((err: string) => {
        console.log("获取数据失败" + err);
    })
})  

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
    /* background-color: #ea6f5a; */
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    box-sizing: border-box;
}

.container {

    width: 1000px;
    margin: 0 auto;
}

.aside {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 86px 0 0;
    padding: 0 0 30px;
    width: 280px;
    overflow: auto;
    box-sizing: border-box;
    z-index: 999;
}

.aside .change-type {
    margin-left: 15px;
    font-size: 15px;
}

/* @font-face {
  font-family: "iconfont";  */
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
    font-size: 15px;
}

.add-people {
    float: right;
    margin: 4px 10px 0 0;
    font-size: 13px;
    color: #333;
    cursor: pointer;

}

.add-people span {
    margin-left: 4px;
    font-size: 13px;
    color: #333;
}

.people-list {
    margin-top: 7px;
    list-style: none;
    border-top: 1px solid #f0f0f0;
    margin-bottom: 10px;
}

.people-list li {
    line-height: 20px;
}

.people-list li:first-child .wrap {
    border-radius: 0 0 0 4px !important;
}

.wrap {
    padding: 10px 13px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    margin-right: 4px;
    display: inline-block;
}

.name {
    font-size: 14px;
    vertical-align: middle;
    display: inline-block;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: black;
    /* padding-bottom: 30px;
    padding-left: 10px; */
}

.avatar img {
    width: 100%;
    height: 100%;

    border-radius: 50%;
}

.people-list2 {
    margin-top: 0px;
    list-style: none;
    margin-bottom: 10px;
}

.people-list2 li {
    line-height: 20px;
}

ul .item-active a {
    background-color: #f0f0f0;
    color: #ea6f5a;
}

.aside li:hover a {
    color: #ea6f5a;
    background-color: #f0f0f0;
    border-radius: 4px;
}
</style>