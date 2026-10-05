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

async function findChatByUserids({ senderId, recipientId }) {
    const chat = await prisma.chat.findFirst({
        where: {
            userIds: {
                hasEvery: [senderId, recipientId]
            }
        }
    });

    return chat;
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

module.exports = {
    createNewUser,
    findUserByUsername,
    findUserById,
    findChatByUserids,
    findContacts,
}