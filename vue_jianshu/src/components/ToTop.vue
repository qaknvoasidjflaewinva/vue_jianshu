<template>
    <div>
        <div class="side_tool">
            <div class="toolBox" @click="backtop" v-show="isShow">
                <div>
                <span class="iconfont backtop">&#xe63d;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
        };
    },
    mounted() {
        this.listenerFunction();
    },
    methods: {
        listenerFunction(e) {
            document.addEventListener("scroll", this.handleScroll, true);
        },
        beforeDestroy() {
            document.removeEventListener("scroll", this.listenerFunction);
        },
        handleScroll() {
            // handleScroll 和 methods 是同级
            if (window.pageYOffset > 250) {
                //window.pageYOffset:获取滚动距离
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        //返回顶部
        backtop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        },
    }
};
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
.side_tool {
    position: fixed;
    bottom: 90px;
    right: 90px;
    z-index: 1040;

    .toolBox {
        border: 1px solid #dcdcdc;
        background-color: #fff;
        transition: .1s ease-in;

        div {
            cursor: pointer;
            width: 50px;
            height: 50px;
            text-align: center;
            display: block;

            .backtop {
                padding-top: 16px;
                font-size: 20px;
                display: block;
            }
        }

        &:hover {
            background-color: hsla(0, 0%, 71%, .1);
            transition: .1s ease-in;
        }
    }
}
</style>