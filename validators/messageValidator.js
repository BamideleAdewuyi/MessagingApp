const { body } = require("express-validator");
const db = require("../db/queries");

const messageBlankErr = "cannot be blank";
const lengthErr = "cannot be more than 6000 characters";
const recipientErr = "Must have recipient";
const invalidRecipientErr = "Invalid recipient"

const validateMessage = [
    body("text").trim()
        .isLength({ min: 1 }).withMessage(`Message ${messageBlankErr}`)
        .isLength({ max: 6000 }).withMessage(`Message ${lengthErr}`),
    body("recipientId").trim()
        .isLength({ min: 1 }).withMessage(recipientErr)
        .custom(async (value) => {
                            const recipientId = Number(value);
                            const recipient = await db.findUserById({ userId: recipientId });
                            if (!recipient) {
                                throw new Error(invalidRecipientErr);
                            }
                        }),
];

module.exports = validateMessage;