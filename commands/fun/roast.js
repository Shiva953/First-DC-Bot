const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios');

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('roast')
	  .setDescription('Roast a User!')
	  .addUserOption(option => option.setName('target').setDescription('The fellow you wanna roast the shit out of!').setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply()
        const member = interaction.options.getMember('target');
        const resp = await axios.get(`https://insult.mattbas.org/api/insult.json?who=${member.user.username}`)
        const roast = resp.data.insult
        await interaction.editReply(`${roast}`)
    }
}