const fService = require("egg").Service;
const path = require("path");
const fs = require("fs");

class uploadImg extends fService {
    async upOneFile(files) {
        let file = files[0];
        //在项目的public下创建upload目录
        const toFileName = '/public/img/' + Date.now() + file.filename;
        let to = path.dirname(__dirname) + toFileName;

        await fs.copyFileSync(file.filepath, to);

        await fs.unlinkSync(file.filepath); //文件上传结束
        //上传的文件的网络访问路
        const headurl = "http://localhost:7001" + toFileName;
        return headurl;
    }
}
module.exports = uploadImg;
