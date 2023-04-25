require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const IP_K = process.env.IP_K

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('ip')
	  .setDescription('Get info about IP.')
	  .addStringOption(option => option.setName('ip').setDescription('Enter the IP').setRequired(true)),

      async execute(interaction) {
        const ip = interaction.options.getString('ip');
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${IP_K}`);
        const info = response.data

        await interaction.reply(`IP : ${info.ip}
CITY : \`\`\`${info.city}\`\`\`
REGION : \`\`\`${info.region}\`\`\`
COUNTRY : \`\`\`${info.country}\`\`\`
LOCATION : \`\`\`${info.loc}\`\`\``)
      }
    }