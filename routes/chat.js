const { Router } = require("express");
const chatController = require("../controllers/chatController");
const passport = require("passport");
const chatRouter = Router();

chatRouter.get('/chats', passport.authenticate('jwt', {session: false}), chatController.chatsByUserIdGet);
chatRouter.get('/contacts', passport.authenticate('jwt', {session: false}), chatController.contactsGet);
chatRouter.get('/checkChat', passport.authenticate('jwt', {session: false}), chatController.checkChatExistsGet);

module.exports = chatRouter;