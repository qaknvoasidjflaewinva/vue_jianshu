//router.js
module.exports = (app) => {
  const { router, controller } = app;
  //http://localhost:7001/getStr.do
  // router.get("/getAllUser.do", controller.testController.getAllUser);
  router.post("/getall.do", controller.userController.getAll);
  router.post("/updateimg.do", controller.userController.updateImg);
  router.post("/updatainfo.do", controller.userController.updatainfo);
  router.post("/updatainfo2.do", controller.userController.updatainfo2);
  router.post("/deleteuser.do", controller.userController.deleteuser);
  router.post("/selectinfo.do", controller.userController.selectinfo);

  // 登录接口
  router.post("/login", controller.login.login);
  router.get("/checkLogin", controller.login.checkLogin);
  router.get("/LoginOut.do", controller.login.LoginOut);
  // 注册接口
  router.post("/register", controller.login.register);


  // =======
  router.get("/getAuthor", controller.getAuthorController.getAuthor);
  router.get("/getCurrentUser", controller.getAuthorController.getCurrentUser);
  router.get("/follow", controller.getAuthorController.follow);
  router.get("/followOff", controller.getAuthorController.followOff);
  router.get("/getFollowStatus", controller.getAuthorController.getFollowStatus);
  router.get("/getEssayShow.do", controller.essayController.getEssayShow);
  router.get("/getEssayShowByUid", controller.essayController.getEssayShowByUid);
  router.get("/getEssayShowBysta", controller.essayController.getEssayShowBysta);
  router.get("/getEssayHot.do", controller.essayController.getEssayHot);
  router.get("/getAuEssayHot.do", controller.essayController.getAuEssayHot);
  router.get("/getAuIsFollow.do", controller.essayController.getAuIsFollow);
  router.get("/getAuEssay.do", controller.essayController.getAuEssay);
  router.get("/getAuEasyInfo.do", controller.essayController.getAuEasyInfo);
  router.get("/getAuNameHeadImg.do", controller.essayController.getAuNameHeadImg);
  router.get("/getAuEasyLike.do", controller.essayController.getAuEasyLike);
  router.get("/getAuEasyLikeYes.do", controller.essayController.getAuEasyLikeYes);
  router.get("/getAuEasyLikeNo.do", controller.essayController.getAuEasyLikeNo);


  router.post('/addWrite.do', controller.testController.addWrite)

  //文章图片
  router.post("/upOneFile.do", controller.uploadImg.upOneFile);
  router.get("/getEssay.do", controller.testController.getEssay);
  router.get("/getEssayo.do", controller.testController.getEssayo);
  router.post('/updateWrite.do', controller.testController.updateWrite);
  router.get('/deleteWrite.do', controller.testController.deleteWrite);
  router.get('/releaseWrite.do', controller.testController.releaseWrite);


};