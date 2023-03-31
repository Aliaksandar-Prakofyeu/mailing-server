class Action {

    constructor(name) {
        Action.Actions[name] = this
    }

    static async Init() {
        try {
            const SetName = (await import('./SetName.js')).SetName;
            new SetName('setName');

            const GetUsers = (await import('./GetUsers.js')).GetUsers;
            new GetUsers('getUsers');

            const SendMessage = (await import('./SendMessage.js')).SendMessage;
            new SendMessage('sendMessage');

            const GetMessages = (await import('./GetMessages.js')).GetMessages;
            new GetMessages('getMessages');
        } catch (error) {
            console.error(error);
        }
    }
}

Action.Actions = {};

module.exports = {Action};