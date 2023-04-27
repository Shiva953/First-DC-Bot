require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const COIN_API_KEY = process.env.COIN_API_KEY
// const CAK = process.env.CAK
const CMPK = process.env.CMPK

module.exports = {
    cooldown: 4,
    data: new SlashCommandBuilder()
      .setName('crypto')
      .setDescription('Cryptocurrency commands!')
      .addSubcommand(subcommand =>
        subcommand
          .setName('exchange')
          .setDescription('Find exchange rates between 2 cryptocurrencies.')
          .addStringOption(option => option.setName('currency1').setDescription('.').setRequired(true))
          .addStringOption(option => option.setName('currency2').setDescription('.').setRequired(true))
          
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('info')
          .setDescription('Information about a particular cryptocurrency')
          .addStringOption(option =>
            option.setName('coin')
              .setDescription('The crypto to get info about')
              .setRequired(true)
          )
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('chart')
          .setDescription('Get chart for a cryptocurrency!')
          .addStringOption(option =>
            option.setName('coin')
              .setDescription('The crypto to get the chart for')
              .setRequired(true)
          )
      )
      ,
      async execute(interaction) {
        await interaction.deferReply(`.......`)
        if (interaction.options.getSubcommand() === 'exchange') {
            const c1 = interaction.options.getString('currency1')
            const c2 = interaction.options.getString('currency2')
            const response = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${c1}/${c2}`,{ headers: {'X-CoinAPI-Key': COIN_API_KEY} })
            await interaction.editReply(`1 ${c1} = ${response.data.rate} ${c2}`)
        }
        else if (interaction.options.getSubcommand() === 'info') {
            const coin = interaction.options.getString('coin')
            const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,{headers : {'X-CMC_PRO_API_KEY': CMPK}})
            const cryptoData = response.data.data.filter(el => el.symbol==coin)[0]
            await interaction.editReply(`Name: ${cryptoData.name}
Price: ${cryptoData.quote.USD.price}
Market Cap: ${cryptoData.quote.USD.market_cap}
24h Volume: ${cryptoData.quote.USD.volume_24h}
24h Change: ${cryptoData.quote.USD.percent_change_24h}%`)
        }
        else if (interaction.options.getSubcommand() === 'chart') {
            //todo
        }
      }
    }