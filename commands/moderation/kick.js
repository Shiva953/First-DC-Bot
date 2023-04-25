const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		member.kick();
		return interaction.reply({ content: `Kicked ${member.user.username} sucessfully`, ephemeral: true });
	},
};