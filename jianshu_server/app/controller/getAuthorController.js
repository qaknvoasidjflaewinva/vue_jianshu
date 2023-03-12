const Controller = require("egg").Controller;

class GetAuthorController extends Controller {
    //获取请求参数
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

    async getAuthor() {
        try {
            let key = this.getParam('id')
            let list = await this.ctx.service.getAuthorService.getAuthor(key);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "21111";
        }
    }

    async getCurrentUser() {
        try {
            let key = this.getParam("key")
            let list = await this.ctx.service.getAuthorService.getCurrentUser(key);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = "21111";
        }
    }

    async follow() {
        try {
            let status = this.getParam('status');
            let follower = this.getParam('follower');
            let user = this.getParam('user');
            let list = await this.ctx.service.getAuthorService.follow(status, follower, user);
            this.ctx.response.body = list;
        } catch (error) {
            console.log(eee);
        }
    }

    async followOff() {
        try {
            let follower = this.getParam('follower');
            let user = this.getParam('user');
            let list = await this.ctx.service.getAuthorService.followOff(follower, user);
            this.ctx.response.body = list;
        } catch (error) {
            console.log(eee);
        }
    }

    async getFollowStatus() { 
        try {
            let follower = this.getParam('follower');
            let user = this.getParam('user');
            let list = await this.ctx.service.getAuthorService.getFollowStatus(follower, user);
            this.ctx.response.body = list;
        } catch (error) {
            console.log(eee);
        }
    }
}
module.exports = GetAuthorController;