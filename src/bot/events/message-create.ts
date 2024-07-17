import { Events, Message } from 'discord.js';

const event = {
    name: Events.MessageCreate,
    execute(message: Message) {
        if (!message.guild) return;
        console.log(message.guild);
    },
};

export default event;
