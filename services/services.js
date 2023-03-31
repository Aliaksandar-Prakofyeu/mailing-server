const {Op} = require('sequelize')
const {Message} = require('../models/models')


async function getMessages(username) {
    const messages = await Message.findAll({
        where: {
            [Op.or]: [{sender: username}, {receiver: username}],
        },
    })
    return messages
}

async function getUsers() {
    const senders = await Message.findAll({
        attributes: ['sender'],
        group: ['sender'],
    })
    const receivers = await Message.findAll({
        attributes: ['receiver'],
        group: ['receiver'],
    })
    const users = [...new Set([...senders.map((s) => s.sender), ...receivers.map((r) => r.receiver)])]
    return users
}

async function getNewMessages(username, date) {
    const messages = await Message.findAll({
        where: {
            [Op.and]: [{date: {[Op.gt]: new Date(date)}}, {[Op.or]: [{sender: username}, {receiver: username}]}],
        },
    })
    return messages
}

async function createMessage(title, body, sender, receiver) {
    const message = await Message.create({
        title,
        body,
        sender,
        receiver,
    })
    return message
}

module.exports = {getMessages, getUsers, getNewMessages, createMessage}