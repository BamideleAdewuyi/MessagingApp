const { body } = require("express-validator");
const db = require("../db/queries");

const chatExistsErr = "Chat already exists";

const validateChat = [
    body("recipientId").trim()
        .custom(async (value, meta) => {
                            const userId = Number(meta.req.user.id);
                            const chat = await db.findChatByUserids({ senderId: Number(userId), recipientId: Number(value)})
                            if (chat) {
                                throw new Error(chatExistsErr);
                            }
                        }),
];

module.exports = validateChat;