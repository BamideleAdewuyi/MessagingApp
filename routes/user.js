const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userRouter = Router();

userRouter.get('/searchUsername/:username', passport.authenticate('jwt', {session: false}), userController.userByUserNameGet);
userRouter.get('/user/:userId', passport.authenticate('jwt', {session: false}), userController.userGet);

userRouter.post('/user/new', userController.newUserPost);

module.exports = userRouter;