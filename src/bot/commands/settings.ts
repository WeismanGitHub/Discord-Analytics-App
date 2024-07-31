import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Guild } from '../../database/models';
import { InfoEmbed } from '../embeds';
import guildCache from '../cache';

const command = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Modify the server settings.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addBooleanOption((option) =>
            option
                .setName('track-messages')
                .setRequired(true)
                .setDescription('Set whether messages should be tracked.')
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guild) return;

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
