const { use } = require("react");
const prisma = require("../lib/prisma.js");

async function createNewUser({ username, password }) {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });
    return user;
}

async function findUserById({ userId }) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    return user;
}

async function findUserByUsername({ username }) {
    const user = await prisma.user.findFirst({
        where: { username: username },
    });
    return user;
}

async function findChatById({ chatId }) {
    const chat = await prisma.chat.findFirst({
        where: { 
            id: chatId 
        },
        include: {
                messages: { orderBy: { postedAt: "desc" }},
            },
    });
    return chat;
}

async function findChatByUserIds({ senderId, recipientId }) {
    const chat = await prisma.chat.findFirst({
        where: {
            userIds: {
                hasEvery: [senderId, recipientId]
            }
        }
    });

    return chat;
}

async function findChatsByUserId({ senderId }) {
    const chats = await prisma.chat.findMany({
        where: {
            userIds: {
                has: senderId,
            }
        },
        include: {
                messages: { orderBy: { postedAt: "desc" }},
            },
    });
    return chats;
}

async function findContacts({ userId }) {
    const contacts = await prisma.user.findMany({
        where: {
            id: {
                not: userId
            }
        }
    });

    return contacts;
}

async function createNewMessage({ message, authorId, chatId }) {
    const newMessage = await prisma.message.create({
        data: {
            message: message,
            authorId: authorId,
            postedAt: new Date(),
            chatId: chatId,
        }
    });
    return newMessage;
}

async function createNewChat({ senderId, recipientId }) {
    const newChat = await prisma.chat.create({
        data: {
            userIds: [senderId, recipientId]
        }
    });
    return newChat;
}

async function findRecipientByChatId({ chatId, userId }) {
    const chat = await findChatById({ chatId });
    const recipientId = Number(chat.userIds.find(id => id !== userId));
    const recipient = await findUserById({ userId: recipientId });
    return recipient;
}

module.exports = {
    createNewUser,
    findUserByUsername,
    findUserById,
    findChatById,
    findChatByUserIds,
    findChatsByUserId,
    findRecipientByChatId,
    findContacts,
    createNewMessage,
    createNewChat,
}