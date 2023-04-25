require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')
const NASA_API_KEY = process.env.NASA_API_KEY

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mars-photos')
        .setDescription(`Mars Rover Photos!`),
    async execute(interaction) {
        await interaction.deferReply(`...`)
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=10&api_key=${NASA_API_KEY}`);
        const photos = response.data.photos;

        const Embed = {
        color: parseInt(Math.floor(Math.random() * 16777215).toString(16),16),
        title: 'Curiosity Rover Photos',
        url: 'https://mars.nasa.gov/msl/home/',
        author: {
            name: 'NASA Jet Propulsion Laboratory',
            icon_url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png',
            url: 'https://www.jpl.nasa.gov/',
        },
        description: `Here are the latest photos taken by the Curiosity rover on Mars:`,
        thumbnail: {
            url: 'https://mars.nasa.gov/system/resources/detail_files/7809_msl20190605_PIA23245-16.jpg',
        },
        fields: [],
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Data provided by NASA API',
            icon_url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png',
        },
        };

        for (let i = 0; i < 10; i++) {
        const photo = photos[i];
            Embed.fields.push({
            name: `Photo ${i + 1}`,
            value: `Taken by the ${photo.rover.name} rover on sol ${photo.sol} (${photo.earth_date})\n[View on NASA website](${photo.img_src})`,
            inline: false,
        });
        }
        await interaction.editReply({ embeds: [Embed] });
            }
        }