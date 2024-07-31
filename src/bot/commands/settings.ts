import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Guild } from '../../database/models';
import { InfoEmbed } from '../embeds';
import guildCache from '../cache';

const command = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDMPermission(false)
        .addBooleanOption((option) =>
            option
                .setName('track-messages')
                .setRequired(true)
                .setDescription('Set whether messages should be tracked.')
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guild) return;

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            throw new Error('Only administrators can use this command.');
        }

        const trackMessages = interaction.options.getBoolean('track-messages', true);

        await Guild.upsert({ id: interaction.guild.id, trackMessages });
        guildCache.set(interaction.guild.id, { trackMessages: true });

        await interaction.reply({
            embeds: [new InfoEmbed('Settings', `Track Messages: \`${trackMessages}\``)],
            ephemeral: true,
        });
    },
};

export default command;
