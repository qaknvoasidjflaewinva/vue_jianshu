<!-- 推荐作者小组件 -->
<template>
    <div class="focus">
        <div class="focus_text">
            <span>推荐作者</span>
            <div style="cursor:pointer;float: right;" @click="show">
                <div class="change iconfont">&#xe63a;换一批</div>
            </div>
        </div>

        <div class="list">
            <ul>
                <template v-for="item in authorList" :key="item.id">
                    <li class="author_info">
                        <router-link class="image" :to="'zhuye?id=' + item.id">
                            <div class="head_img">
                                <img :src="item.headImg" v-if="item.headImg">
                            </div>
                        </router-link>
                        <div class="follow">
                            <div>
                                <span @click="item.status++; followBtn(item.status, id, item.id)"
                                    class="focus_on iconfont"
                                    v-if="(item.status + (item.follow === undefined ? 0 : item.follow)) % 2 == 0">关注</span>
                                <span @click="item.status++; followOffBtn(id, item.id)" class="focus_off iconfont"
                                    v-else-if="(item.status + (item.follow === undefined ? 0 : item.follow)) % 2 == 1">
                                    &#xe63b;已关注</span>
                            </div>
                        </div>
                        <router-link class="image" :to="'userHome?id=' + item.id">{{ item.userName }}</router-link>
                        <p>写了{{ Math.floor(item.wrtNum / 1000) }}k字 · {{ item.like > 1000 ? Math.floor(item.like /
                                1000) + 'k' : item.like
                        }}喜欢</p>
                    </li>
                </template>
            </ul>

        </div>
        <router-link class="more iconfont" :to="'tuijianzuozhe'">
            查看全部&#xe88e;
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { showList } from '../../api/getAuthorListApi';
import { follow } from '../../api/follow';//关注
import { followOff } from '../../api/followOff';//取消关注
import { ref, onMounted } from 'vue';


interface IList {
    id: number,
    headImg: string,
    userName: string,
    wrtNum: number,
    like: number,
    follow: number,
    follower: number,
    status: any
}

const authorList = ref<IList[]>()
const id = localStorage.getItem("uid");
// console.log(id);


// 渲染推荐列表
const show: any = onMounted(() => {
    showList(id).then((res) => {
        authorList.value = res.data.map((v: any) => {
            return {
                id: v.uid,
                headImg: v.head_img_url,
                userName: v.user_name,
                wrtNum: v.word,
                like: v.likeN,
                follow: v.follow,
                follower: v.follower_id,
                status: ref(0)//用于渲染关注按钮状态
            }
        })
    });

    console.log(localStorage.getItem("uid"));

});


// 关注 => 向follow表新增一条记录
const followBtn = (status: any, follower: any, user: any) => {
    status = status % 2;
    follow(status, follower, user);//status：关注状态=1  follower:当前用户id，即关注者id  user：被关注用户id
}

//取消关注
const followOffBtn = (follower: any, user: any) => {
    followOff(follower, user)
}

</script>


<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #333;
}

@font-face {
    font-family: 'iconfont';
    src: url('../../style/font_3741615_6wv5zup46jt/iconfont.woff2?t=1667273578000') format('woff2'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.woff?t=1667273578000') format('woff'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.ttf?t=1667273578000') format('truetype');
}

.focus {
    width: 280px;
    position: relative;

    .focus_text {
        color: #969696;
        font-size: 14px;
        height: 16px;

        span {
            display: block;
            width: auto;
            height: auto;
            float: left;

        }

        .iconfont {
            font-family: "iconfont" !important;
            font-size: 14px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .change {
            display: inline-block;
            // float: right;
        }

        i {
            display: inline-block;
            // float: right;
            margin-top: 2px;
        }

    }

    .list {
        margin-bottom: 20px;

        ul {
            list-style: none;
            padding: 0;
            display: block;
            max-height: 325px;
            overflow: hidden;

            .author_info {
                width: 280px;
                height: 48px;
                display: block;
                margin-top: 15px;

                .image {
                    height: auto;
                    display: block;
                }

                .head_img {
                    height: 48px;
                    width: 48px;
                    border-radius: 50px;
                    float: left;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    margin-right: 10px;
                    background-image: url(../../images/Default.png);
                    background-size: 100%;

                    img {
                        width: 48px;
                        height: 48px;
                    }

                    .image {
                        text-align: center;
                        padding-top: 0;
                    }


                }

                .follow {
                    float: right;
                    font-size: 13px;

                    div {
                        cursor: pointer;

                        .focus_on {
                            color: #42c02e;
                            display: block;
                        }

                        .focus_on::before {
                            content: '+';
                            font-size: 13px;
                            line-height: 13px;
                        }

                        .focus_off {
                            color: #696969;
                            display: block;
                        }

                        .iconfont {
                            font-family: "iconfont" !important;
                            font-size: 13px;
                            font-style: normal;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                    }


                }

                a {
                    padding-top: 5px;
                    margin-right: 60px;
                    font-size: 14px;
                    display: block;
                    text-align: left;
                }

                p {
                    text-align: left;
                    display: block;
                    margin-top: 10px;
                    font-size: 12px;
                    color: #969696;
                    // margin: 0 0 10px;
                }
            }
        }


    }

    .more {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        line-height: 1.42857;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        text-align: center;
        box-sizing: border-box;
        text-decoration: none;
        cursor: pointer;
        position: absolute;
        padding: 7px 7px 7px 12px;
        left: 0;
        width: 100%;
        font-size: 13px;
        color: #787878;
        background-color: #f7f7f7;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
    }

}
</style>