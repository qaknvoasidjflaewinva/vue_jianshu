
const Controller = require("egg").Controller;

class TestController extends Controller {
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

	async getEssay() {
		try {
			let id = this.getParam("id");
			let list = await this.ctx.service.testService.getEssay(id);
			this.ctx.response.body = list;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}
	async getEssayo() {
		try {
			let id = this.getParam("id");
			let list = await this.ctx.service.testService.getEssayo(id);
			this.ctx.response.body = list;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async addWrite() {
		try {
			let author_id = this.getParam("author_id");
			let update_time = this.getParam("update_time");
			let list = await this.ctx.service.testService.addWrite(author_id, update_time);
			this.ctx.response.body = list
		} catch (e) {
			console.log(e);
			this.ctx.response.body = e;
		}
	}
	async updateWrite() {
		try {
			let eid = this.getParam('eid')
			let title = this.getParam("title");
			let content = this.getParam("content");
			let update_time = this.getParam("update_time");
			let word_num = this.getParam("word_num");
			let list = await this.ctx.service.testService.updateWrite(eid, title, content, update_time, word_num);
			this.ctx.response.body = list
		} catch (e) {
			console.log(e);
			this.ctx.response.body = e;
		}
	}
	async deleteWrite() {
		try {
			let eid = this.getParam("eid");
			let list = await this.ctx.service.testService.deleteWrite(eid);
			this.ctx.response.body = list
		} catch (e) {
			console.log(e);
			this.ctx.response.body = e;
		}
	}
	async releaseWrite() {
		try {
			let eid = this.getParam("eid");
			let status = this.getParam("status");
			let isPublish = this.getParam("isPublish");
			let list = await this.ctx.service.testService.releaseWrite(status, isPublish, eid);
			this.ctx.response.body = list
		} catch (e) {
			console.log(e);
			this.ctx.response.body = e;
		}
	}
}
module.exports = TestController;