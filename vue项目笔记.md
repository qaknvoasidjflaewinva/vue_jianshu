## vue项目笔记

##### 1、git 怎么在我的分支拉取其他分支的内容

git pull origin 其他分支名



##### 2、拉取下来后，运行出现：'vite' 不是内部或外部命令，也不是可运行的程序或批处理文件。

原因：没有安装依赖

解决：npm install



##### 3、vue中引入图片，有三种方法

```javascript
// 在模板中绑定可使用 
<img :src="imgUrl">

//方法1.使用import将图片引入为模块，然后将其存入data中
import imgUrl from "../assets/test.png"
data(){
    return {
        imgUrl:imgUrl
    }
}

//方法2.使用require将imgUrl放在数据里
data(){
    return {
        imgUrl:require("../assets/test.png")
    }

}

//方法3.在生命周期函数中设置url变量
data(){
    return {
        imgUrl:""
    }
}
created(){
    let urlTemp = "assets/test.png";
    this.imgUrl = require("@/"+urlTemp)
}
```
在模板中，背景图不可以使用相对路径直接引入，只能通过
模块化方式引入

![img](https://img-blog.csdnimg.cn/f55a73c4116d4221ba8b62e2fad33c95.png)



##### 3  a 标签下划线去除 

text-decoration



##### 4 sass 混入使用

```scss
@mixin public{
    width:50px;
    height:50px;
}
/* 引用 Mixins模块 */
div{
    @include public;
}
```



##### 5   为什么需要在地址栏手动加login才可以访问到  /login/sign_in

解决：把path由/login 改为 / 

```typescript
const routes: any[] = [
    {
        name: 'Login',
        path: '/', // 这里不应该写login  否则地址栏需要手动加
        component: Login,
        redirect: '/sign_in',
        children: [
            {
                name: 'SignIn',
                path: 'sign_in',
                component: SignIn
            },
            {
                name: 'SignUp',
                path: 'sign_up',
                component: SignUp
            }
        ]
    }
];
```

##### 6 怎么也登不上 连不到后端

后端代码写错了  controller文件名改了 文件中未改  



##### 7 通过classList来添加、删除类名

- 添加一个类名
  获取元素名.classList.add("类名");
- 添加多个类名用逗号隔开
  获取元素名.classList.add("类名1","类名2","类名3",...); 
- 移除一个类名
  获取元素名.classList.remove("类名");
- 移除多个类名
  获取元素名.classList.remove("类名1","类名2","类名3",...); 



##### 8 排他设计法 先去除所有人的样式 再给自己加样式

```typescript
let changeTab: any = document.querySelector('.title');
            changeTab.addEventListener("click", function (e: any) {
                let anode = document.querySelectorAll('.title a');
                // 循环去除其他人的样式
                for (var i = 0; i < anode.length; i++) {
                    anode[i].classList.remove('on_click');
                }
                // 再单独设置自己的样式
                if (e.target.nodeName == 'A') {
                    e.target.classList.add('on_click')
                }
            })
```



##### DOM 事件

###### 鼠标事件

oninput 输入时触发

onchange 只在键盘或者鼠标操作改变对象属性，且失去焦点时触发

onclick 点击 

oncontextmenu 点击鼠标右键打开上下文菜单

ondblclick  双击

onmousedown 鼠标按下

onmouseenter 鼠标移入

onmouseleave 鼠标移出

onmousemove 鼠标移动

onmouseout 鼠标移开

onmouseup 鼠标按键松开

![image-20221031090226079](C:\Users\qxy\AppData\Roaming\Typora\typora-user-images\image-20221031090226079.png)

###### 键盘事件

![image-20221031090847760](C:\Users\qxy\AppData\Roaming\Typora\typora-user-images\image-20221031090847760.png)

###### 框架/对象事件

![image-20221031091003863](C:\Users\qxy\AppData\Roaming\Typora\typora-user-images\image-20221031091003863.png)





git项目功能管理

webpack  vite 打包工具

理解js单线程机制以及同步异步思想







##### 选项式API、组合式API 使用element   

1 全局引入

在选项式中直接使用 message

```
this.$message.success()
```

2  按需引入

```typescript
//helloworld.vue
// 组合式使用ElMessage
import { inject, defineComponent,onMounted } from 'vue';
import { ElMessage } from 'element-plus'
export default  = defineComponent{
setup(omprops,content){
    onMounted(()=>{
      ElMessage.success('按需引入');
    })
}
//  使用message组件
// 选项式
this.$message({
  message: "提示信息",
  type: "success"
})   
// 组合式
ElementUI.Message({
  message: '提示信息',
  type: 'warning'
});    
```





##### 记住账号密码功能

1 为提高安全性，密码存储前需进行加密处理。目前加密方式有很多种，这里选用base64

```typescript
// 安装base64依赖
//安装
npm install --save js-base64
//引入
const Base64 = require("js-base64").Base64
// 组合式API中引入为
import { Base64 }  from 'js-base64';
```



##### localStorage的方法：

localStorage.getItem(key):    获取指定key本地存储数据的值；   

 localStorage.setItem(key,value)：获取指定value 存储到key 字段

 localStorage.removeItem(key):  删除指定key 本地存储的值



##### input的checkbox 绑定 v-model 却拿不到绑定的值

在setup中没有return



##### vue 按条件添加类名

```html
<div :class="{ active: isActive }"></div>
<!-- 
active 为类名  isActive 判断条件 

active：两处 html中、css中写类样式
isActive：四处 
	1、模板 
	2、声明 let isActive = ref<any>(null);
	3、ts中 条件  isapper.value = true;
 	4、返回值	return { isActive };
-->
```





##### vue中获取目标元素event.target

事件函数传参$event

```vue
<template>
<button class="login_up" @click="register($event)">注册</button>
</template>
<script lang="ts">
// 使用$event
const register = (e) => {
    console.log(e.target)
}
</script>
```





##### 为什么登录页axios模块化 api不能实现



##### vue使用组件

```vue
<script>
// 1、引入组件
import ButtonCounter from './ButtonCounter.vue'
export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
	<!-- 2、使用组件 -->
  <ButtonCounter />
</template>
```







##### 点击某个导航按钮，跳转另一个页面，并改变导航栏样式。

通过动态class和$route.path来实现tab样式的切换

```vue
<router-link to="/sign_in" class="sign " :class="{ on_click: '/sign_in' === $route.path }">登录</router-link>
<!-- 应该放路由router-link  链接到注册路由 -->
<router-link to="/sign_up" class="sign" :class="{ on_click: '/sign_up' === $route.path }">注册</router-link>
```



##### CSS媒体查询 

```css
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```



##### Vue通过登录状态控制导航栏的显示

就是用了简单的v-if 来判断，根据是否可以从sessionstorage获取到数据(token) 这个没实现

```vue
<template>
<ul v-if="isShow()"><li>发现</li></ul>
<ul v-else><li>首页</li></ul>
</template>

<script lang="ts">
export default {
    setup() {
        const isShow = () => {
            let check = localStorage.getItem('login');
            console.log(check);
            return check;
        };
        return { isShow }
    }
}
</script>
```



##### 怎么用token





##### 为什么使用了固定定位就变样了

没有给宽 设置固定定位后脱离了文档流 加上宽即可



##### vue中根据屏幕的滚动展示不同样式的导航栏

```vue
<div class="main" :class="{ main_up: ismainUp }"></div>
<script>
onMounted(() => {
    // 监听屏幕滚动 根据屏幕的滚动展示不同样式的导航栏
    window.addEventListener('scroll', () => {
        // 设置动态类名 根据滚动状态展示不同样式
        window.pageYOffset > 120 ? ismainUp.value = true : ismainUp.value = false;
    })
});
</script>
```





##### git 直接拉取指定分支下的文件



##### 刷新页面的reload() 方法和replace() 方法

一、router.push()

二、router.replace()

三、router.go()

location.reload()方法，该方法强迫浏览器刷新当前页面。

replace 方法，该方法通过指定URL替换当前缓存在历史里（客户端）的项目，因此当使用replace方法之后，你不能通过“前进”和“后退”来访问已经被替换的URL。

语法： location.replace(URL)  

通常使用： location.reload() 或者是 history.go(0) 来做。

router.replace("/")







##### 增加 转路由  

```vue
<script>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    router.push({ path: '/sign_in' });
    router.replace("/")
</script>
```



导航栏标签样式怎么随路由改变而改变 子路由改变而样式不改变