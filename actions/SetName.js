const { getMessages } = require('../services/services')
const { Action } = require('./Action')

class SetName extends Action {
    async call(user, ws, params){
        if (user.name ?? false) {
            ws.send();
            return;
        }
        const data = params.trim();
        if (data.length < 1 || data.length > 22) {
            ws.send(data.length < 1 ? JSON.stringify({
                result: 'error',
                data: `${data} is too short`,
            }) : JSON.stringify({
                result: 'error',
                data: `${data} is too short`,
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