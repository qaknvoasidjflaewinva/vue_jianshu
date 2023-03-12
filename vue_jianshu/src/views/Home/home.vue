<template>
    <div>
        <div class="container">
            <div class="indexBox">
                <div class="indexMain">
                    <div class="indexCarouse1">
                        <a href="#">
                            <img src="../../images/home/fanxingjihua.jpg" alt="">
                        </a>
                    </div>
                    <!-- 这是文章渲染 -->
                    <EssayList />
                </div>
                <div class="indexAside">
                    <div class="asideBoard">
                        <a href="#">
                            <img src="../../images/home/meiritiaozhan.png">
                        </a>
                        <a href="#">
                            <img src="../../images/home/jianshuhuiyuan.png">
                        </a>
                        <a href="#">
                            <img src="../../images/home/youxuanlianzai.png">
                        </a>
                        <a href="#">
                            <img src="../../images/home/jianshubanquan.png">
                        </a>
                    </div>
                    <div class="downTip">
                        <img src="../../images/home/jianshuerweima.png" class="erweima">
                        <div class="tipInfo">
                            <div class="tipTitle">下载简书手机App ></div>
                            <div class="tipCon">随时随地发现和创作内容</div>
                        </div>
                    </div>
                    <!-- 这是推荐作者 -->
                    <focus />
                </div>
            </div>
            <!-- 回到顶部 -->
            <ToTop />
        </div>
    </div>
</template>

<script setup lang="ts">
import EssayList from "../../components/EssayShow.vue";
import ToTop from "../../components/ToTop.vue";
import focus from '../../components/FocusComponent/focusCom.vue'

</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.container {
    width: 960px;
    margin: 0 auto;
}

.indexBox {
    display: flex;

    .indexMain {
        width: 625px;
        padding: 30px 0 0 15px;
        margin-bottom: 50px;

        .indexCarouse1 {
            width: 625px;
            height: 270px;
            margin-bottom: 35px;

            a {
                img {
                    width: 100%;
                    height: 270px;
                }
            }
        }
    }

    .indexAside {
        width: 280px;
        padding-top: 30px;
        margin-left: 40px;

        .asideBoard {
            height: 228px;

            a {
                img {
                    width: 100%;
                    min-height: 50px;
                    margin-bottom: 6px;
                    border-radius: 4px;
                }
            }
        }

        .downTip {
            margin-bottom: 30px;
            padding: 10px 0;
            width: 100%;
            border: 1px solid #f0f0f0;
            border-radius: 6px;
            background-color: #fff;

            .erweima {
                width: 60px;
                height: 60px;
                opacity: .85;
                margin-left: 22px;
                vertical-align: middle;
            }

            .tipInfo {
                display: inline-block;
                vertical-align: middle;
                margin-left: 7px;

                .tipTitle {
                    font-size: 15px;
                    color: #333;
                }

                .tipCon {
                    margin-top: 8px;
                    font-size: 13px;
                    color: #999;
                }
            }
        }
    }

}
</style>