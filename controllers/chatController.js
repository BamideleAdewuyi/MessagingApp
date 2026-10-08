const db = require("../db/queries");
const validateChat = require("../validators/chatValidator");

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

async function chatsByUserIdGet(req, res) {
    const userId = Number(req.user.id);
    const user = await db.findUserById({ userId });
    const chats = user.chats;
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
    const chat = await db.findChatByUserids({ senderId, recipientId });
    res.json({ chat: chat });
}

module.exports = {
    chatsByUserIdGet,
    contactsGet,
    checkChatExistsGet,
}