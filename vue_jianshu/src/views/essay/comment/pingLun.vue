<template>
    <div>
        <div class="pingSection" style="letter-spacing: 1px">
            <div class="head">
                <!-- 评论区域如果当前用户有头像则显示头像,没有则显示默认头像 -->
                <img v-if="picture" src="../../../images/essay/authorImg.webp" alt="" />
                <img v-else src="../../../images/essay/pingLun/12.webp" alt="" />
                <!-- 评论框 -->
                <input type="text" placeholder="请输入评论 . . ." ref="input" @focus="obtain" @blur="lose" v-model="firstComments"
                    @keyup.enter="sumbit" />
                <!-- 发布按钮 -->
                <button @click="sumbit">发表评论</button>
                <button >取消</button>
            </div>
            <div class="content">
                <!-- 一级评论 -->
                <div class="first" v-for="(item, index) in comments" :key="index">
                    <a href="javascript:;" class="first-img">
                        <!-- 如果当前用户有头像则显示头像,没有则显示默认头像 -->
                        <!-- <img :src="`http://` + item.picture" /> -->
                        <img v-if="item.picture" :src="item.picture" alt="" />
                        <img v-else src="../../../images/pingLun/12.webp" alt="" />
                    </a>
                    <div class="first-content">
                        <!-- 一级评论用户昵称 -->
                        <h3 class="first-username">{{ item.username }}</h3>
                        <!-- 一级评论发布时间 -->
                        <span class="first-time">{{ item.date }}</span>
                        <!-- 一级评论评论内容 -->
                        <p class="first-comment">
                            {{ item.content }}
                        </p>
                        <!-- 一级评论评论点赞 -->
                        <div class="first-right" @mouseleave="delete_leave(item)" @mouseover="delete_after(item)">
                            <span class="delete" v-if="item.delete" @click="comment_delete(item, 0)">删除</span>
                            <span class="comments" @click="comment_input(item)">评论</span>
                            <!-- 一级评论点赞数 -->
                            <span class="praise" :class="item.like" @click="comment_like(item, 0)">
                                <span v-if="item.numbers">{{ item.numbers }}</span>
                            </span>
                        </div>
                        <!-- 回复一级评论 -->
                        <div class="reply-comment" v-if="item.display">
                            <input type="text" placeholder="请输入评论 . . ." v-model="childComments"
                                @keyup.enter="reply_sumbit(item, 0)" />
                            <!-- 0为回复一级评论 -->
                            <button @click="reply_sumbit(item, 0)">发表评论</button>
                        </div>
                        <!-- 次级评论 -->
                        <div class="second">
                            <ul>
                                <li v-for="(sons, index) in item.sons" :key="index">
                                    <div class="top">
                                        <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                                        <a href="JavaScript:;" class="second-img">
                                            <img v-if="sons.picture" :src="`http://` + sons.picture" />
                                            <img v-else src="../../assets/头像.jpg" />
                                        </a>
                                        <div class="second-content">
                                            <!-- 次级评论用户昵称 -->
                                            <h3 class="second-username">{{ sons.username }}</h3>
                                            <!-- 次级评论评论时间 -->
                                            <span class="second-time">{{ sons.date }}</span>
                                            <!-- 次级评论内容 xxx回复xxx：评论内容-->
                                            <p class="second-comment">
                                                <span class="second-reply">
                                                    <span class="to_reply">{{ sons.username }}</span>
                                                    回复
                                                    <span class="to_reply">{{ sons.to_username }}</span>：
                                                </span>
                                                {{ sons.content }}
                                            </p>
                                            <!-- 次级评论评论点赞 -->
                                            <div class="second-right" @mouseleave="delete_leave(sons)"
                                                @mouseover="delete_after(sons)">
                                                <span class="delete" v-if="sons.delete"
                                                    @click="comment_delete(sons, 1)">删除</span>
                                                <span class="comments" @click="comment_input(sons)">评论</span>
                                                <!-- 次级评论点赞数 -->
                                                <span class="praise" :class="sons.like" @click="comment_like(sons, 1)">
                                                    <span v-if="sons.numbers">{{
                                                            sons.numbers
                                                    }}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 回复次级评论 -->
                                    <div class="reply-comment reply_li" v-if="sons.display">
                                        <input type="text" placeholder="请输入评论 . . ." v-model="childComments"
                                            @keyup.enter="reply_sumbit(sons, 1)" />
                                        <!-- 1为回复次级评论 -->
                                        <button @click="reply_sumbit(sons, 1)">发表评论</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 暂无评论的空状态 -->
                <el-empty description="暂无评论" v-if="show"></el-empty>
            </div>
            <!-- 页码 -->
            <div style="text-align: center; margin-top: 15px" v-if="showPage">
                <el-pagination background layout="prev, pager, next" :total="totalNumber * 10" @current-change="currentPage"
                    :current-page="page">
                </el-pagination>
            </div>
        </div>
    </div>
<router-view></router-view>
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
                like: "red",
                numbers:2
            }
        ];
        return {
            picture,
            comments
    }
}

// 当list不为空时(当评论内容不为空)
this.comments = []; //清空评论列表
if (data.data.list.length) {
    this.show = false; //当有评论时，隐藏空状态
    this.showPage = true; //当有评论时，显示页码
    this.totalNumber = data.data.pages; //总页数
    this.comments = data.data.list; //评论列表

    // 利用forwach递归去除次级评论数据
    this.comments.forEach((element) => {
        var comment_blog = []; //定义空数组装取出的次级评论
        var son = element.sons; //将当前次级评论列表赋值给变量son
        function child(sonchild) {
            // 嵌套foreach
            sonchild.forEach((element) => {
                comment_blog.push(element); //将次级评论追加到该数组
                if (element.son.length) {
                    // 当次级评论部位空时一直进行递归
                    // 递归追加次级评论
                    child(element.son);
                }
            });
        }
        child(son); //调用函数
        // 将取出的评论信息覆盖到当前评论列表的次级评论处
        element.sons = comment_blog;
    });

    // 双重for循环给一级评论和次级评论添加对象属性
    for (let i = 0; i < this.comments.length; i++) {
        //给每条评论添加一个属性用于控制评论框的显示与隐藏
        this.$set(this.comments[i], "display", false);

        //给每条评论添加一个属性用于删除按钮的显示与隐藏
        // 当 当前登录用户id和当前博客的用户id相同则可以删除所有评论
        if (this.uid === this.$store.getters.getLoginxMessage.uid) {
            this.$set(this.comments[i], "delete", false);
        } else if (
            this.comments[i].user_id ===
            this.$store.getters.getLoginxMessage.uid
        ) {
            // 当 当前评论的用户id和当前登录的用户id相同时则可删除该条评论
            this.$set(this.comments[i], "delete", false);
        }

        //给每条评论添加一个属性用于点赞的颜色变化，true表示当前用户已点赞该条评论
        if (this.comments[i].flag) {
            this.$set(this.comments[i], "like", "comment-like");
        } else {
            this.$set(this.comments[i], "like", "");
        }

        for (let j = 0; j < this.comments[i].sons.length; j++) {
            //给每条评论添加一个属性用于控制评论框的显示与隐藏
            this.$set(this.comments[i].sons[j], "display", false);

            //给每条评论添加一个属性用于删除按钮的显示与隐藏
            // 当 当前登录用户id和当前博客的用户id相同则可以删除所有评论
            if (this.uid === this.$store.getters.getLoginxMessage.uid) {
                this.$set(this.comments[i].sons[j], "delete", false);
            } else if (
                this.comments[i].sons[j].user_id ===
                this.$store.getters.getLoginxMessage.uid
            ) {
                // 当 当前评论的用户id和当前登录的用户id相同时则可删除该条评论
                this.$set(this.comments[i].sons[j], "delete", false);
            }
            //给每条评论添加一个属性用于点赞的颜色变化，true表示当前用户已点赞该条评论
            if (this.comments[i].sons[j].flag) {
                this.$set(this.comments[i].sons[j], "like", "comment-like");
            } else {
                this.$set(this.comments[i].sons[j], "like", "");
            }
        }
    }
} else {
    // 若删除第一页以后的评论则重新调用查看评论方法查看刚刚删除评论页的上一页评论（最后一页的评论）
    if (this.page > 1) {
        this.page--;
        this.view_comments(); //更新评论列表
    } else {
        this.show = true; //空状态显示与隐藏
        this.showPage = false; //当空状态显示时隐藏页码
    }
}

}
</script>

<style lang="scss" scoped>
.pingSection {
    padding: 32px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
}
/* 评论框 */
.head {
    background-color: rgb(248, 248, 248);
    position: relative;
    height: 75px;
    border-radius: 5px;
}

.head img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 13px;
}

/* 评论框 */
.head input {
    position: absolute;
    top: 13px;
    left: 80px;
    height: 45px;
    border-radius: 5px;
    outline: none;
    width: 65%;
    font-size: 20px;
    padding: 0 20px;
    border: 2px solid #f8f8f8;
}

/* 发布评论按钮 */
.head button {
    position: absolute;
    top: 13px;
    right: 20px;
    width: 120px;
    height: 48px;
    border: 0;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    background-color: rgb(118, 211, 248);
    cursor: pointer;
    letter-spacing: 2px;
}

/* 鼠标经过字体加粗 */
.head button:hover {
    font-weight: 600;
}

/* 评论内容区域 */
.content .first {
    display: flex;
    position: relative;
    padding: 10px 10px 0px 0;
}

.first .first-img {
    flex: 1;
    text-align: center;
}

.first img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.first-username,
.second-username {
    color: #504f4f;
}

.first-content {
    flex: 9;
}

.first-time,
.second-time {
    color: #767575;
}

.first-comment,
.second-comment {
    margin-top: 5px;
}

/* 右边点赞和评论 */
.first-right,
.second-right {
    position: absolute;
    right: 1%;
    top: 10px;
}

.first-right span,
.second-right span {
    margin-right: 20px;
    cursor: pointer;
}

/* 删除评论 */
.delete:hover {
    color: red;
}

/* 评论字体图标 */
.comments::before {
    /* 想使用的icon的十六制编码，去掉&#x之后的 */
    content: "\e8b9";
    /* 必须加 */
    font-family: "iconfont";
    margin-right: 4px;
    font-size: 16px;
}

/* 点赞字体图标 */
.praise::before {
    /* 想使用的icon的十六制编码，去掉&#x之后的 */
    content: "\ec7f";
    /* 必须加 */
    font-family: "iconfont";
    margin-right: 4px;
    font-size: 19px;
}

.second {
    background-color: #f3f3f3;
    margin-top: 10px;
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

/* 评论框 */
.reply-comment {
    margin: 10px 0 0 0;
}

.reply-comment input {
    height: 40px;
    border-radius: 5px;
    outline: none;
    width: 70%;
    font-size: 18px;
    padding: 0 20px;
    /* border: 2px solid #f8f8f8; */
    border: 2px solid skyblue;
}

/* 发布评论按钮 */
.reply-comment button {
    width: 15%;
    height: 43px;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    background-color: rgb(118, 211, 248);
    cursor: pointer;
    letter-spacing: 2px;
    margin-left: 20px;
}

/* 鼠标经过字体加粗 */
.reply-comment button:hover {
    font-weight: 600;
}

/* 评论点赞颜色 */
.comment-like {
    color: red;
}
</style>

