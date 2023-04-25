const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban A User')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
        interaction.guild.members.ban(user);
		return interaction.reply({ content: `Banned ${user} successfully.`, ephemeral: true });
	},
};