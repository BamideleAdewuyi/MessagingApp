const { body } = require("express-validator");
const db = require("../db/queries");

const messageBlankErr = "cannot be blank";
const lengthErr = "cannot be more than 6000 characters";
const recipientErr = "Must have recipient";
const invalidChatErr = "Invalid chat"

const validateMessage = [
    body("text").trim()
        .isLength({ min: 1 }).withMessage(`Message ${messageBlankErr}`)
        .isLength({ max: 6000 }).withMessage(`Message ${lengthErr}`),
    body("chatId").trim()
        .isLength({ min: 1 }).withMessage(recipientErr)
        .custom(async (value) => {
                            const chatId = Number(value);
                            const recipient = await db.findChatById({ chatId });
                            if (!recipient) {
                                throw new Error(invalidChatErr);
                            }
                        }),
];

module.exports = validateMessage;