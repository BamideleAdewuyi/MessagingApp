const { Router } = require("express");
const messageController = require("../controllers/messageController");
const passport = require("passport");
const messageRouter = Router();

messageRouter.post("/newMessage", passport.authenticate('jwt', {session: false}), messageController.newMessagePost);

module.exports = messageRouter;