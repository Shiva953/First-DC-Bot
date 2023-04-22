require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('technews')
	  .setDescription('Get the latest technology news!')
	  .addStringOption(option => option.setName('topic').setDescription('The topic to get tech news for').setRequired(true)),

      async execute(interaction) {
        const topic = interaction.options.getString('topic');
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${topic}&language=en&category=technology`);
        const tech_news = response.data;
      
        const links = tech_news.results.map(result => result.link).join('\n');
        await interaction.reply(`Here's the latest technology news for ${topic} in the last 48 hours:\n${links}`);
      }
      
  };