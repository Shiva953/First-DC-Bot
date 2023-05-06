const axios = require('axios')
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('truth_dare')
        .setDescription(`Truth or Dare!`)
        .addStringOption(option =>
            option
            	.setName('type')
                .setDescription('Truth or Dare?')
                .setRequired(true).addChoices(
                    { name: 'Truth', value: 'Tell me the truth!' },
                    { name: 'Dare', value: 'Have a Dare!' },
        )),
    async execute(interaction) {
        await interaction.deferReply()
        const type = interaction.options.getString('type')
        const response = await axios.get(`https://api.truthordarebot.xyz/v1/${type}`)
        const truth_or_dare = response.data.question

        const Embed = {
            color: parseInt(Math.floor(Math.random() * 16777215).toString(16),16),
            title: response.data.type,
            url: '',
            description: truth_or_dare,
            thumbnail: {
                url: '',
            },
            fields: [],
            timestamp: new Date().toISOString(),
        };

        await interaction.editReply({ embeds : [Embed]})
    }
}