const db = require("../db/queries");

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

async function chatByChatIdGet(req, res) {
  const chatId = Number(req.params.chatId);
  const userId = Number(req.user.id);
  const chat = await db.findChatById({ chatId });
  if (chat.userIds.includes(userId)) {
    res.json({ chat: chat });
  } else {
    res.status(403).json({ msg: "Not authorised" });
  }
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

async function newChatPost(req, res) {
  const senderId = Number(req.user.id);
  const recipientId = Number(req.body.recipientId);
  const newChat = await db.createNewChat({ senderId, recipientId });
  return res.status(201).json({
    msg: "Chat created",
    newChat: newChat,
  });
}

async function recipientByChatIdGet(req, res) {
  const userId = Number(req.user.id);
  const chatId = Number(req.params.chatId);
  const recipient = await db.findRecipientByChatId({ chatId, userId });
  res.json({ recipient: recipient });
}

module.exports = {
    chatsByUserIdGet,
    contactsGet,
    checkChatExistsGet,
    chatByChatIdGet,
    newChatPost,
    recipientByChatIdGet,
};