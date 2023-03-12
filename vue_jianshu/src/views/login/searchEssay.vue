<template>
    <div>
        <template v-for="b in essayShowList">
            <div v-if="b.headImgUrl" class="hasImgEssay">
                <router-link v-bind:to="'/p/' + b.eid" class="essayImg">
                    <img :src="b.headImgUrl">
                </router-link>
                <div>
                    <div class="essayItem">
                        <router-link v-bind:to="'/p/' + b.eid" class="title">{{ b.title }}</router-link>
                        <p class="abstract">{{ ToText(b.content).slice(0, 72) }}...</p>
                        <div class="meta">
                            <a href="#" target="_blank" class="nickname">{{ b.user_name }}</a>
                            <router-link v-bind:to="'/p/' + b.eid" class="pinglun">
                                <i class="iconfont ic_comments">&#xe629;</i>
                                {{ b.comment_num }}
                            </router-link>
                            <span>
                                <i class="iconfont ic_like">&#xe8c3;</i>
                                {{ b.like_num }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="essayItem">
                <router-link v-bind:to="'/p/' + b.eid" class="title">{{ b.title }}</router-link>
                <p class="abstract">{{ ToText(b.content).slice(0, 72) }}...</p>
                <div class="meta">
                    <a href="#" target="_blank" class="nickname">{{ b.user_name }}</a>
                    <router-link v-bind:to="'/p/' + b.eid" class="pinglun">
                        <i class="iconfont ic_comments">&#xe629;</i>
                        {{ b.comment_num }}
                    </router-link>
                    <span>
                        <i class="iconfont ic_like">&#xe8c3;</i>
                        {{ b.like_num }}
                    </span>
                </div>
            </div>
        </template>
        <h1 v-show="hasEssay">暂无文章</h1>
    </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import { essayShow } from '../api/essay';
import { essayShowById } from '../api/getEssayShowById.ts'
let essayShowList = ref([]);


</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.hasImgEssay {
    position: relative;

    .essayImg {
        width: 150px;
        position: absolute;
        top: 50%;
        margin-top: -60px;
        right: 0;
        height: 100px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }
    }

    div {
        padding-right: 165px;
    }
}

.essayItem {
    position: relative;
    width: 100%;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;

    .title {
        margin: -7px 0 4px;
        color: #333333;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;

        &:visited {
            color: #999;
        }

        &:hover {
            text-decoration: underline;
        }
    }

    .abstract {
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #999;
    }

    .meta {
        padding-right: 0 !important;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;

        a {
            margin-right: 10px;
            color: #b4b4b4;

            &:hover {
                color: #787878;
            }
        }

        span {
            margin-right: 10px;
            color: #b4b4b4;
        }
    }
}
</style>