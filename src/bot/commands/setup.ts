import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Guild } from '../../database/models';
import { InfoEmbed } from '../embeds';
import guildCache from '../cache';

const command = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Start tracking data.')
        .setDMPermission(false),
    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) return;

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            throw new Error('Only administrators can use this command.');
        }

        await Guild.upsert({ id: interaction.guild.id });
        guildCache.set(interaction.guild.id, true);

        await interaction.reply({
            embeds: [new InfoEmbed('Bot has been set up!', 'Data will now be tracked.')],
            ephemeral: true,
        });
    },
};

export default command;
