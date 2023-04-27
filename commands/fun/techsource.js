require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('news')
	  .setDescription('Get the latest news!')
    .addStringOption(option => option.setName('category').setDescription('Which Category?(Tech/Finance/Sports/etc.)').setRequired(true).addChoices(
      { name: 'science', value: 'science' },
      { name: 'technology', value: 'technology' },
      { name: 'business', value: 'business' },
      { name: 'environment', value: 'environment' },
      { name: 'health', value: 'health' },
      { name: 'food', value: 'food' },
      { name: 'sports', value: 'sports' },
    ))
	  .addStringOption(option => option.setName('topic').setDescription('The topic!').setRequired(true)),

      async execute(interaction) {
        await interaction.deferReply(`The Bot is Thinking...`)
        const topic = interaction.options.getString('topic');
        const category = interaction.options.getString('category');
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${topic}&language=en&category=${category}`);
        const news = response.data;
      
        // Check if there are any news articles
  if (news.results.length === 0) {
    await interaction.editReply(`Sorry, there are no news articles found for ${topic}.`);
    return;
  }

  // Create a new embed message
  const embed = {
    color: parseInt(Math.floor(Math.random() * 16777215).toString(16),16),
    title: `Latest ${category} news for ${topic}`,
    description: '',
    thumbnail: { url: '' },
    fields: [],
    footer: {
      text: 'Powered by NewsData.io',
      icon_url: '',
    },
  };

  // Loop through each news article and add a field to the embed message
  for (let i = 0; i < news.results.length; i++) {
    const article = news.results[i];
    embed.fields.push({
      name: article.title,
      value: `${article.description}\n[Read more](${article.link})\n\n`
    });
  }

  // Send the embed message
  await interaction.editReply({ embeds: [embed] });
}
      }
      