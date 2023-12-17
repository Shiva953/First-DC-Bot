const { SlashCommandBuilder } = require('discord.js')
const web3 = require('@solana/web3.js')
/*commands:
checking wallet balance using pub key
airdropping sol or eth
checking info 
making a transaction
*/
module.exports = {
    cooldown : 4,
    data: new SlashCommandBuilder()
      .setName('solana')
      .setDescription('Commands to interact with the solana blockchain')
      .addSubcommand(subcommand =>
        subcommand
          .setName('balance')
          .setDescription('Show the wallet balance associated with the wallet address')
          .addStringOption(option => option.setName('publickey').setDescription('The wallet address').setRequired(true))
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('airdrop')
          .setDescription('Airdrop some SOL to your wallet!')
          .addStringOption(option => option.setName('publickey').setDescription('The wallet address').setRequired(true))
          .addIntegerOption(option => option.setName('amount').setDescription('How much sol to airdrop?').setRequired(true))
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('info')
          .setDescription('Get info associated with your account')
          .addStringOption(option => option.setName('publickey').setDescription('The wallet address').setRequired(true))
      )
      ,
  
      async execute(interaction) {
        await interaction.deferReply(`........`)
        let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"), "confirmed");
        console.log(await connection.getVersion());
        if(interaction.options.getSubcommand() === 'balance'){
            const pubkey = interaction.options.getString('publickey');
            const accountPubkey = new web3.PublicKey(pubkey);
            const accountBalance = await connection.getBalance(accountPubkey)
            console.log(accountBalance)
            await interaction.editReply(`Account Balance : ${accountBalance/1000000000}SOL`)
        }
        else if(interaction.options.getSubcommand() === 'airdrop'){
            const pubkey = interaction.options.getString('publickey');
            const accountPubkey = new web3.PublicKey(pubkey);
            const amount = interaction.options.getInteger('amount');
            const lamports = (amount * 1000000000);
            const signature = await connection.requestAirdrop(accountPubkey,lamports);
            await interaction.editReply(`Successfully airdropped ${amount} SOL! Transaction address : ${signature}`)
        }
        else if(interaction.options.getSubcommand() === 'info'){
            const pubkey = interaction.options.getString('publickey');
            const accountPubkey = new web3.PublicKey(pubkey);
            const info = await connection.getAccountInfo(accountPubkey)
            await interaction.editReply(`Here's the info for given account : 
No of lamports(1 SOL = 10^9 Lamports) : ${info.lamports}
${info.executable ? 'Account contains a program' : 'Account does not contain a program'}
Base-58 encoded Pubkey of the program this account has been assigned to : ${info.owner}
Epoch at which this account will next owe rent : ${info.rentEpoch}`)
      }
    }
}