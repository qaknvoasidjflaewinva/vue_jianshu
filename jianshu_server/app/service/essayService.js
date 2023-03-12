const Service = require('egg').Service;

class EssayService extends Service {
    async getEssayShow() {
        const sql = 'select user.uid,user.user_name,essay.eid,essay.title,essay.content,essay.author_id,essay.comment_num,essay.like_num,essay.isPublish from essay left join user on user.uid=essay.author_id where essay.isPublish = 1';
        // const sql = 'select user.uid,user.user_name,essay.eid,essay.title,essay.content,essay.author_id,essay.comment_num,essay.like_num from essay left join user on user.uid=essay.author_id';
        let essayShowList = await this.ctx.app.mysql.query(sql);
        return essayShowList;
    }

    async getEssayShowByUid(id) {
        const sql = 'select user.uid,user.user_name,essay.eid,essay.title,essay.content,essay.author_id,essay.comment_num,essay.like_num from essay,user where user.uid=essay.author_id and uid = ?';
        let essayShowListByUid = await this.ctx.app.mysql.query(sql, id);
        return essayShowListByUid;
    }
    async getEssayShowBysta(statu){
        const sql = 'select user.uid,user.user_name,essay.eid,essay.title,essay.content,essay.author_id,essay.comment_num,essay.like_num from essay left join user on user.uid=essay.author_id where essay.isPublish = 1 and essay.status = ?' ;
        let essayShowListByUid = await this.ctx.app.mysql.query(sql, [statu]);
        return essayShowListByUid;
    }

    async getEssayHot() {
        const sql = 'select essay.eid,essay.title,essay.like_num from essay where essay.isPublish = 1 ORDER BY essay.like_num DESC LIMIT 5';
        let essayHotList = await this.ctx.app.mysql.query(sql);
        return essayHotList;
    }
    async getAuNameHeadImg(eid) {
        // const sql = 'SELECT eid,title,like_num FROM essay WHERE author_id=(SELECT author_id FROM essay WHERE eid=?) ORDER BY like_num DESC LIMIT 3';
        const sql = 'SELECT user.uid,user.user_name,user.head_img_url FROM essay,user WHERE essay.author_id = user.uid and essay.eid=?';
        let auNameHeadImgList = await this.ctx.app.mysql.query(sql, eid);
        return auNameHeadImgList;
    }

    async getAuEssayHot(eid) {
        const sql = 'SELECT eid,title,like_num FROM essay WHERE author_id=(SELECT author_id FROM essay WHERE eid=?) ORDER BY like_num DESC LIMIT 3';
        // const sql = 'SELECT user.user_name, user.head_img_url, eid,title,like_num FROM essay ,user WHERE essay.author_id = user.uid and author_id=(SELECT author_id FROM essay WHERE eid=?)';
        let auEssayHotList = await this.ctx.app.mysql.query(sql, eid);
        return auEssayHotList;
    }

    // 还没写关注
    async getAuIsFollow(eid) {
        const sql = 'SELECT eid,title,like_num FROM essay WHERE author_id=(SELECT author_id FROM essay WHERE eid=2) ORDER BY like_num DESC LIMIT 3';
        let auIsFollowList = await this.ctx.app.mysql.query(sql, eid);
        return auIsFollowList;
    }

    async getAuEssay(eid) {
        const sql = 'SELECT * from essay where eid=?';
        let auEssayList = await this.ctx.app.mysql.query(sql, eid);
        return auEssayList;
    }

    async getAuEasyInfo(eid) {
        const sql = 'select uid,introduction, user_name,head_img_url,fan_num, sum(like_num) as like_num, sum(word_num) as word_num from user,essay where user.uid = essay.author_id and essay.author_id=(SELECT author_id FROM essay WHERE eid=?) GROUP BY uid';
        let auEasyInfoList = await this.ctx.app.mysql.query(sql, eid);
        return auEasyInfoList;
    }
    // 首次渲染或每次挂载时判断用户是否给文章点赞
    async getAuEasyLike(essay_id, user_id) {
        const sql = 'SELECT essay_id,user_id FROM like_essay WHERE essay_id=? AND user_id=?';
        let auEasyLikeList = await this.ctx.app.mysql.query(sql, [essay_id, user_id]);
        // console.log(auEasyLikeList.length);
        if (auEasyLikeList.length) {
            return {
                likeState: true
            }
        } else {
            return {
                likeState: false
            }
        }
    }

    async getAuEasyLikeYes(essay_id, user_id) {
        const sql = 'INSERT INTO like_essay (essay_id,user_id) VALUES(?,?)';
        let auEasyInfoList = await this.ctx.app.mysql.query(sql, [essay_id, user_id]);
        let eid = essay_id;
        const likeSql = 'UPDATE essay SET like_num = like_num+1 WHERE eid =?';
        let likesNum = await this.ctx.app.mysql.query(likeSql, eid);
        return { likesNum };
    }

    async getAuEasyLikeNo(essay_id, user_id) {
        const sql = 'DELETE FROM like_essay WHERE essay_id=? AND user_id=?';
        let auEasyInfoList = await this.ctx.app.mysql.query(sql, [essay_id, user_id]);
        let eid = essay_id;
        const likeSql = 'UPDATE essay SET like_num = like_num-1 WHERE eid =?';
        let likesNum = await this.ctx.app.mysql.query(likeSql, eid);
        return { likesNum };
    }
}

module.exports = EssayService;