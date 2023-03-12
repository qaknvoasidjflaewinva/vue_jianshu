const Controller = require("egg").Controller;
class userController extends Controller{
    getParam(key) {
		//得到请求方式: "GET","POST"
		let method = this.ctx.request.method;//"GET", "POST"
		if(method == 'GET') {
			let v = this.ctx.request.query[key];
			return v;
		}else if(method=="POST"){
			let v = this.ctx.request.body[key];
			return v;
		} 
	}
async getAll() {
    //list是班级的对象数组
    let userid = this.getParam("id");
    let list = await this.ctx.service.userService.getAll(userid);
    this.ctx.response.body = list;
}

async updateImg() {
    const files = this.ctx.request.files;
	let userid = this.getParam("id");
	let num = await this.ctx.service.userService.updateimg(files,userid);
	this.ctx.response.body = num;
}

async updatainfo() {
	let username = this.getParam("username");
	let userid = this.getParam("id");
	let num = await this.ctx.service.userService.updatainfo(username,userid);
	this.ctx.response.body = num;
}

async updatainfo2() {
	let password = this.getParam("password");
	let gender = this.getParam("gender");
	let userid = this.getParam("id");
	let introduction = this.getParam("introduction")
	let num = await this.ctx.service.userService.updatainfo2(password,gender,introduction,userid);
	this.ctx.response.body = num;
}

async deleteuser(){
	let userid = this.getParam("id");
	let num = await this.ctx.service.userService.deleteuser(userid);
	this.ctx.response.body = num;
}


async selectinfo() {
    let userid = this.getParam("id");
    let list = await this.ctx.service.userService.selectinfo(userid);
    this.ctx.response.body = list;
}
}
module.exports = userController;