import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { InfoEmbed } from '../embeds';

const command = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get information about this bot and how it works.'),
    async execute(interaction: CommandInteraction) {
        const embed = new InfoEmbed('Analytics Bot');

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};

export default command;
