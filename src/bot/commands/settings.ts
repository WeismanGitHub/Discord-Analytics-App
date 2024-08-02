import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Guild } from '../../database/models';
import { InfoEmbed } from '../embeds';
import guildCache from '../cache';

const command = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Modify or view the server settings.')
        .setDMPermission(false)
        .addBooleanOption((option) =>
            option
                .setName('track-messages')
                .setRequired(false)
                .setDescription('Set whether messages should be tracked.')
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guild) return;

        const trackMessages = interaction.options.getBoolean('track-messages');
        const changes = trackMessages !== null;

        if (changes) {
            if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
                throw new Error('Only administrators can change the settings.');
            }

            await Guild.upsert({ id: interaction.guild.id, trackMessages });
            guildCache.set(interaction.guild.id, { trackMessages });

            return await interaction.reply({
                embeds: [new InfoEmbed('Settings', `Track Messages: \`${trackMessages}\``)],
                ephemeral: true,
            });
        }

        const guild = await Guild.findOne({ where: { id: interaction.guild.id } });

        if (!guild) {
            throw new Error("This server hasn't been set up yet.");
        }

        await interaction.reply({
            embeds: [new InfoEmbed('Settings', `Track Messages: \`${guild.trackMessages}\``)],
            ephemeral: true,
        });
    },
};

export default command;
