<template>
    <NavBar />
    <div class="main">
        <div class="top">
            <img src="../../images/recommend-author-03cc8798d5cc3f986e49cbcb2eb63079.png" alt="">
        </div>

        <div class="author_list">
            <div class="author_card" v-for="item in authorList">
                <div class="author_info">
                    <div class="info">
                        <router-link :to="'zhuye?id=' + item.id">
                            <img v-if="item.headImg" :src="item.headImg">
                            <img v-else src="../../images/Default.png" alt="">
                            <h4 class="name">{{ item.userName }}</h4>
                            <p class="description">{{ item.description }}</p>
                        </router-link>

                        <div class="fol_box">
                            <div class="follow_btn"
                                v-if="(item.status + (item.follow === undefined ? 0 : item.follow)) % 2 == 0"
                                @click="item.status++; followBtn(1, userId, item.id);">+关注</div>
                            <div class="follow_off_box" @click="item.status++; followOffBtn(userId, item.id)"
                                v-else-if="(item.status + (item.follow === undefined ? 0 : item.follow)) % 2 == 1">
                                <div class="followed iconfont">&#xe606;已关注</div>
                                <div class="followOff iconfont">&#xed1e;取消关注
                                </div>
                            </div>
                        </div>
                        <div class="new">最近更新</div>
                        <hr>
                        <div class="essay_list">
                            <template v-for="tItem in essayTitleList">
                                <p v-if="item.id == tItem.author" class="essay">
                                    <router-link :to="{ path: '/p', query: {eid: tItem.eid} }">{{ tItem.title }}</router-link>
                                </p>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import NavBar from '../../components/NavBar.vue';
import { showList } from '../../api/getAuthorListApi';
import { follow } from '../../api/follow';//关注
import { followOff } from '../../api/followOff';//取消关注
import { ref, onMounted } from 'vue';
import { essayShow } from '../../api/essay';

interface IList {
    id: number,
    headImg: string,
    userName: string,
    wrtNum: number,
    like: number,
    follow: number,
    follower: number,
    status: any,
    description: string,
}

interface ITitle {
    author: number,
    eid: number,
    title: string
}

const authorList = ref<IList[]>()
let essayTitleList = ref<ITitle[]>();
const userId = localStorage.getItem("uid");



const show: any = onMounted(() => {
    showList(userId).then((res) => {
        authorList.value = res.data.map((v: any) => {
            return {
                id: v.uid,
                headImg: v.head_img_url,
                userName: v.user_name,
                wrtNum: v.word,
                like: v.likeN,
                follow: v.follow,
                follower: v.follower_id,
                description: v.introduction,
                status: ref(0)//用于渲染关注按钮状态
            }
        })
    });


    essayShow().then((res) => {
        console.log(res.data);
        essayTitleList.value = res.data.map((v: any) => {
            return {
                author: v.author_id,
                title: v.title,
                eid: v.eid
            }
        })
    })
});

// 关注 => 向follow表新增一条记录
const followBtn = (status: any, follower: any, user: any) => {
    follow(status, follower, user);//status：关注状态=1  follower:当前用户id，即关注者id  user：被关注用户id
}

//取消关注
const followOffBtn = (follower: any, user: any) => {
    followOff(follower, user)
}

</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'iconfont';
    src: url('../../style/font_3741615_6wv5zup46jt/iconfont.woff2?t=1667273578000') format('woff2'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.woff?t=1667273578000') format('woff'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.ttf?t=1667273578000') format('truetype');
}

a {
    text-decoration: none;
    color: #333;
}

.iconfont {
    font-family: "iconfont" !important;
    // font-size: 12px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.main {
    padding: 80px 0 80px 0;
    margin: auto;
    width: 960px;
    height: 100%;
    box-sizing: border-box;

    .top {
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;

        img {
            width: 100%;
        }
    }

    .author_list {
        overflow: hidden;
        box-sizing: border-box;

        .author_card {
            width: 33.3333%;
            float: left;
            box-sizing: border-box;
            position: relative;
            min-height: 1px;
            padding-left: 15px;
            padding-right: 15px;


            .author_info:hover {
                box-shadow: 0 0 7px #ddd;
            }

            .author_info {
                height: 320px;
                margin-top: 80px;
                padding: 0 20px;
                border: 1px solid #e6e6e6;
                border-radius: 4px;
                background-color: hsla(0, 0%, 71%, .1);
                box-sizing: border-box;
                transition: .2s ease;


                .info {
                    text-align: center;

                    img {
                        box-sizing: border-box;
                        vertical-align: middle;
                        cursor: pointer;
                        width: 80px;
                        height: 80px;
                        margin: -40px 0 10px;
                        display: inline-block;
                        border: 1px solid #ddd;
                        background-color: #fff;
                        border-radius: 40px;
                    }

                    .name {
                        font-size: 21px;
                        font-weight: 700;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin: 10px 0;
                    }

                    .description {
                        margin: 0 auto 10px;
                        max-width: 180px;
                        height: 50px;
                        font-size: 13px;
                        line-height: 25px;
                        box-sizing: border-box;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        white-space: normal !important;
                        -webkit-line-clamp: 2;
                        /* 控制在第几行进行加省略号 */
                        -webkit-box-orient: vertical;
                    }

                    .new {
                        text-align: center;
                        box-sizing: border-box;
                        float: left;
                        margin-top: 6px;
                        padding-right: 10px;
                        font-size: 12px;
                        color: #969696;
                        background-color: #f8f8f8;
                    }

                    hr {
                        text-align: center;
                        box-sizing: content-box;
                        height: 0;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        border: 0;
                        border-top: 1px solid #eee;
                        border-color: #eaeaea;
                    }

                    .fol_box {

                        margin-bottom: 7px;


                        .follow_btn,
                        .followed,
                        .followOff {
                            cursor: pointer;
                            border-radius: 20px;
                            width: 100px;
                            height: 38px;
                            text-align: center;
                            line-height: 38px;
                            color: #fff;
                            display: inline-block;
                        }

                        .follow_btn {
                            border: 1px solid #42C02E;
                            background-color: #42C02E;
                        }

                        .follow_btn:hover {
                            background-color: #3fb12e;
                        }

                        .followed,
                        .followOff {
                            border: 1px solid #8c8c8c;
                            border-color: hsla(0, 0%, 59%, .6);
                            color: #8c8c8c;
                        }

                        .followOff {
                            display: none;
                        }
                    }

                    .fol_box:hover {
                        .followOff {
                            display: inline-block;
                        }

                        .followed {
                            display: none;
                        }

                    }

                    .essay_list {
                        max-height: 75px;
                        overflow: hidden;

                        .essay {
                            text-align: center;
                            box-sizing: border-box;
                            background-color: transparent;
                            color: #333;
                            cursor: pointer;
                            font-size: 13px;
                            line-height: 25px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: block;

                            a:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>