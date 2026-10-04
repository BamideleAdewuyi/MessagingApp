const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const validateUser = require("../validators/userValidator");
const bcrypt = require("bcryptjs");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

async function userGet(req, res) {
    const userId = Number(req.params.userId);
    const user = await db.findUserById({ userId });
    res.json({ user: user });
}

async function userByUserNameGet(req, res) {
  const username = req.body.username;
  const user = await db.findUserByUsername({ username });
  res.json({ user: user });
}

const newUserPost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    
    const { username, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.createNewUser({ username, password: hashedPassword });
    return res.status(201).json({
      msg: "User created successfully"
    })
  })
]

module.exports = {
    userGet,
    userByUserNameGet,
    newUserPost,
}