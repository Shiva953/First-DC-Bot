require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const KK = process.env.KK

module.exports = {
  cooldown : 4,
  data: new SlashCommandBuilder()
    .setName('traceroute')
    .setDescription('Traceroute packet.')
    .addStringOption(option => option.setName('host').setDescription('Host(Domain/IP)').setRequired(true)),

    async execute(interaction) {
      await interaction.deferReply(`Bot is thinking...`)
      const host = interaction.options.getString('host');
      const response = await axios.get(`https://api.viewdns.info/traceroute/?domain=${host}&apikey=${KK}&output=json`);
      const hops = response.data.response.hops;
      const hopString = hops.map(hop => `Hop ${hop.number}: ${hop.hostname} (${hop.ip}) [${hop.rtt} ms]`).join('\n');
      await interaction.editReply(`Traceroute to \`\`\`${response.data.query.domain}:\`\`\`\n\`\`\`${hopString}\`\`\``);
    }
}
