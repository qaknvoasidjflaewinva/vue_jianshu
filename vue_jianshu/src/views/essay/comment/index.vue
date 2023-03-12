<template>
    <div class="pingLunBox">
        <div class="head">
            <img class="userHeadImg" src="src/images/pingLun/12.webp">
            <div class="editPingLun">
                <textarea class="editTextarea" placeholder="写下你的评论..." @focus="focusInput()"></textarea>
                <div class="isFabuBox">
                    <div :class="{faBu:isCancel}">
                        <button type="button" class="cancel" @click="cancel">取消</button>
                        <button disabled="" type="button" class="publish">发布</button>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="comTitle">
            <div class="title">全部评论
                <span class="comsNum">{{ comments.length }}</span>
            </div>
        </h3>
        <div class="comBody">
            <!-- 一级评论 -->
            <div class="first" v-for="(item, index) in comments" :key="index">
                <a href="javascript:;" class="first-img">
                    <!-- 如果当前用户有头像则显示头像,没有则显示默认头像 -->
                    <!-- <img :src="`http://` + item.picture" /> -->
                    <img v-if="item.picture" :src="item.picture" alt="" />
                    <img v-else src="../../../images/pingLun/22.webp" alt="" />
                </a>
                <div class="first-content">
                    <!-- 一级评论用户昵称 -->
                    <h3 class="first-username">{{ item.username }}</h3>
                    <!-- 一级评论发布时间 -->
                    <span class="first-time">{{ item.date }}</span>
                    <!-- 一级评论评论内容 -->
                    <div class="first-comment">
                        {{ item.content }}
                    </div>
                    <!-- 一级评论评论点赞 -->
                    <div class="first-praise">
                        <!-- 一级评论点赞数 -->
                        <span class="praise" :class="item.like" @click="comment_like(item, 0)">
                            <i class="iconfont">&#xe870;</i>
                            <span v-if="item.numbers">{{ item.numbers }}</span>
                        </span>
                        <i class="iconfont icon-comments">&#xe629;</i>
                        <span class="comments" @click="comment_input(item)">回复</span>

                    </div>
                    <!-- 回复一级评论 -->
                    <div class="editPingLun reply-comment">
                        <textarea class="editTextarea" placeholder="写下你的评论..."></textarea>
                        <div class="isFabuBox">
                            <div class="isFabu">
                                <button type="button" class="cancel">取消</button>
                                <button disabled="" type="button" class="publish"
                                    @click="reply_sumbit(item, 0)">发布</button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="reply-comment">
                        <input type="text" placeholder="请输入评论 . . ." v-model="childComments"
                            @keyup.enter="reply_sumbit(item, 0)" />
                        0为回复一级评论
                        <button @click="reply_sumbit(item, 0)">发表评论</button>
                    </div>  -->
                    <!-- 次级评论 -->
                    <div class="second">
                        <ul>
                            <li v-for="(sons, index) in item.sons" :key="index">
                                <div class="top">
                                    <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                                    <a href="JavaScript:;" class="second-img">
                                        <img v-if="item.picture" :src="item.picture" alt="" />
                                        <img v-else src="../../../images/pingLun/12.webp" alt="" />
                                    </a>
                                    <div class="second-content">
                                        <!-- 次级评论用户昵称 -->
                                        <h3 class="second-username">{{ sons.username }}</h3>
                                        <!-- 次级评论评论时间 -->
                                        <span class="second-time">{{ sons.date }}</span>
                                        <!-- 次级评论内容 xxx回复xxx：评论内容 -->
                                        <p class="second-comment">
                                            <span class="second-reply">
                                                <span class="to_reply">{{ sons.username }}</span>
                                                回复
                                                <span class="to_reply">{{ sons.to_username }}</span>：
                                            </span>
                                            {{ sons.content }}
                                        </p>
                                        <!-- 次级评论评论点赞 -->
                                        <div class="second-right">
                                            <!-- 次级评论点赞数 -->
                                            <span class="praise" :class="sons.like" @click="comment_like(sons, 1)">
                                                <i class="iconfont">&#xe870;</i>
                                                <span v-if="sons.numbers">{{ sons.numbers }}</span>
                                            </span>
                                            <i class="iconfont icon-comments">&#xe629;</i>
                                            <span class="comments" @click="comment_input(sons)">回复</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 回复次级评论
                                <div class="reply-comment reply_li" v-if="sons.display">
                                    <input type="text" placeholder="请输入评论 . . ." v-model="childComments"
                                        @keyup.enter="reply_sumbit(sons, 1)" />
                                    1为回复次级评论
                                    <button @click="reply_sumbit(sons, 1)">发表评论</button>
                                </div> -->
                                <div class="editPingLun reply_li">
                                    <textarea class="editTextarea" placeholder="写下你的评论..."></textarea>
                                    <div class="isFabuBox">
                                        <div class="isFabu">
                                            <button type="button" class="cancel">取消</button>
                                            <button disabled="" type="button" class="publish"
                                                @click="reply_sumbit(sons, 1)">发布</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 暂无评论的空状态 -->
            <!-- <el-empty description="暂无评论" v-if="show"></el-empty> -->
            <el-empty description="暂无评论" v-if="show"></el-empty>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let picture = true;
        let comments = [
            {
                picture: 'src/images/pingLun/12.webp',
                username: '你是谁啊',
                date: '2020-10-11',
                content: '你猜我说了啥',
                like: "",
                numbers: 2,
                isCancel:true,
                sons: [
                    {
                        picture: 'src/images/pingLun/23.webp',
                        username: '什么鬼',
                        to_username: '你是谁啊',
                        date: '2020-10-11',
                        content: '好大一只鬼',
                        like: "red",
                        isCancel: true,
                        numbers: 2
                    }
                ]
            },
            {
                picture: 'src/images/pingLun/22.webp',
                username: '要哭了',
                date: '2020-10-11',
                content: '不要哭',
                like: "",
                numbers: 2
            },
            {
                picture: 'src/images/pingLun/23.webp',
                username: '什么鬼',
                date: '2020-10-11',
                content: '好大一只鬼',
                like: "",
                numbers: 2
            },
        ];
        let isCancel = true;
        return {
            picture,
            comments,
            show: false,
            isCancel,
            eid: this.$route.params.eid,
            uid: localStorage.getItem('uid')
        }
    },
    methods: {
        cancel() {
            this.isCancel = true
        },
        focusInput() {
            this.isCancel = false
        } 
    }
}
</script>


<style lang="scss" scoped>
.pingLunBox {
    padding: 32px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;

    .editPingLun {
        margin-top: 0;
        flex-grow: 1;

        .editTextarea {
            padding: 12px 16px;
            width: 90%;
            height: 90px;
            font-size: 13px;
            border: 1px solid #eee;
            border-radius: 4px;
            background-color: #fafafa;
            resize: none;
            overflow: auto;
            outline-style: none;
        }

        .isFabuBox {
            padding-right: 30px;
            direction: rtl;
            margin-top: 16px;
            font-size: 14px;
            color: #969696;
            display: flex;
            align-items: center;
        }
    }
.publish {
    color: #fff;
    background-color: #ec7259;
    align-items: center;
    border-radius: 50px;
    background-image: none;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
    font-size: 14px;
    padding: 4px 12px;
    border: 1px solid #ec7259;
}

.cancel {
    margin-left: 8px;
    position: relative;
    border-radius: 50px;
    cursor: pointer;
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
    font-size: 14px;
    padding: 4px 12px;
    color: #969696;
    background-color: #fff;
    border: 1px solid #999;
}
    .faBu,
    .reply-comment,
    .reply_li {
        display: none;
    }

    .head {
        display: flex;

        .userHeadImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #eee;
            margin-right: 10px;
        }


    }

    .comTitle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 48px;
        margin-bottom: 16px;
        padding-left: 12px;
        border-left: 4px solid #ec7259;
        font-size: 18px;
        font-weight: 500;
        height: 20px;
        line-height: 20px;
        color: #404040;

        .title {
            .comsNum {
                margin-left: 6px;
                font-size: 14px;
            }
        }
    }

    .comBody {

        /* 评论内容区域 */
        .first {
            display: flex;
            position: relative;
            padding: 10px 10px 0px 0;
        }

        .first .first-img {
            flex: 1;
            text-align: center;
        }

        .first img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .first-username,
        .second-username {
            font-size: 15px;
            font-weight: 500;
            color: #404040;
        }

        .first-content {
            flex: 9;
        }

        .first-time,
        .second-time {
            font-size: 12px;
            color: #969696;
        }

        .first-comment,
        .second-comment {
            margin-top: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            line-height: 1.5;
            word-break: break-word;

        }

        /* 下边点赞和评论 */
        .first-praise,
        .second-right {
            margin-bottom: 20px;
        }

        .first-praise span,
        .second-right span {
            margin-right: 8px;
            color: #b0b0b0;
            font-size: 15px;
            cursor: pointer;
        }

        .icon-comments {
            color: #b0b0b0;
        }

        .second {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }

        .second li {
            padding: 10px 10px 10px 0;
            border-bottom: 1px solid rgb(237, 237, 237);
        }

        .second .top {
            display: flex;
            position: relative;
        }

        .second-img {
            flex: 1;
            text-align: center;
        }

        .to_reply {
            color: rgb(106, 106, 106);
        }

        .second-content {
            flex: 9;
        }

        .second .reply_li {
            margin-left: 70px;
        }

        /* 评论点赞颜色 */
        .comment-like {
            color: red;
        }
    }

}
</style>