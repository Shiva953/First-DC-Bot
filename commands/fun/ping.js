const { SlashCommandBuilder, Message } = require('discord.js');

module.exports = {
	cooldown : 8,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	
	async execute(interaction) {
		const ping = (interaction.createdTimestamp - Date.now()) > 0 ? interaction.createdTimestamp - Date.now() : Date.now() - interaction.createdTimestamp;
		await interaction.reply(`Pong! Latency : ${ping}ms`);
	},
};