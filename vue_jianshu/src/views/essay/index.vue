<template>

    <div>
        <!-- 文章详情页导航栏变化部分 -->
        <div class="navbarbox">
            <div :class="{ main_up: ismainUp }">
                <NavBar />
            </div>

            <!-- 文章详情页导航栏变化部分 -->
            <div class="essay_nav" :class="{ essay_down: ismainUp }">
                <div class="essay_title">
                    <h1 class="title">{{ essayTitle }}</h1>
                </div>
                <div class="authorInfo" v-for="nhi in auNameHeadImgList">
                    <a href="#" class="authorImg">

                        <img :src="nhi.head_img_url">
                    </a>
                    <div class="authorTitle">
                        <span class="nickName">{{ nhi.user_name }}</span>

                        <el-button class="guanZhu" @click="isFollow" @mousemove="enFollow" @mouseleave="outFollow">
                            {{ followData.msg }}</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="essayBox">
            <div class="essayContainer">
                <div class="essayMain">
                    <!-- 左边正文 -->
                    <Content :foData="followData" />

                </div>
                <div class="essayAuthor">
                    <div class="authorSection">
                        <!-- 作者头像和名字 -->
                        <div class="authorInfo" v-for="nhi in auNameHeadImgList">
                            <router-link class="authorImg" :to="'zhuye?id=' + nhi.uid">
                                <!-- 绑定有问题 -->
                                <img :src="nhi.head_img_url">
                                <!-- <img src="../../images/essay/authorImg.webp"> -->
                            </router-link>
                            <div class="authorTitle">
                                <router-link :to="'zhuye?id=' + nhi.uid">
                                    <span class="nickName">{{ nhi.user_name }}</span>
                                </router-link>
                                <!-- 关注变化 -->
                                <el-button class="guanZhu" @click="isFollow" @mousemove="enFollow"
                                    @mouseleave="outFollow">{{ followData.msg }}</el-button>
                            </div>
                        </div>
                        <div class="authorLine"></div>
                        <div class="authorEssayHot">
                            <!-- 作者的热门文章 -->
                            <div class="essayHotItem" v-for="ih in auEssayHotList">
                                <p>{{ ih.title }}</p>
                                <span>点赞 {{ ih.like_num }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 推荐阅读 -->
                    <div class="hotEssay">
                        <h3>推荐阅读</h3>
                        <div class="hotItem" v-for="hotI in essayHotList">
                            <div class="hotTi">
                                <router-link :to="{ path: '/p', query: { eid: hotI.eid } }" @click="load">
                                    {{ hotI.title }}
                                </router-link>
                            </div>
                            <div class="hotDi">点赞量 {{ hotI.like_num }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToTop />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import NavBar from '../../components/NavBar.vue';
import ToTop from "../../components/ToTop.vue";
import Content from "./content/Content.vue";
import { follow } from '../../api/follow';//关注
import { followOff } from '../../api/followOff';//取消关注

import { defineComponent, reactive, ref, toRaw, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { essayHot, auEssayHot, auIsFollow, auNameHeadImg } from '../../api/essay';

export default defineComponent({
    data() {
        return {
            essayContent: [
                {
                    title: '生活的浪漫',
                    content: '爱情的浪漫，需要什么？节日的时候有礼物，平日有惊喜，是时刻的挂念，是温柔？ 生活的浪漫，需要什么？是想要的都会有，开心快乐，生活的美满？ 浪漫是...',
                    author: '惜语寒',
                    comments: '0',
                    like: '13',
                    headImgUrl: '../../images/essay/authorImg.webp',
                    update_time: '2022-10-29 10:41:59',
                    url: 'http://www.baidu4.com'
                }
            ],
            auNameHeadImgList: ref<any>([]),
            auEssayHotList: ref<any>([]),
            essayHotList: ref<any>([]),
            followData: {
                msg: '关注',
                flag: true
            },
            status: 1,
            eid: this.$route.query.eid,
            uid: localStorage.getItem("uid"),
            author: this.$route.query.uid,
            essayTitle: this.$route.query.title
        }
    },


    components: {
        Content,
        NavBar,
        ToTop
    },
    methods: {
        enFollow() {
            if (this.followData.msg == '关注') {
                this.followData.msg = '关注'
            } else {
                this.followData.msg = '取消关注'
            }
        },
        outFollow() {
            if (this.followData.msg == '取消关注') {
                this.followData.msg = '已关注'
            } else {
                this.followData.msg = '关注'
            }
        },
        isFollow() {
            if (this.followData.flag) {
                this.followData.msg = '已关注';
                follow(this.status, this.uid, this.author);
                ElMessage({
                    message: '关注成功.',
                    type: 'success',
                });
                // auIsFollow({

                // }).then((res) => {
                //     // console.log(this.auIsFollow);
                // });
            } else {
                this.followData.msg = '关注';
                followOff(this.uid, this.author)
                ElMessage({
                    message: '取消关注成功.',
                    type: 'success',
                });
            }
            this.followData.flag = !this.followData.flag;

        },
        load() { 
            location.reload();
        }
    },
    mounted() {
        essayHot().then((res) => {
            this.essayHotList = res.data;
        });
        auNameHeadImg({ eid: this.eid }).then((res) => {
            this.auNameHeadImgList = res.data;
        })
        auEssayHot({ eid: this.eid }).then((res) => {
            this.auEssayHotList = res.data;
        });
    },
    setup() {
        let ismainUp = ref<any>(null);
        onMounted(() => {
            // 监听屏幕滚动 根据屏幕的滚动展示不同样式的导航栏
            window.addEventListener('scroll', () => {
                (window.pageYOffset > 120) ? ismainUp.value = true : ismainUp.value = false;
            })
        });
        return { ismainUp, }
    }
})
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.navbarbox {
    background-color: #fff;
    border: 1px solid #f0f0f0;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    z-index: 10;

    .main_up {
        display: none;
    }

    .essay_down {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
}



@mixin section {
    background-color: #fff;
    border-radius: .25rem;
    margin-bottom: .625rem;
    position: relative;
}

.essay_nav {
    opacity: 0;
    display: flex;
    justify-content: space-between;
    height: 56px;
    box-sizing: content-box;
    padding-left: 16px;
    padding-right: 16px;
    margin-left: auto;
    margin-right: auto;
    width: 830px;
    transform: translateY(100%);
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
    transition: opacity delay;


    .essay_title {
        overflow: hidden;
        padding: 0 24px;
        max-width: 730px;

        h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #404040;
            line-height: 52px;
        }
    }


    .authorInfo {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .authorImg {
            img {
                display: block;
                border-radius: 50%;
                // border: 1px solid #eee;
                min-width: 45px;
                min-height: 45px;
                width: 45px;
                height: 45px;
            }
        }

        .authorTitle {
            width: 150px;
            display: flex;
            justify-content: space-between;
            padding-left: 10px;
            margin-right: 55px;

            .nickName {
                font-weight: 500;
                font-size: 14px;
                line-height: 28px;
                color: #7d7d7d;
            }

            .guanZhu {
                // height: 23px;
                padding: 4px 12px;
                font-size: 12px;
                border-radius: 50px;
                color: #ec7259;
                background-color: #fff;
                border: 1px solid #ec7259;
            }
        }
    }

}

.essayBox {
    background-color: #f9f9f9;

    .essayContainer {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 62.5rem;
        margin: 0 auto;
        padding-top: 70px;

        .essayMain {
            width: 45.625rem;
            margin-right: .625rem;
        }

        .essayAuthor {
            width: 16.25rem;

            .authorSection {
                padding: 1rem;
                @include section;

                // 作者文章
                .authorInfo {
                    display: flex;
                    align-items: center;

                    .authorImg {
                        img {
                            display: block;
                            border-radius: 50%;
                            border: .0625rem solid #eee;
                            min-width: 2.8125rem;
                            min-height: 2.8125rem;
                            width: 2.8125rem;
                            height: 2.8125rem;
                        }
                    }

                    .authorTitle {
                        width: 11.25rem;
                        display: flex;
                        justify-content: space-between;
                        padding-left: .625rem;

                        .nickName {
                            color: #2d2d2d;
                            font-weight: 500;
                            font-size: .875rem;
                        }

                        .guanZhu {
                            // height: 1.4375rem;
                            padding: 4px 12px;
                            font-size: .75rem;
                            border-radius: 3.125rem;
                            color: #ec7259;
                            background-color: #fff;
                            border: .0625rem solid #ec7259;
                            transition: all .2s cubic-bezier(.645, .045, .355, 1);
                            cursor: pointer;
                        }
                    }
                }

                .authorLine {
                    width: 100%;
                    height: .0625rem;
                    margin: 1rem 0;
                    background-color: #eee;
                }

                .authorEssayHot {
                    .essayHotItem {
                        margin-top: 1rem;

                        p {
                            font-size: .875rem;
                            line-height: 1.375rem;
                            color: #2d2d2d;
                            margin-bottom: .25rem;
                        }

                        span {
                            font-size: .75rem;
                            color: #969696;
                        }
                    }
                }
            }

            .hotEssay {
                padding: 1rem;
                @include section;

                h3 {
                    font-size: 1rem;
                    padding-left: .375rem;
                    line-height: 1.125rem;
                    margin-bottom: 1rem;
                    border-left: .25rem solid #ec7259;
                    font-weight: 500;
                }

                .hotItem {
                    margin-bottom: .75rem;
                    font-size: .875rem;
                    line-height: 1.375rem;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    .hotTi {
                        a {
                            color: #404040;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }

                    .hotDi {
                        color: #969696;
                        font-size: .75rem;
                    }

                }
            }
        }
    }
}
</style>