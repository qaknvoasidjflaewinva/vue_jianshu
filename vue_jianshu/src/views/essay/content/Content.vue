<template>
    <div>
        <div class="mainSection" v-for="essi in essayContent">
            <h1>{{ essi.title }}</h1>
            <!-- 作者头像和名字等 -->
            <div class="mainAuthorInfo" v-for="nhi in auEasyInfoList">
                <router-link class="authorImg" :to="'zhuye?id=' + nhi.uid">
                    <!-- 绑定有问题 -->
                    <img :src="nhi.head_img_url">
                </router-link>
                <div class="infoAuthor">
                    <div class="auInfo">
                        <router-link :to="'zhuye?id=' + nhi.uid">
                            <span class=" nickName">{{ nhi.user_name }}</span>
                        </router-link>
                        <!-- 关注变化 -->
                        <div style="display: inline-block;">
                            <el-button class="guanZhu" @click="isFollow1" @mousemove="enFollow1"
                                @mouseleave="outFollow1">{{
                                        tip.msg
                                }}</el-button>
                        </div>
                    </div>
                    <div class="essayTime">
                        <span>{{ essi.update_time }}</span>
                        <span>字数 {{ essi.word_num }}</span>
                    </div>
                </div>
            </div>
            <div class="mainContent">
                <!-- 正文部分 -->
                <div v-html="essi.content"></div>
                <!-- 点赞 -->
                <div class="dianZan">
                    <div>
                        <div class="dianZanIcon" :class="{ isDianZan: isDianZanClass }" @click="DianZan">
                            <span class="iconfont iDianZan">&#xe870;</span>
                        </div>
                    </div>
                    <span class="likeNum">{{ essi.like_num }}人点赞</span>
                </div>
                <div class="line"></div>
                <div class="Azco16">更多精彩内容，就在简书APP</div>
                <div class="SNkv">
                    <img src="../../../images/home/jianshuerweima.png">
                </div>
                <!-- 作者详情 -->
                <div class="authorInfo" v-for="infoi in auEasyInfoList">
                    <router-link :to="'zhuye?id=' + infoi.uid">
                        <img :src="infoi.head_img_url">
                    </router-link>
                    <div class="infoAu">
                        <div class="Cqpr1x">
                            <router-link :to="'zhuye?id=' + infoi.uid">{{ infoi.user_name }}</router-link>
                            <span>{{ infoi.introduction }}</span>
                        </div>
                        <div class="lJvI3s">
                            <span>共写了{{ Math.floor(infoi.word_num / 10000).toFixed(1) }}W字</span>
                            <span>获得{{ infoi.like_num }}个赞</span>
                            <span>共{{ infoi.fan_num }}个粉丝</span>
                        </div>
                    </div>
                    <el-button class="guanZhu" @click="isFollow1" @mousemove="enFollow1" @mouseleave="outFollow1">{{
                            tip.msg
                    }}</el-button>
                </div>
            </div>
        </div>
        <!-- 评论组件 -->
        <MyComments />
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import moment from "moment";
import MyComments from "../comment/index.vue"
import { follow } from '../../../api/follow';//关注
import { followOff } from '../../../api/followOff';//取消关注
import { getFollowStatus } from '../../../api/getFollowStatus';
import { auIsFollow, auEasyInfo, auEasyLikeYes, auEasyLikeNo, auEssay, auEasyLike } from '../../../api/essay'
interface IAuEssay {
    content: string,
    eid: number,
    like_num: number,
    title: string,
    update_time: string,
    word_num: number,
}

const route = useRoute();
const props = defineProps(['foData']);
let tip = props.foData;
let va = ref(useRoute().query.uid).value;
console.log(va);

console.log(tip.flag);

let status = 1;

let isFollow1 = () => {

    if (tip.flag) {
        tip.msg = '已关注';
        follow(status, uid, va);
        console.log(status, uid, va);
        ElMessage({
            message: '关注成功.',
            type: 'success',
        });

    } else {
        tip.msg = '关注';
        followOff(uid, va)
        ElMessage({
            message: '取消关注成功.',
            type: 'success',
        });

    }
    tip.flag = !tip.flag;
}
let enFollow1 = () => {
    if (tip.msg == '关注') {
        tip.msg = '关注'
    } else {
        tip.msg = '取消关注'
    }
}
let outFollow1 = () => {
    if (tip.msg == '取消关注') {
        tip.msg = '已关注'

    } else {
        tip.msg = '关注'
    }
}
let isDianZanClass = ref<any>();
let ZanClass = 'isDianZan';
let auEasyInfoList = ref<any>();
let uid = localStorage.getItem('uid');
let essayContent = ref<IAuEssay[]>();
onMounted(() => {
    // 首次渲染或每次挂载时判断用户是否给文章点赞
    auEasyLike({ essay_id: route.query.eid, user_id: uid }).then((res) => {
        if (res.data.likeState) {
            isDianZanClass.value = true
        } else {
            isDianZanClass.value = false
        }
    });
    auEssay({ eid: route.query.eid }).then((res) => {
        essayContent.value = res.data.map((v: any) => {
            return {
                content: v.content,
                eid: v.eid,
                like_num: v.like_num,
                title: v.title,
                update_time: moment(v.update_time).utcOffset(480).format('YYYY-MM-DD HH:mm:ss'),
                word_num: v.word_num
            }
        });
    });
    auEasyInfo({ eid: route.query.eid }).then((res) => {
        auEasyInfoList.value = res.data;
    });


    getFollowStatus(uid, va).then((res) => {
        if (res.data.length == 0) {
            tip.flag = true
        } else {
            tip.flag = false
        };
    });
})
function DianZan() {
    if (isDianZanClass.value) {
        // 取消点赞
        auEasyLikeNo({ essay_id: route.query.eid, user_id: uid }).then((res) => {
            let likeNum = ref();
            likeNum.value = essayContent.value
            console.log(likeNum.value[0].like_num--);
            // console.log(essayContent.value[0].like_num--);
            isDianZanClass.value = !isDianZanClass.value;
        });
    } else {
        // 点赞
        auEasyLikeYes({ essay_id: route.query.eid, user_id: uid }).then((res) => {
            // console.log(essayContent.value[0].like_num++);
            let likeNum = ref();
            likeNum.value = essayContent.value
            console.log(likeNum.value[0].like_num++);
            isDianZanClass.value = !isDianZanClass.value;
        });
    }
}



</script>

<style lang="scss" scoped>
.mainSection {
    padding: 32px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;

    h1 {
        font-size: 30px;
        font-weight: 700;
        word-break: break-word;
        margin-top: 32px;
        margin-bottom: 15px;
    }

    .mainAuthorInfo {
        display: flex;
        align-items: center;
        margin-bottom: 32px;
        font-size: 13px;

        .authorImg {
            img {
                display: block;
                border-radius: 50%;
                border: 1px solid #eee;
                min-width: 50px;
                min-height: 50px;
                width: 50px;
                height: 50px;
            }
        }

        .infoAuthor {
            margin-left: 8px;

            .auInfo {
                margin-bottom: 6px;

                .nickName {
                    color: #404040;
                    font-weight: 500;
                    font-size: 16px;
                    padding-right: 30px;
                }

                .guanZhu {
                    height: 23px;
                    padding: 2px 12px;
                    font-size: 12px;
                    border-radius: 50px;
                    cursor: pointer;
                    color: #ec7259;
                    background-color: #fff;
                    border: 1px solid #ec7259;
                    transition: all .2s cubic-bezier(.645, .045, .355, 1);
                }
            }

            .essayTime {
                color: #969696;

                span {
                    margin-right: 10px;
                }
            }
        }
    }

    .mainContent {
        margin-bottom: 20px;

        .dianZan {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .dianZanIcon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                color: #969696;
                border: 1px solid #eee;
                border-radius: 50%;
                cursor: pointer;

                .iDianZan {
                    font-size: 25px;
                }

            }

            .isDianZan {
                border-color: #ec7259;
                background-color: #ec7259;
                color: #fff;
            }

            .likeNum {
                font-size: 14px;
                color: #969696;
                margin-left: 8px;
            }
        }

        .Azco16 {
            color: #ea6f5a;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            width: 100%;
        }

        .SNkv {

            text-align: center;
            margin: 16px 0 6px;

            img {
                height: 110px;
                width: 110px;
            }
        }

        .authorInfo {
            display: flex;
            align-items: center;
            background-color: #fafafa;
            border-radius: 4px;
            padding: 12px 16px;

            a {
                img {
                    border-radius: 50%;
                    border: 1px solid #eee;
                    min-width: 50px;
                    min-height: 50px;
                    width: 50px;
                    height: 50px;
                }
            }

            .infoAu {
                flex-grow: 1;
                margin: 0 12px;
                overflow: hidden;

                .Cqpr1x {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2px;

                    a {
                        margin-right: 6px;
                        flex-shrink: 0;
                        font-size: 16px;
                        font-weight: 500;
                        color: #404040;
                        text-decoration: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    span {
                        font-size: 14px;
                        color: #666;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .lJvI3s {
                    font-size: 14px;
                    color: #969696;

                    span {
                        margin-right: 12px;
                    }
                }
            }

            .guanZhu {
                min-width: 30px;
                color: #ec7259;
                background-color: #fff;
                border-radius: 50px;
                cursor: pointer;
                transition: all .2s cubic-bezier(.645, .045, .355, 1);
                font-size: 14px;
                padding: 4px 12px;
                border: 1px solid #ec7259;
            }
        }
    }
}

.line {
    width: 100%;
    height: 1px;
    margin: 24px 0;
    background-color: #eee;
}
</style>