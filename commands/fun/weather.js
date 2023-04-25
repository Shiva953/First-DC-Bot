require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('weather')
	  .setDescription('Get the current temperature and humidity in a city')
	  .addStringOption(option => option.setName('city').setDescription('The name of the city to get weather information for').setRequired(true)),
	async execute(interaction) {
	  	// Retrieve the city name from the interaction
		await interaction.deferReply(`The Bot is Thinking...`)
	  	const city = interaction.options.getString('city');

		// Retrieve the weather data from the API
		const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=yes`);
		const data = response.data;
  
		// Extract the temperature and humidity from the response
		const temperature = data.current.temp_c;
		const humidity = data.current.humidity;
		const feelsLike = data.current.feelslike_c;
		const condition = data.current.condition.text;
  
		// Send the temperature and humidity as a message
		await interaction.editReply(`
		\`\`\`${condition}\`\`\`
City : \`\`\`${city}\`\`\`
Temperature : \`\`\`${temperature}°C\`\`\`
Feels Like : \`\`\`${feelsLike}\`\`\`
Humidity : \`\`\`${humidity}%\`\`\` 
`);
	}
  };