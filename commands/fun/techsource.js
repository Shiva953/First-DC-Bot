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
      
        // Check if there are any news articles
  if (tech_news.results.length === 0) {
    await interaction.reply(`Sorry, there are no news articles found for ${topic}.`);
    return;
  }

  // Create a new embed message
  const embed = {
    color: parseInt('0099ff', 16),
    title: `Latest technology news for ${topic}`,
    description: '',
    thumbnail: { url: tech_news.results[0].image_url },
    fields: [],
    footer: {
      text: 'Powered by NewsData.io',
      icon_url: 'https://www.newsdata.io/static/images/Logo-Blue.svg',
    },
  };

  // Loop through each news article and add a field to the embed message
  for (let i = 0; i < tech_news.results.length; i++) {
    const article = tech_news.results[i];
    embed.fields.push({
      name: article.title,
      value: `${article.description}\n[Read more](${article.link})\n\n`
    });
  }

  // Send the embed message
  await interaction.reply({ embeds: [embed] });
}
      }
      