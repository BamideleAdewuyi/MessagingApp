const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const chatRouter = require("./chat");

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", chatRouter);

module.exports = router;