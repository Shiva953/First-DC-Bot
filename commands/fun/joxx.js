require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('joxx')
        .setDescription(`Tell me a Joke!`)
        .addStringOption(option =>
            option
            	.setName('category')
                .setDescription('Which category?(Programming/Dark/Misc/Pun/Spooky/Christmas')
                .setRequired(true)
        ),
    async execute(interaction) {
        const category = interaction.options.getString('category')
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
        const joke = response.data
        try{
            if(joke.error===true){
                await interaction.reply(`Enter valid category!`)
            }
            else{
            if(joke.type==="twopart"){
                await interaction.reply(`${joke.setup}
${joke.delivery}`);
            }
            else{
            await interaction.reply(`${joke.joke}`)
            }
        }
        }
        catch(error){
            console.log(error)
            await interaction.reply("There was an error while executing this command! Please check the category")
        }

    }
}