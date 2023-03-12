const Controller = require("egg").Controller;

class User extends Controller {
    //获取请求参数
    // 12
    getParam(key) {
        //得到请求方式: "GET","POST"
        let method = this.ctx.request.method;//"GET", "POST"
        if (method == 'GET') {
            let v = this.ctx.request.query[key];
            return v;
        } else if (method == "POST") {
            let v = this.ctx.request.body[key];
            return v;
        }
    }

    // 检查是否登录
    async checkLogin() {
        if (this.ctx.session.uid) {
            this.ctx.response.body = {
                state: 1,
                uid: this.ctx.session.uid,
                user_name: this.ctx.session.user_name,
                tel_num: this.ctx.session.tel_num,
                password: this.ctx.session.password,
            }
        } else {
            this.ctx.response.body = { state: 0 };
        }
    }

    async login() {
        try {
            let tel_num = this.getParam('tel_num');
            let password = this.getParam('password');
            let list = await this.ctx.service.login.login(tel_num, password);
            // 如果登录成功，设置ctx.session.uid
            if (list.code == 2) {
                let uid = list.uid;
                this.ctx.session.uid = uid;
                this.ctx.session.tel_num = tel_num;
            }
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }

    // 退出登录
    async LoginOut() {
        this.ctx.session.uid = null;
        this.ctx.response.body = true;
    }

    // 注册
    async register() {
        try {
            let user_name = this.getParam('user_name');
            let tel_num = this.getParam('tel_num');
            let password = this.getParam('password');
            let list = await this.ctx.service.login.register(user_name, tel_num, password);
            // 如果注册成功，设置ctx.session.uid
            if (list.code == 0) {
                let uid = list.uid;
                this.ctx.session.uid = uid;
                this.ctx.session.tel_num = tel_num;
            }
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "异常";
        }
    }
    async getPositionInfoByKey() {
        let key = this.getParam("key");
        let list = await this.ctx.service.login.getPositionInfoByKey(key);
        this.ctx.response.body = list;
    }



}
module.exports = User;