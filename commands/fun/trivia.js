require('dotenv').config
const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quiz')
        .setDescription(`Play a quiz!`)
        .addUserOption(option =>
            option
            	.setName('category')
                .setDescription('Select a category for the quiz!')
                .setRequired(true)
        ),
    async execute(interaction) {
        const category = interaction.options.getString('category')
        const response = await axios.get(``);
    }
}
