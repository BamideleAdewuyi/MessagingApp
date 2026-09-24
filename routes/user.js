const { Router } = require("express");
const userController = require("../controllers/userController")
const userRouter = Router();

userRouter.get('/user/:userId', userController.userGet);
userRouter.post('/user/new', userController.newUserPost);

module.exports = userRouter;