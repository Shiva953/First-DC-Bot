require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

module.exports = {
    data: new SlashCommandBuilder()
        .setName('book')
        .setDescription(`Get a book recommendation based on your category!`)
        .addStringOption(option =>
            option
            	.setName('subject')
                .setDescription('Which subject?')
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('keyword')
                .setDescription('Enter the keyword to search for')
                .setRequired(true)
                ),
    async execute(interaction) {
        const subject = interaction.options.getString('subject')
        const qword = interaction.options.getString('keyword')
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${qword}&subject:${subject}&maxResults=1&key=${GOOGLE_API_KEY}`);
        const books = response.data

        const exampleEmbed = {
            color: parseInt(Math.floor(Math.random() * 16777215).toString(16),16),
            title: books.items[0].volumeInfo.title,
            url: books.items[0].volumeInfo.previewLink,
            author: {
                name: books.items[0].volumeInfo.authors[0],
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.js.org',
            },
            description: books.items[0].volumeInfo.description,
            thumbnail: {
                url: books.items[0].volumeInfo.imageLinks.thumbnail,
            },
            fields:[],
            image: {
                url: books.items[0].volumeInfo.imageLinks.smallThumbnail,
            },
            timestamp: new Date().toISOString(),
            // footer: {
            //     text: 'Some footer text here',
            //     icon_url: 'https://i.imgur.com/AfFp7pu.png',
            // },
        };
        
        await interaction.reply({ embeds: [exampleEmbed] });
    }
}