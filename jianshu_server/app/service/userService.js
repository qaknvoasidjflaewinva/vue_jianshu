const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");
class userService extends Service {
	async getAll(userid) {
		const sql = "select * from user where uid=?";
		let list = await this.ctx.app.mysql.query(sql, [userid]);
		return list;
	}
	async updateimg(files, userid) {
		let url = null;
		if (files.length == 1) {//有文件上传
			let file = files[0];
			const toFileName = '/public/headimg/' + Date.now() + file.filename;
			let to = path.dirname(__dirname) + toFileName;
			await fs.copyFileSync(file.filepath, to);
			await fs.unlinkSync(file.filepath);//文件上传结束
			url = "http://localhost:7001" + toFileName;
			let sql = "update user set head_img_url=? where uid=?"
			let res = await this.ctx.app.mysql.query(sql, [url, userid])
			return res.affectedRows;
		}

	}
	async updatainfo(username, userid) {
		let sql = "update user set user_name=? where uid=?"
		let res = await this.ctx.app.mysql.query(sql, [username, userid])
		return res.affectedRows;
	}
	async updatainfo2(password, gender, introduction, userid) {
		if (password == null) {//没有密码上传,不需要修改密码
			let sql = "update user set sex=?,introduction=? where uid=?"
			let res = await this.ctx.app.mysql.query(sql, [gender, introduction, userid])
			return res.affectedRows;
		} else {
			let sql = "update user set password=?,sex=?,introduction=? where uid=?"
			let res = await this.ctx.app.mysql.query(sql, [password, gender, introduction, userid])
			return res.affectedRows;
		}
	}

	async deleteuser(userid) {
		const sql = "delete from user where uid=?";
		let r = await this.ctx.app.mysql.query(sql, [userid]);
		return r.affectedRows;
	}

	async selectinfo(userid) {
		const sql = "select * from user inner join follow on uid = user_id where follower_id =?";
		let list= await this.ctx.app.mysql.query(sql,[userid]);
		return list;
	}
}
module.exports = userService;