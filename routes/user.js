const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userRouter = Router();

userRouter.post('/user/new', userController.newUserPost);

module.exports = userRouter;