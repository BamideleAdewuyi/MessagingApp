const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const validateUser = require("../validators/userValidator");
const bcrypt = require("bcryptjs");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
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
    newUserPost,
}