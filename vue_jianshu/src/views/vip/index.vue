<template>
    <div class="container">
        <div class="img_back">

        </div>
        <div class="more">
            <h1>更多精彩内容</h1>
            <div class="content">
                <EssayShow />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import EssayShow from '../../components/EssayShow.vue'
export default {
    setup() {


        return {}
    },
    components: {
        EssayShow
    }
}
</script>

<style lang="scss" scoped>
.container {
    .img_back {
        background: url(../../images/vip/vip.jpg) center center / cover no-repeat;
        width: 100%;
        height: 360px;
        position: relative;
        cursor: pointer;
    }

    .more {
        // width: 1440px;
        margin: 10px auto;
        width: 625px;
        margin-left: 220px;

        h1 {
            margin: 100px auto 20px;
            font-size: 26px;
            font-weight: 600;
            color: #333333;

            &::after {
                content: '';
                display: block;
                height: 1px;
                width: 100%;
                background-color: #eee;
                position: relative;
                top: 20px;
            }

        }



    }
}
</style>