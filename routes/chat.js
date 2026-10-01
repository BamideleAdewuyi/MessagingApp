const { Router } = require("express");
const chatController = require("../controllers/chatController");
const passport = require("passport");
const chatRouter = Router();

chatRouter.get('/chats', passport.authenticate('jwt', {session: false}), chatController.chatsByUserIdGet);

module.exports = chatRouter;