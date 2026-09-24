const prisma = require("../lib/prisma.js");

async function createNewUser({ username, password }) {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            admin: false,
        }
    });
    return user;
}

async function findUserByUsername({ username }) {
    const user = await prisma.user.findFirst({
        where: { username: username },
    });
    return user;
}

module.exports = {
    createNewUser,
    findUserByUsername,
}