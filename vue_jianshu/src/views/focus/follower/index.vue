<template>
  <div style="padding:20px 0 0 20px">
    <div class="cols_main">
      <template v-for="item in userInfo">
        <div class="main_top">
          <div class="headImg">
            <img :src="item.headImgUrl" v-if="item.headImgUrl">
          </div>
          <div style="max-width:200px; float: left;">

            <div class="user_name">{{ item.userName }}</div>
            <div class="info">
              <span class="iconfont">写了{{ item.wrtNum }}字,获得了{{ item.like }}个喜欢</span>
            </div>
          </div>
          <nav style="float:right">
            <router-link :to="'../zhuye?id=' + router.currentRoute.value.query.id">
              <div class="sendMsg_btn iconfont" v-if="userId != router.currentRoute.value.query.id">个人主页&#xe88e;</div>
            </router-link>
            <div class="sendMsg_btn iconfont" v-if="userId != router.currentRoute.value.query.id">发简信</div>
          </nav>


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
        <EssayList :msg="router.currentRoute.value.query.id"></EssayList>
      </div>
      <div v-show="tabStatus.tabStatus2">
        <h1>暂无最新评论</h1>
      </div>
      <div v-show="tabStatus.tabStatus3">
        <h1>暂无热门</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { showList } from '../../../api/getCurrentUser';
import { get1 } from '../../../api/user'
import EssayList from "../../../components/EssayShow.vue";
const router = useRouter();
const src1 = ref();
const userId = localStorage.getItem("uid");

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

watch(() => {

  return router.currentRoute.value.query.id

}, (value) => {
  console.log(value);
  showList(router.currentRoute.value.query.id).then((res) => {
    console.log(res.data);

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
});

onMounted(() => {
  showList(router.currentRoute.value.query.id).then((res) => {
    console.log(res.data);
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
})

const data = {
  tabList: [
    { id: 1, name: '文章', icon: 'icon-wenzhang2' },
    { id: 2, name: '动态', icon: 'icon-lingdang' },
    { id: 3, name: '热门', icon: 'icon-remen' },
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
}
</script>

<style lang="scss" scoped>
.cols_main {
  line-height: 1.42857;
  font-size: 17px;
  color: #333;
  box-sizing: border-box;
  position: relative;
  min-height: 1px;
  float: left;
  padding-left: 15px;
  padding-right: 0;

  .main_top {
    line-height: 1.42857;
    font-size: 17px;
    color: #333;
    box-sizing: border-box;
    margin-bottom: 21px;
    overflow: hidden;

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
      padding: 5px 0 0 10px;
      text-align: left;
      font-size: 21px;
      font-weight: 700;
      min-height: 16px;
      float: left;
    }

    .info {
      color: #969696;
      font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      box-sizing: border-box;
      margin-top: 5px;
      padding-left: 10px;
      font-size: 14px;
      text-align: left;
      float: left;

      span {
        font-size: 14px;
      }


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
</style>