const {Action} = require('../actions/Action')
const expressWs = require('express-ws')

function startWsServer(app) {
    expressWs(app)
    console.log(`Websocket server listening`)

    app.ws('/websocket', (ws, req) => {
        const user = {
            name: undefined
        }

        ws.on('error', console.error)

        ws.on('message', (rawReq) => {
            const req = JSON.parse(rawReq.toString())
            const action = req.action

            console.log(`USER ${user.name} REQUESTED ${action}(${JSON.stringify(req.data)})`)

            if (action === undefined) {
                ws.send('No action specified')
                return
            }
            if (Action.Actions[action] === undefined) {
                ws.send('Unknown action')
                return
            }

            Action.Actions[action].call(user, ws, req.data)
        })
    })
}

module.exports = {startWsServer}