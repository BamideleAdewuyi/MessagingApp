const db = require("../db/queries");

async function chatsByUserIdGet(req, res) {
    const userId = Number(req.user.id);
    const user = await db.findUserById({ userId });
    const chats = user.chats;
    res.json({ chats: chats });
}

module.exports = {
    chatsByUserIdGet,
}