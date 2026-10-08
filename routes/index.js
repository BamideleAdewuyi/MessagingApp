const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const chatRouter = require("./chat");
const messageRouter = require("./message");

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", chatRouter);
router.use("/", messageRouter);

module.exports = router;