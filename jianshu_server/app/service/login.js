const Service = require('egg').Service;

class User extends Service {
    async login(tel_num, password) {
        const sql = "select * from user where tel_num=?";
        let list = await this.ctx.app.mysql.query(sql, tel_num);
        if (list.length == 0) {
            return {
                code: 0,
                msg: "该用户不存在"
            }
        } else {
            if (list[0].password != password) {
                return {
                    code: 1,
                    msg: "密码错误"
                }
            } else {
                return {
                    code: 2,
                    msg: "登录成功",
                    uid: list[0].uid,
                    tel_num: list[0].tel_num
                }
            }
        }
    }

    async register(user_name, tel_num, password) {
        if (user_name && tel_num && password) {
            const sql = "SELECT * FROM user WHERE tel_num=?";
            let list = await this.ctx.app.mysql.query(sql, tel_num);
            if (list.length == 0) {
                const insql = "insert into user(user_name,tel_num,password) values(?,?,?)";
                let registerList = await this.ctx.app.mysql.query(insql, [user_name, tel_num, password]);
                const sesql = "SELECT * FROM user WHERE tel_num=?";
                let loginResult = await this.ctx.app.mysql.query(sesql, tel_num);
                console.log(loginResult);
                console.log(registerList);
                console.log(loginResult[0].uid);
                console.log(loginResult[0].tel_num);
                if (registerList.affectedRows) {
                    return {
                        code: 0,
                        msg: "注册成功",
                        uid: loginResult[0].uid,
                        user_name: loginResult[0].user_name,
                        tel_num: loginResult[0].tel_num,
                    }
                }

            } else {
                return {
                    code: 1,
                    msg: "注册失败，用户已存在！"
                }
            }
        } else {
            return {
                code: 2,
                msg: "注册失败，姓名，邮箱和密码都不能为空！"
            }
        }
    }
    async getPositionInfoByKey(key) {
        const sql = 'select user.uid,user.user_name,essay.eid,essay.title,essay.content,essay.author_id,essay.comment_num,essay.like_num from essay left join user on user.uid=essay.author_id where essay.title like ? or essay.content like ? ';
        let list = await this.ctx.app.mysql.query(sql, [`%${key}%`, `%${key}%`]);
        return list;
    }
}
module.exports = User;