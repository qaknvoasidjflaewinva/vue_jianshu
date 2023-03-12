<!-- 用户主页 -->
<template>
    <NavBar />
    <div style="height: 54px;width:100%;"></div>
    <div class="container">
        <div class="row">
            <div class="cols_main">
                <template v-for="item in userInfo">
                    <div class="main_top">
                        <div class="headImg">
                            <img :src="item.headImgUrl" v-if="item.headImgUrl">
                        </div>
                        <nav style="float:right">
                            <div @click="status == 1 ? status-- : status++" class="fol_box" v-if="userId != id">
                                <div v-if="status == 1">
                                    <div class="focusOff_btn iconfont">&#xe606;已关注
                                    </div>
                                    <div class="iconfont focusOffed_btn" @click="followOffBtn(userId, id)">&#xed1e;取消关注
                                    </div>
                                </div>

                                <div class="focus_btn" v-else-if="status == 0" @click="followBtn(1, userId, id)">＋关注
                                </div>
                            </div>

                            <div class="sendMsg_btn" v-if="userId != id">发简信</div>
                        </nav>
                        <div class="user_name">{{ item.userName }}</div>
                        <div class="info">
                            <a class="tab">
                                <p>{{ item.follow }}</p>
                                <span class="iconfont">关注&#xe88e;</span>
                            </a>
                            <a class="tab">
                                <p>{{ item.fans }}</p>
                                <span class="iconfont">粉丝&#xe88e;</span>
                            </a>
                            <a class="tab">
                                <p>{{ item.essayNum }}</p>
                                <span class="iconfont">文章&#xe88e;</span>
                            </a>
                            <div class="tab">
                                <p>{{ item.wrtNum }}</p>
                                <span class="iconfont">字数</span>
                            </div>
                            <div class="tab">
                                <p>{{ item.like }}</p>
                                <span class="iconfont">收获喜欢</span>
                            </div>
                            <div class="tab">
                                <p>12221</p>
                                <span class="iconfont">总资产</span>
                            </div>
                        </div>
                    </div>
                </template>

                <ul class="trigger-menu">
                    <li class="tab_l" v-for="(item, index) in data.tabList" :key="item.id"
                        :class="{ 'active': index == data.num.value }" @click="tabClick(index)">
                        <span class="iconfont" :class="item.icon"></span>
                        <a>{{ item.name }}</a>
                    </li>
                </ul>

                <div v-show="tabStatus.tabStatus1">
                    <EssayList :msg="id"></EssayList>
                </div>
                <div v-show="tabStatus.tabStatus2">
                    <h1>暂无动态</h1>
                </div>
                <div v-show="tabStatus.tabStatus3">
                    <h1>暂无最新评论</h1>
                </div>
                <div v-show="tabStatus.tabStatus4">
                    <h1>暂无热门</h1>
                </div>
            </div>
            <div class="cols_aside">
                <template v-for="item in userInfo">
                    <ul class="user_dynamic">
                        <li class="badge">
                            <img width="20px" height="20px"
                                src="https://upload.jianshu.io/user_badge/b4853dc7-5c16-4875-a2cd-7cf764bbd934" alt="">
                            <span>简书优秀作者</span>
                        </li>
                        <li class="badge">
                            <img width="20px" height="20px"
                                src="https://upload.jianshu.io/user_badge/5b7a3117-2773-45ac-9d61-03af8463898e" alt="">
                            <span>观察优秀作者</span>
                        </li>
                    </ul>
                    <div class="title">个人介绍</div>
                    <div class="description">
                        <span>
                            {{ item.description }}
                        </span>
                    </div>
                    <ul class="user_dynamic">
                        <li class="badge">
                            <span v-if="userId == id">我关注的专题/文集/连载</span>
                            <span v-else>他关注的专题/文集/连载</span>
                        </li>
                        <li class="badge">
                            <span v-if="userId == id">我喜欢的文章</span>
                            <span v-else>他喜欢的文章</span>
                        </li>
                    </ul>

                    <div class="title" v-if="userId == id">我创建的专题</div>
                    <div class="title" v-else>他创建的专题</div>
                    <div class="description">
                        <span>
                            空空如也~
                        </span>
                    </div>
                    <div class="title" v-if="userId == id">我的文集</div>
                    <div class="title" v-else>他的文集</div>
                    <div class="description">
                        <span>
                            空空如也~
                        </span>
                    </div>
                    <div class="title" v-if="userId != id">
                        <span style="cursor:pointer">加入黑名单</span>
                        <span>·</span>
                        <span style="cursor:pointer">举报用户</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { showList } from '../../api/getCurrentUser';
import { useRoute } from 'vue-router';
import { ref, onMounted, reactive } from 'vue';
import EssayList from "../../components/EssayShow.vue";
import { follow } from '../../api/follow';//关注
import { followOff } from '../../api/followOff';//取消关注
import { getFollowStatus } from '../../api/getFollowStatus';
import NavBar from '../../components/NavBar.vue';

interface IUserInfo {
    uid: number,
    userName: string,
    headImgUrl: string,
    description: string,
    follow: number,
    fans: number,
    essayNum: number,
    wrtNum: number,
    like: number,
}

const userInfo = ref<IUserInfo[]>();
const id: any = ref(useRoute().query.id).value;
const status = ref();
const userId = localStorage.getItem("uid");
console.log(id);


onMounted(() => {
    showList(id).then((res) => {      
        userInfo.value = res.data.map((v: any) => {
            
            return {
                uid: v.uid,
                userName: v.user_name,
                headImgUrl: v.head_img_url,
                follow: v.follow_num,
                fans: v.fan_num,
                essayNum: v.essay_num,
                wrtNum: v.word_num,
                like: v.like_num,
                description: v.introduction
            };
        });
    });

    console.log(localStorage.getItem("uid"));

    getFollowStatus(userId, id).then((res) => {
        if (res.data == null) {
            status.value = 0;
        } else {
            status.value = res.data.map((v: any) => {
                return v.status
            });
        };
    });
});

const data = {
    tabList: [
        { id: 1, name: '文章', icon: 'icon-wenzhang2' },
        { id: 2, name: '动态', icon: 'icon-lingdang' },
        { id: 3, name: '最新评论', icon: 'icon-duihua1' },
        { id: 4, name: '热门', icon: 'icon-remen' },
    ],
    num: ref(0),
}

let tabStatus = ref({
    tabStatus1: true,
    tabStatus2: false,
    tabStatus3: false,
    tabStatus4: false,
});

const tabClick = (index: number) => {
    data.num.value = index;
    switch (index) {
        case 1:
            console.log(index);
            return tabStatus.value = {
                tabStatus1: false,
                tabStatus2: true,
                tabStatus3: false,
                tabStatus4: false,
            }
            break;
        case 2:
            console.log(index);
            return tabStatus.value = {
                tabStatus1: false,
                tabStatus2: false,
                tabStatus3: true,
                tabStatus4: false,
            }
            break;
        case 3:
            console.log(index);
            return tabStatus.value = {
                tabStatus1: false,
                tabStatus2: false,
                tabStatus3: false,
                tabStatus4: true,
            }
            break;
        default:
            console.log(index);
            return tabStatus.value = {
                tabStatus1: true,
                tabStatus2: false,
                tabStatus3: false,
                tabStatus4: false,
            }
    }
    // if (index != 0) {
    //     return tabStatus.tabStatus1.value = false;
    // } else {
    //     return tabStatus.tabStatus1.value = true;
    // }
}

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
body {
    color: #333;
}

@font-face {
    font-family: 'iconfont';
    src: url('../../style/font_3741615_6wv5zup46jt/iconfont.woff2?t=1667273578000') format('woff2'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.woff?t=1667273578000') format('woff'),
        url('../../style/font_3741615_6wv5zup46jt/iconfont.ttf?t=1667273578000') format('truetype');
}

.container {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.42857;
    font-size: 17px;
    color: #333;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 960px;

    .row {
        line-height: 1.42857;
        font-size: 17px;
        color: #333;
        box-sizing: border-box;
        margin-left: -15px;
        margin-right: -15px;
        padding-top: 30px;
        overflow: hidden;

        .cols_main {
            line-height: 1.42857;
            font-size: 17px;
            color: #333;
            box-sizing: border-box;
            position: relative;
            min-height: 1px;
            float: left;
            padding-left: 15px;
            width: 66.66667%;
            padding-right: 0;

            .main_top {
                line-height: 1.42857;
                font-size: 17px;
                color: #333;
                box-sizing: border-box;
                margin-bottom: 21px;

                .headImg {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    float: left;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    text-align: center;
                    background-image: url(../../images/Default.png);
                    background-size: 100%;

                    img {
                        width: 80px;
                        height: 80px;
                    }
                }

                .sendMsg_btn,
                .fol_box {
                    width: 100px;
                    height: 38px;
                    float: right;
                    margin: 23px 0 23px 16px;
                    text-align: center;
                    line-height: 38px;
                    box-sizing: border-box;
                    cursor: pointer;
                }

                .sendMsg_btn,
                .focus_btn,
                .focusOff_btn,
                .focusOffed_btn {
                    border-radius: 20px;
                }


                .fol_box {
                    float: right;
                    height: 38px;
                    border: none;

                    .iconfont {
                        font-family: "iconfont" !important;
                        // font-size: 12px;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }

                    .focus_btn {
                        background-color: #42c02e;
                        color: #fff;
                        float: none;
                        border-radius: 20px;
                    }

                    .focus_btn:hover {
                        background-color: #3fb12e;
                    }

                    .focusOff_btn,
                    .focusOffed_btn {
                        border: 1px solid #8c8c8c;
                        border-color: hsla(0, 0%, 59%, .6);
                        color: #8c8c8c;
                    }

                    .focusOffed_btn {
                        display: none;
                    }
                }

                .fol_box:hover {
                    .focusOff_btn {
                        display: none;
                    }

                    .focusOffed_btn {
                        display: block;
                    }
                }



                .sendMsg_btn {
                    color: #42c02e;
                    border: 1px solid #42c02e;
                }

                .sendMsg_btn:hover {
                    background-color: #f5fcf4;
                }

                .user_name {
                    padding: 5px 0 0 100px;
                    text-align: left;
                    font-size: 21px;
                    font-weight: 700;
                    min-height: 16px;
                }

                .info {
                    -webkit-text-size-adjust: 100%;
                    -webkit-tap-highlight-color: transparent;
                    line-height: 1.42857;
                    color: #333;
                    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
                    box-sizing: border-box;
                    margin-top: 5px;
                    padding-left: 100px;
                    font-size: 15px;
                    text-align: left;

                    a {
                        cursor: pointer;
                    }

                    .tab {
                        width: auto;
                        height: 100%;
                        text-align: left;
                        border-right: 1px solid #f0f0f0;
                        margin: 2px 8px 0 0;
                        padding-right: 8px;
                        display: inline-block;

                        p {
                            display: block;
                            margin: 0;
                        }

                        span {
                            color: #969696;
                            display: inline-block;
                        }

                        .iconfont {
                            font-family: "iconfont" !important;
                            font-size: 12px;
                            font-style: normal;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                    }
                }
            }

            .trigger-menu {
                line-height: 1.42857;
                color: #333;
                box-sizing: border-box;
                margin-top: 0;
                padding-left: 0;
                margin-bottom: 20px;
                border-bottom: 1px solid #f0f0f0;
                // border-width: 0;
                // font-size: 0;
                list-style: none;
                width: 100%;
                overflow: hidden;
                text-align: left;

                .tab_l {
                    position: relative;
                    display: inline-block;
                    padding: 8px 0;
                    margin-bottom: -1px;
                    height: auto;
                    text-align: center;


                    a {
                        padding: 13px 20px 13px 0;
                        font-size: 15px;
                        font-weight: 700;
                        color: #969696;
                        line-height: 25px;
                        cursor: pointer;
                        margin-left: 2px;
                        transition: color .3s;
                    }

                    .iconfont {
                        padding-left: 20px;
                        color: #969696;
                        transition: color .3s;
                        margin-right: 2px;
                    }
                }


                .active {
                    border-bottom: 2px solid #525252;

                    a,
                    .iconfont {
                        color: #646464
                    }

                }

                .tab_l:hover {
                    border-bottom: 2px solid #525252;
                    // border-width: 100%;

                    a,
                    .iconfont {
                        color: #646464;
                    }
                }

            }

        }

        .cols_aside {
            line-height: 1.42857;
            font-size: 17px;
            color: #333;
            box-sizing: border-box;
            position: relative;
            min-height: 1px;
            float: right;
            width: 29.16667%;
            margin-left: 4.16667%;
            padding: 0;

            .user_dynamic {
                margin-bottom: 16px;
                padding-bottom: 16px;
                list-style: none;
                border-bottom: 1px solid #f0f0f0;
                clear: both;
                padding-left: 0;

                .badge {
                    font-size: 17px;
                    color: #333;
                    list-style: none;
                    box-sizing: border-box;
                    margin-bottom: 10px;

                    img {
                        list-style: none;
                        cursor: pointer;
                        font-size: 14px;
                        color: #333;
                        line-height: 30px;
                        width: 20px;
                        box-sizing: border-box;
                        border: 0;
                        vertical-align: middle;
                        margin-right: 3px;
                    }

                    span {
                        font-size: 14px;
                        line-height: 20px;
                        display: inline-block;
                    }
                }
            }

            .title {
                line-height: 1.42857;
                box-sizing: border-box;
                float: left;
                margin-bottom: 10px;
                font-size: 14px;
                color: #969696;
            }

            .description {
                line-height: 1.42857;
                color: #333;
                box-sizing: border-box;
                position: relative;
                margin-bottom: 16px;
                padding: 0 0 16px;
                text-align: left;
                font-size: 0;
                border-bottom: 1px solid #f0f0f0;
                clear: both;
                word-break: break-word !important;

                span {
                    color: #333;
                    text-align: left;
                    word-break: break-word !important;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
    }

}
</style>