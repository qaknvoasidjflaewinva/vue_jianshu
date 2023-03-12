<template >
    <div v-if="data">
        <div class="left">
            <a href="/">
                <div class="return">回首页</div>
            </a>
            
            <div class="new" @click="addWrited()">新建文章</div>
            <ul class="lists" v-for=" item in data">
                <li :title='item.title' @click="get(item.eid)" class="lis">
                    <span>{{ item.title }}</span>
                    <input type="checkbox" name="dianji" :id="item.eid">
                    <div>
                        <label :for="item.eid" class="set">
                            <svg t="1667787050644" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1926" width="16" height="16">
                                <path
                                    d="M951.7 428.8c-0.2-1.8-0.4-3.3-0.7-4.2v-0.8l-0.4-2.2c-7.1-34.6-30-56.9-58.5-56.9h-4.7c-48.6 0-88-39.6-88-88 0-11.2 5.2-27.1 7.4-32.7 13.8-32.2-0.9-68.9-35-87.6L664.5 95.7l-2-0.7c-8-2.6-17.3-5.7-27.7-5.7-19.4 0-41.2 9-54.7 22.5-16.9 16.7-51.2 41.6-71.6 41.6-20.3 0-54.7-24.8-71.6-41.6-14.4-14.2-34.3-22.5-54.7-22.5-10.7 0-19.7 3-27.7 5.7l-1.8 0.7-112.5 60.9-0.7 0.4c-27.3 17.1-38.4 56.3-24.5 87.4l0.2 0.4 0.2 0.4c2.2 4.9 9 21.5 9 36 0 48.6-39.6 88-88 88h-4.7c-29.8 0-52.1 22-58.5 57.3l-0.4 2v0.7c0 1-0.4 2.4-0.7 4.2-2.5 15.1-8.5 50.7-8.5 79.8 0 29.1 5.9 64.7 8.5 79.8 0.2 1.8 0.4 3.3 0.7 4.2v0.8l0.4 2.2c7.1 34.6 30 56.9 58.5 56.9h2.4c48.6 0 88 39.6 88 88 0 11.2-5.2 27.1-7.4 32.7-13.3 30.3-0.7 69.2 28.7 88.8l0.8 0.4 106 59 2 0.7c8 2.6 17.1 5.7 27.5 5.7 22.2 0 42.2-8.5 54.7-22.5 1.2-0.9 2.4-2.1 3.8-3.3 12.8-11.2 47.2-40.8 69.9-40.8 16.9 0 45.2 17.7 73.7 46.2 14.4 14.2 34.3 22.5 54.7 22.5 13.8 0 24-3.8 35.6-9.5l0.4-0.2 108.7-60.1 0.4-0.4c27.3-17.1 38.4-56.3 24.5-87.4l-0.2-0.4-0.2-0.4c-0.2-0.1-8.7-17.8-7.1-33.7l0.2-1v-1c0-48.6 39.6-88 88-88h5c29.8 0 52.1-22 58.5-57.3l0.4-2v-0.7c0.2-0.8 0.4-2 0.7-3.6 2.6-14.7 8.6-49 8.6-80.4 0.2-29-5.7-64.5-8.3-79.6z m-440 222.4c-76.9 0-139.2-62.3-139.2-139.2s62.3-139.2 139.2-139.2S650.9 435.1 650.9 512s-62.3 139.2-139.2 139.2z"
                                    fill="" p-id="1927"></path>
                            </svg>

                        </label>
                        <div class="delete" @click="deleteEssay(item.eid)">删除</div>
                    </div>
                </li>
            </ul>
            <div class="setup">
                <span>设置</span>
                <span>遇到问题？</span>
            </div>
        </div>
        <Right :eida="eida" :eid1="data[0].eid"></Right>
    </div>
</template>

<script lang="ts" setup>
import Right from "./Right.vue"
import { ref } from "vue";

import { getEssay, deleteWrite, addWrite } from '../../api/Write'
const props = defineProps({
    userid: String
})
let author_id = 1
let data = ref();
let eida = ref()
console.log(data);

getEssay({ id: author_id }).then(res => {
    data.value = res.data
    eida.value = data.value[0].eid
})

function get(eid: number) {
    eida.value = eid;
}

function deleteEssay(eid: number) {
    deleteWrite({ eid: eid }).then(res => {
        if (res.data.affectedRows == 1) {
            alert("删除成功")
            location.reload()
        }
    })
}

function dateFormat() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function addWrited() {
    let update_time = dateFormat()

    addWrite({ author_id: author_id, update_time: update_time }).then(res => {
        if (res.data.affectedRows == 1) {
            location.reload()
        }
    })
}
// function tf() {
//     console.log(T);
// }
// tf()

</script>

<style scoped>
input[name='dianji'] {
    display: none;
}

.left {
    background-color: #404040;
    width: 16.66666667%;
    height: 100vh;
    float: left;
    color: #f2f2f2;
    font-size: 14px;
}

.return {
    margin: 30px 18px 5px;
    padding: 9px 0;
    text-align: center;
    font-size: 15px;
    color: #ec7259;
    border: 1px solid rgba(236, 114, 89, .8);
    border-radius: 20px;
}

.new {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}

.lists {
    list-style: none;
    font-size: 15px;
    color: #f2f2f2;
    background-color: #404040;
    cursor: pointer;
    box-sizing: border-box;
}

.lis {
    padding: 0 15px;
    display: flex;
    align-items: center;
    position: relative;
}

.lis>span {
    display: inline-block;
    line-height: 40px;
    width: 91%;
    height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* width: 200px; */
    overflow: hidden;
}

input[name='dianji']:checked~div>.delete {
    display: block;
}

.delete {
    padding: 10px 15px;
    background-color: white;
    color: #404040;
    position: absolute;
    top: 40px;
    right: 0px;
    z-index: 99999;
    display: none;
}

.lists>li:hover {
    background-color: #666666;
}

.setup {
    width: 16.66666667%;
    position: fixed;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    color: #999;
}

.setup>span:last-child {
    float: right;
    margin-right: 15px;
}

.setup>span {
    cursor: pointer;
}
</style>