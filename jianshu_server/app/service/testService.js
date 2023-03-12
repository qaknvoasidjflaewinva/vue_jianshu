const Service = require('egg').Service;

class TestService extends Service {
    async getEssay(id) {
        const sql = 'select * from essay where author_id=? order by update_time desc';
        let stuList = await this.ctx.app.mysql.query(sql, [id]);
        return stuList;
    }
    async getEssayo(id) {
        const sql = 'select * from essay where eid=?';
        let stuList = await this.ctx.app.mysql.query(sql, [id]);
        return stuList;
    }
    async addWrite(author_id, update_time) {
        const sql = 'insert into essay(author_id,update_time) VALUES(?,?)'
        let list = await this.ctx.app.mysql.query(sql, [author_id, update_time]);
        return list;
    }
    async updateWrite(eid, title, content, update_time, word_num) {
        const sql = 'UPDATE essay set title=?,content=?,update_time=?,word_num=? where eid=?'
        let list = await this.ctx.app.mysql.query(sql, [title, content, update_time, word_num, eid]);
        return list;
    }
    async deleteWrite(eid) {
        const sql = 'delete from essay where eid=?'
        let list = await this.ctx.app.mysql.query(sql, [eid]);
        return list;
    }

    async releaseWrite(status, isPublish, eid) {
        const sql = 'UPDATE essay set isPublish=?,status=? where eid=?'
        let list = await this.ctx.app.mysql.query(sql, [status, isPublish, eid]);
        return list;
    }

}

module.exports = TestService;