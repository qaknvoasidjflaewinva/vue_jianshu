import { createApp } from 'vue'
import './iconfont/iconfont.css';
import App from './App.vue'
import store from './store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./style/font_3741615_6wv5zup46jt/iconfont.css"
// 注册路由
import router from './Router/router';
// 引入管理库store
const app = createApp(App);
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router).use(ElementPlus).mount('#app');
// .use(store)

createApp(App).use(store).use(router).mount('#app');

