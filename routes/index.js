const { Router } = require("express");
const router = Router();
const userRouter = require("./user");

router.use("/", userRouter);

module.exports = router;