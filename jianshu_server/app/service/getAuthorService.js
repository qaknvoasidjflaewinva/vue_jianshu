const Service = require('egg').Service;

class GetAuthorService extends Service {
    async getAuthor(key) {
        // const sql = 'select uid, user_name, head_img_url, sum(like_num) as like_num, sum(word_num) as word_num,follow.status,follower_id as follow from user,essay,follow where user.uid = essay.author_id and follow.user_id = user.uid group by author_id and follower_id = 4';
        // const sql = 'select follow.status as follow, uid, user_name, head_img_url, user_id, follower_id, sum(like_num) as likeN, sum(word_num) as word_num from follow, user,essay where user.uid = follow.user_id and essay.author_id = uid and follow.status = 0 group by author_id limit 5';
        // const sql = 'select follow.status as follow, uid, user_name, head_img_url, sum(like_num) as likeN, sum(word_num) as word from user, essay,follow where user.uid = author_id and uid = follow.user_id and  uid <> 4 group by uid'

        // const sql = 'select uid, user_name, head_img_url, sum(like_num) as likeN, sum(word_num) as word from user, essay where user.uid = author_id and  uid <> 4 group by uid';
        console.log('id:' + key);
        const sql = 'select uid, introduction, user_name, head_img_url, sum(like_num) as likeN, sum(word_num) as word from user, essay where uid = author_id and uid <> ? and uid not in (select user_id from follow where follower_id = ?) group by uid'
        let authorList = await this.ctx.app.mysql.query(sql, [key, key]);
        // console.log(authorList);
        return authorList;
    }


    async getCurrentUser(key) {
        const sql = 'select uid, introduction, user_name,head_img_url,follow_num,fan_num, count(essay.author_id) as essay_num, sum(like_num) as like_num, sum(word_num) as word_num from user,essay where user.uid = essay.author_id and user.uid = ?';
        let userinfo = await this.ctx.app.mysql.query(sql, [key]);
        // console.log(authorList);
        return userinfo;
    }

    async follow(status, follower, user) {
        // let sql = 'update follow set status = ? where follower_id = ? and user_id = ?';
        let sql = 'insert into follow(user_id, follower_id, status) values(?,?,?)'
        let updateStatus = await this.ctx.app.mysql.query(sql, [user, follower, status]);
        // console.log(updateStatus)
        return updateStatus;
    }

    async followOff(follower, user) {
        let sql = 'delete from follow where follower_id = ? and user_id = ?'
        let followOff = await this.ctx.app.mysql.query(sql, [follower, user]);
        return followOff;
    }

    async getFollowStatus(follower, user) {
        let sql = 'select user_id, follower_id, status from follow where follower_id = ? and user_id = ?'
        let getFollowStatus = await this.ctx.app.mysql.query(sql, [follower, user]);
        if (getFollowStatus == null) {
            return 11
        } else {
            return getFollowStatus
        }
    }
}

module.exports = GetAuthorService;