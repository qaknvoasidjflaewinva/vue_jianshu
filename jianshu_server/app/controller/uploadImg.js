const Controller = require("egg").Controller;

class uploadImg extends Controller {
    async upOneFile() {
        try {
            const files = this.ctx.request.files;
            let url = await this.ctx.service.uploadImg.upOneFile(files);
            this.ctx.response.body = {
                "errno": 0, // 注意：值是数字，不能是字符串
                "data": {
                    url // 图片 src ，必须
                }
            }
        } catch (e) {
            this.ctx.response.body = {
                "errno": 1, // 只要不等于 0 就行
                "message": e
            };
        }
    }
}
module.exports = uploadImg;
