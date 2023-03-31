const {createMessage} = require('../services/services')
const {Action} = require('./Action')

class SendMessage extends Action {
    async call(user, ws, params) {
        if (!user.name) {
            ws.send('Not authorized')
            return
        }

        const {title, body, receiver} = params

        if (!receiver || receiver.length > 50) {
            ws.send(JSON.stringify({
                result: 'error',
                data: `Invalid receiver name`,
            }))
            return
        }

        if (!title || title.length > 150) {
            ws.send(JSON.stringify({
                result: 'error',
                data: `Title is missing or too long`,
            }))
            return
        }

        if (!body || body.length > 2500) {
            ws.send(JSON.stringify({
                result: 'error',
                data: `Message is missing or too long`,
            }))
            return
        }

        await createMessage(title.trim(), body.trim(), user.name, receiver.trim())
        ws.send(JSON.stringify({
            result: 'messageSent'
        }))
    }
}

module.exports = {SendMessage}