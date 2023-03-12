
const Controller = require("egg").Controller;

class EssayController extends Controller {
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
	
	async getEssayShow() {
		try {
			let essayShowList = await this.ctx.service.essayService.getEssayShow();
			this.ctx.response.body = essayShowList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getEssayShowByUid() {
		try {
			let id = this.getParam("id");
			let auEssayHotList = await this.ctx.service.essayService.getEssayShowByUid(id);
			this.ctx.response.body = auEssayHotList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}
	async getEssayShowBysta() {
		try {
			
			let statu = this.getParam("statu");
			let auEssayHotList = await this.ctx.service.essayService.getEssayShowBysta(statu);
			this.ctx.response.body = auEssayHotList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getEssayHot() {
		try {
			let essayHotList = await this.ctx.service.essayService.getEssayHot();
			this.ctx.response.body = essayHotList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuNameHeadImg() {
		try {
			let eid = this.getParam("eid");
			let auEssayHotList = await this.ctx.service.essayService.getAuNameHeadImg(eid);
			this.ctx.response.body = auEssayHotList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEssayHot() {
		try {
			let eid = this.getParam("eid");
			let auEssayHotList = await this.ctx.service.essayService.getAuEssayHot(eid);
			this.ctx.response.body = auEssayHotList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuIsFollow() {
		try {
			let eid = this.getParam("eid");
			let auIsFollowList = await this.ctx.service.essayService.getAuIsFollow(eid);
			this.ctx.response.body = auIsFollowList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEssay() {
		try {
			let eid = this.getParam("eid");
			let auEssayList = await this.ctx.service.essayService.getAuEssay(eid);
			this.ctx.response.body = auEssayList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEasyInfo() {
		try {
			let eid = this.getParam("eid");
			let auEasyInfoList = await this.ctx.service.essayService.getAuEasyInfo(eid);
			this.ctx.response.body = auEasyInfoList;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEasyLike() {
		try {
			let essay_id = this.getParam("essay_id");
			let user_id = this.getParam("user_id");
			let auEasyLike = await this.ctx.service.essayService.getAuEasyLike(essay_id, user_id);
			this.ctx.response.body = auEasyLike;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEasyLikeYes() {
		try {
			let essay_id = this.getParam("essay_id");
			let user_id = this.getParam("user_id");
			let auEasyLikeYes = await this.ctx.service.essayService.getAuEasyLikeYes(essay_id,user_id);
			this.ctx.response.body = auEasyLikeYes;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

	async getAuEasyLikeNo() {
		try {
			let essay_id = this.getParam("essay_id");
			let user_id = this.getParam("user_id");
			let auEasyLikeNo = await this.ctx.service.essayService.getAuEasyLikeNo(essay_id,user_id);
			this.ctx.response.body = auEasyLikeNo;
		} catch (e) {
			console.log(e);
			this.ctx.response.body = "异常";
		}
	}

}
module.exports = EssayController;