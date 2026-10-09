const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const validateChat = require("../validators/chatValidator");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

async function chatsByUserIdGet(req, res) {
    const senderId = Number(req.user.id);
    const chats = await db.findChatsByUserId({ senderId });
    res.json({ chats: chats });
}

async function contactsGet(req, res) {
    const userId = Number(req.user.id);
    const contacts = await db.findContacts({ userId });
    res.json({ contacts: contacts });
}

async function checkChatExistsGet(req, res) {
    const senderId = Number(req.user.id);
    const recipientId = Number(req.params.recipientId);
    const chat = await db.findChatByUserIds({ senderId, recipientId });
    res.json({ chat: chat });
}

const newChatPost = [
    validateChat,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          })
        }
        
        const { recipientId } = matchedData(req);
        const cleanRecipientId = Number(recipientId);
        const senderId = Number(req.user.id);
        const newChat = await db.createNewChat({ senderId, recipientId: cleanRecipientId });
        return res.status(201).json({
          msg: "Chat created",
          newChat: newChat,
        })
    })
]

async function recipientByChatIdGet(req, res) {
  const userId = req.user.id;
  const chatId = req.params.chatId;
  const recipient = db.findRecipientByChatId({ chatId, userId });
  res.json({ recipient: recipient });
}

module.exports = {
    chatsByUserIdGet,
    contactsGet,
    checkChatExistsGet,
    newChatPost,
    recipientByChatIdGet,
}