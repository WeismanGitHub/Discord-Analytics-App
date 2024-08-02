import { Guild, Message as MessageModel } from '../../database/models';
import { Events, Message } from 'discord.js';
import guildCache from '../cache';

type GuildCache = {
    trackMessages: boolean;
};

const event = {
    name: Events.MessageCreate,
    async execute(message: Message) {
        if (!message.guild) return;

        let cacheValue: GuildCache | undefined = guildCache.get(message.guild.id);

        if (cacheValue == undefined) {
            const guild = await Guild.findOne({ where: { id: message.guild.id } });

            guildCache.set(message.guild.id, { trackMessages: guild ? guild.trackMessages : false });
            cacheValue = { trackMessages: guild ? guild.trackMessages : false };
        }

        if (!cacheValue) return;

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
