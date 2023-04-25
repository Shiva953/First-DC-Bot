require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const DNS_K = process.env.DNS_K

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('dns')
	  .setDescription('Check DNS data of domain.')
	  .addStringOption(option => option.setName('domain').setDescription('Domain').setRequired(true))
      .addStringOption(option => option.setName('record_type').setDescription('Record Type: A (default), AAAA, TXT, MX, NS, SRV, SPF, PTR, CNAME, SOA').setRequired(false)),

      async execute(interaction) {
        await interaction.deferReply(`BOT IS THINKING...`)
        const domain = interaction.options.getString('domain');
        const record_type = interaction.options.getString('record_type') || 'A';
        try{
        const response = await axios.get(`https://api.api-ninjas.com/v1/dnslookup?domain=${domain}`,{
            headers: {
              'X-Api-Key': DNS_K
            }
          });
        const info = response.data
        const main_obj = info.filter(el => el.record_type == record_type)
        let valueString = '';
        for (let obj of main_obj) {
            valueString += obj.value + '\n';
        }
        await interaction.editReply(`VALUE(S) : \`\`\`${valueString}\`\`\``)
        }
        catch(error){
            await interaction.editReply(`There was an error while executing this command!`)
        }
      }
    }