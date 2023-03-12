<template>
    <div>
        <div class="container-fluid misc">
            <div class="row">
                <div class="container top-part">
                    <div class="top-logo">
                        <img class="logo" src="../../images/download/logo.png" alt="Misc logo">
                        <div class="info">
                            <div class="title">创作你的创作</div>
                            <div class="slogan">一个优质创作社区</div>
                        </div>
                    </div>
                    <img class="background-img" src="../../images/download/beijing.png" alt="Misc background">
                    <img class="phone-img" src="../../images/download/phone.png" alt="Misc phone">
                    <div class="top-qrcode">
                        <img src="../../images/download/erweima.png" alt="Download apps page top qrcode">
                        <div class="title">扫码下载简书App</div>
                        <div class="description">随时随地发现和创作内容</div>
                    </div>
                </div>
            </div>
            <div class="row w">
                <div class="container middle-part">
                    <div class="col-xs-12 col-xs-offset-2 text-block">
                        <h3>轻松创作精美图文</h3>
                        <h6>简单优雅的设计，可以一次上传多张图片、实时保存、多端同步，使创作分享更方便快捷</h6>
                    </div>
                    <div class="col-xs-24"><img class="" src="../../images/download/beijing2.png" alt="Misc pic1"></div>
                </div>
            </div>
            <div class="row w">
                <div class="container middle-part">
                    <div class="col-xs-11 col-xs-offset-1"><img class="" src="../../images/download/yue.png"
                            alt="Misc pic2"></div>
                    <div class="col-xs-11 col-xs-offset-1 text-block">
                        <h3>多元化的创作社区</h3>
                        <h6>一篇短文、一首诗、一幅画，在这里，你的创作将得到全世界的赞赏</h6>
                    </div>
                </div>
            </div>
            <div class="row w">
                <div class="container middle-part">
                    <div class="col-xs-10 col-xs-offset-2 text-block">
                        <h3>百万创作者在简书相遇</h3>
                        <h6>在简书，仍有数百万创作者在坚持产出优质创作，有数千万读者在用心交流创作；众多精彩创作，只在简书看得到</h6>
                    </div>
                    <div class="col-xs-12"><img class="" src="../../images/download/guanzhu.png" alt="Misc pic3"></div>
                </div>
            </div>
            <div class="row w">
                <div class="container middle-part">
                    <div class="col-xs-11 col-xs-offset-1"><img class="" src="../../images/download/xiaoxi.png"
                            alt="Misc pic4"></div>
                    <div class="col-xs-11 col-xs-offset-1 text-block">
                        <h3>自由地交流和沟通</h3>
                        <h6>你可以发表评论、沟通想法。觉得不够？还能给创作者发简信，和无数传遍中文互联网的创作者直接交流</h6>
                    </div>
                </div>
            </div>
            <div class="row w">
                <div class="bottom-part">
                    <img class="bottom-qrcode" src="../../images/download/erweima.png"
                        alt="Download apps page bottom qrcode">
                    <img class="background-img" src="../../images/download/beijing.png" alt="Misc background">
                    <div>扫码下载简书App</div>
                    <div class="bottom-logo">
                        <img src="../../images/download/logo.png" alt="Misc logo">
                        <div class="info">
                            <div class="title">创作你的创作</div>
                            <div class="slogan">一个优质创作社区</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}

.misc .row {
    position: relative;
}

img {
    vertical-align: middle;
}

.row {
    margin-left: -15px;
    margin-right: -15px;
}

.misc .top-part {
    position: relative;
    margin-top: 50px;
    text-align: center;
}

.container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 960px;
}

.misc .top-part .top-logo {
    margin-bottom: 40px;
}

.misc .top-part .background-img {
    margin-top: -100px;
}

.misc .background-img {
    width: 765px;
    height: 172px;
    position: absolute;
    left: 50%;
    margin-left: -380px;
    z-index: -1;
}

.misc .top-part .phone-img {
    width: 410px;
    height: 314px;
}

.misc .top-part .top-logo .logo {
    width: 100px;
    height: 100px;
}

.misc .top-part .top-logo .info {
    display: inline-block;
    margin-left: 20px;
    text-align: left;
    vertical-align: middle;
}

.misc .top-part .top-logo .info .title {
    font-size: 30px;
}

.misc .top-part .top-logo .info .slogan {
    font-size: 24px;
    font-weight: 300;
}

.misc .top-part .top-qrcode {
    display: inline-block;
    margin: 0 0 40px 40px;
    vertical-align: bottom;
    text-align: left;
}

.misc .top-part .top-qrcode img {
    margin-left: -2px;
    width: 140px;
    height: 140px;
}

.misc .top-part .top-qrcode .title {
    margin-top: 4px;
    font-size: 24px;
}

.misc .top-part .top-qrcode .description {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 300;
}

.misc .row:first-child:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-image: linear-gradient(0deg, hsla(0, 0%, 59%, .15), hsla(0, 0%, 59%, 0));
}

.misc .middle-part {
    display: flex;
    padding: 30px 0;
}

.misc .middle-part img {
    width: 100%;
}

.col-xs-11 {
    float: left;
    width: 45.83333%;
    margin-left: 4.16667%;
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
}

.misc .text-block {
    margin-top: 8%;
    margin-left: 4.16667%;
    width: 45.83333%;
}

.misc .middle-part h3 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 400;
}

.misc .middle-part h6 {
    font-size: 18px;
    font-weight: 300;
    line-height: 30px;
}

.misc .bottom-part .bottom-qrcode {
    margin-bottom: 10px;
    width: 140px;
}

.misc .background-img {
    width: 765px;
    height: 172px;
    position: absolute;
    left: 50%;
    margin-left: -380px;
    z-index: -1;
}

.misc .bottom-part .bottom-logo {
    margin-top: 30px;
}

.misc .bottom-part .bottom-logo img {
    width: 56px;
    height: 56px;
}

.misc .bottom-part .bottom-logo .info {
    display: inline-block;
    margin-left: 8px;
    text-align: left;
    vertical-align: middle;
}

.misc .bottom-part .bottom-logo .info .title {
    font-size: 17px;
}

.misc .bottom-part .bottom-logo .info .slogan {
    font-size: 14px;
    font-weight: 300;
}
.misc .bottom-part {
    margin: 50px 0 80px;
    text-align: center;
    font-size: 24px;
}
</style>