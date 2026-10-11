const { Router } = require("express");
const messageController = require("../controllers/messageController");
const passport = require("passport");
const messageRouter = Router();

messageRouter.get("/message/:messageId", passport.authenticate('jwt', {session: false}), messageController.messageByIdGet);

messageRouter.post("/newMessage", passport.authenticate('jwt', {session: false}), messageController.newMessagePost);

module.exports = messageRouter;