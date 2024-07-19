import { Guild, Message as MessageModel } from '../../database/models';
import { Events, Message } from 'discord.js';
import guildCache from '../cache';

const event = {
    name: Events.MessageCreate,
    async execute(message: Message) {
        if (!message.guild) return;

        let value: boolean | undefined = guildCache.get(message.guild.id);

        if (value === undefined) {
            const guild = await Guild.findOne({ where: { id: message.guild.id } });

            guildCache.set(message.guild.id, Boolean(guild));
            value = Boolean(guild);
        }

        if (!value) return;

        await MessageModel.create({
            id: message.id,
            userId: message.author.id,
            channelId: message.channelId,
            guildId: message.guild.id,
            bot: message.author.bot,
            textLength: message.content.length,
            createdAt: message.createdAt,
        });
    },
};

export default event;
