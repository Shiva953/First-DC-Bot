require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')
const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    data: new SlashCommandBuilder()
        .setName('astropic')
        .setDescription(`Astronomy picture of the day!`),

        async execute(interaction){
            await interaction.deferReply(`Just a moment...`)
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
            const Embed = {
                color: parseInt(Math.floor(Math.random() * 16777215).toString(16),16),
                title: response.data.title,
                url: response.data.url,
                description: response.data.explanation,
                thumbnail: {
                    url: response.data.thumbnail_url,
                },
                fields: [],
                image: {
                    url: response.data.hdurl,
                },
                timestamp: new Date().toISOString(),
            };
        await interaction.editReply({ embeds: [Embed] });
        }
    }