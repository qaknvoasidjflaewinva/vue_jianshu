<!-- 底部组件 -->
<template>
    <div class="container">
        <div class="main">
            <div class="link">
                <a target="_blank" href="https://www.jianshu.com/c/jppzD2">关于简书</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/contact">联系我们</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/c/bfeec2e13990">加入我们</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/p/fc1c113e5b6b">简书出版</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/press">品牌与徽标</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/faqs">帮助中心</a><em> · </em>
                <a target="_blank" href="https://www.jianshu.com/p/cabc8fa39830">合作伙伴</a><em> · </em>
                <a target="_blank" href="https://www.picmoon.com/">涂檬-原创插画社区</a>

            </div>
            <div class="icp">
                ©2012-2021 上海佰集信息科技有限公司 / 简书 /
                <a target="_blank" href="https://beian.miit.gov.cn">沪ICP备11018329号-5 / </a>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402002252">
                    <img src="../images/footer/实名验证.png" alt="Smrz">
                </a> <a target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402002252">沪公网安备31010402002252号
                    / </a>
                <a target="_blank" href="https://www.12377.cn/">
                    <img src="../images/footer/中央网信办.png" alt="Wxb">
                </a> <a target="_blank" href="http://www.shjbzx.cn/">
                    <img src="../images/footer/上海市互联网违法举报中心.jpg" alt="Weifa">
                </a> 简书网举报邮箱：help@jianshu.com
                <br>
                举报电话：18510346566 /
                <a target="_blank" href="javascript:void(null)">
                    <img src="../images/footer/fanzha.jpg" alt="Fanzha">
                </a> 亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听 /
                <a target="_blank"
                    href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&amp;serial=9031000020171107081457000002158769-SAIC_SHOW_310000-20171115131223587837&amp;signData=MEQCIADWZ5aTcBeER5SOVp0ly+ElvKnwtjczum6Gi6wZ7/wWAiB9MAPM22hp947ZaBobux5PDkd0lfqoCOkVV7zjCYME6g==">
                    <img src="../images/footer/电子营销执照.png" alt="Zggsrz">
                </a>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 960px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
}

.main {
    padding-top: 25px;
    margin-left: 18px;
    margin-right: -15px;
    width: 70.83333%;

    .link {
        padding-right: 0;
        font-size: 13px;
        color: #969696;

        a {
            color: #969696;
            display: inline-block;
        }
    }

    .icp {
        margin-top: 10px;
        font-size: 12px;
        color: #c8c8c8;

        a {
            color: #c8c8c8;
        }

        img {
            height: 30px;
            vertical-align: middle;
        }
    }
}
</style>