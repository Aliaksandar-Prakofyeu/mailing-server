const { getMessages } = require('../services/services');
const { Action } = require('./Action');

class GetMessages extends Action {
    async call(user, ws, params) {
        if (user.name === undefined) {
            ws.send(JSON.stringify({result: 'error', data: 'Unauthorized',}))
            return;
        }
        const rows = await getMessages(user.name);
            ws.send(JSON.stringify({
                result: 'messages',
                data: rows,
            }));
    }
}

module.exports = { GetMessages };