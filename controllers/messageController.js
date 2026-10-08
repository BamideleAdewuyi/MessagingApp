const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const validateMessage = require("../validators/messageValidator");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

const newMessagePost = [
    validateMessage,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          })
        }
        
        const { message, chatId } = matchedData(req);
        const authorId = Number(req.user.id);
        const cleanChatId = Number(chatId);
        const newMessage = await db.createNewMessage({ authorId, message, chatId: cleanChatId });
        return res.status(201).json({
          msg: "Message created",
          newMessage: newMessage,
        })
    })
]

module.exports = {
    newMessagePost,
}