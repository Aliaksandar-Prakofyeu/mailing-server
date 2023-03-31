const { getMessages } = require('../services/services')
const { Action } = require('./Action')

class SetName extends Action {
    async call(user, ws, params){
        if (user.name ?? false) {
            ws.send();
            return;
        }
        const data = params.trim();
        if (data.length < 1 || data.length > 50) {
            ws.send(data.length < 1 ? JSON.stringify({
                result: 'error',
                data: `Username is too short`,
            }) : JSON.stringify({
                result: 'error',
                data: `Username is longer than 50 symbols`,
            }));
            return;
        }

        user.name = data;
        const result = { ...{
                result: 'success',
                data: undefined,
            }};
        const rows = await getMessages(user.name);
        result.data = rows;
        ws.send(JSON.stringify(result));
    }
}

module.exports = { SetName }