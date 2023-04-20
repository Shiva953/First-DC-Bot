const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const WEATHER_API_KEY = 'f61a0818e1cf4b39a3073923231604';

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('weather')
//     .setDescription('Get the current temperature and humidity in a city')
//     .addStringOption(option =>
//       option.setName('city')
//         .setDescription('The name of the city to get weather information for')),

//   async execute(interaction) {
//     // Retrieve the city name from the interaction
//     const cityName = interaction.options.getString('city');

//     try {
//       // Retrieve the weather data from the API using Axios
//       const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cityName)}&aqi=yes`);

//       // Extract the temperature and humidity from the response
//       const temperature = data.current.temp_c;
//       const humidity = data.current.humidity;

//       // Send the temperature and humidity as a message
//       await interaction.reply(`The current temperature in ${cityName} is ${temperature}°C with ${humidity}% humidity`);
//     } catch (error) {
//       console.error(error);
//       await interaction.reply('There was an error retrieving the weather information');
//     }
//   }
// };


module.exports = {
	cooldown : 4,
	data: new SlashCommandBuilder()
	  .setName('weather')
	  .setDescription('Get the current temperature and humidity in a city')
	  .addStringOption(option => option.setName('city').setDescription('The name of the city to get weather information for').setRequired(true)),
	async execute(interaction) {
	  	// Retrieve the city name from the interaction
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
		await interaction.reply(`
		${condition}
City : ${city} 
Temperature : ${temperature}°C
Feels Like : ${feelsLike} 
Humidity : ${humidity}% 
`);
	}
  };