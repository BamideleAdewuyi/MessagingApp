const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/", userRouter);
router.use("/", authRouter);

module.exports = router;