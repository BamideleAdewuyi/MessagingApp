const { Router } = require("express");
const chatController = require("../controllers/chatController");
const passport = require("../passport/passport");
const chatRouter = Router();

chatRouter.get('/chats', passport.authenticate('jwt', {session: false}), (req, res) => res.json(req.user), chatController.chatsByUserIdGet);

module.exports = chatRouter;