const {getUsers} = require('../services/services')
const {Action} = require('./Action')

class GetUsers extends Action {
    async call(user, ws, params) {
        const data = await getUsers()
        ws.send(JSON.stringify({
            result: 'userList',
            data: data
        }))
    }

}

module.exports = {GetUsers}