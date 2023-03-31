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
                data: `Recipient name must be less than 50 symbols`,
            }))
            return
        }

        if (!title || title.length > 150) {
            ws.send(JSON.stringify({
                result: 'error',
                data: `Title is missing or longer than 150 symbols`,
            }))
            return
        }

        if (!body || body.length > 2500) {
            ws.send(JSON.stringify({
                result: 'error',
                data: `Message is missing or longer than 2500 symbols`,
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