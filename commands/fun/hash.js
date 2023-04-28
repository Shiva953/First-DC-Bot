require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');
const CryptoJS = require("crypto-js");

module.exports = {
    cooldown: 4,
    data: new SlashCommandBuilder()
      .setName('hash')
      .setDescription('Hash encrypt or decrypt')
      .addSubcommand(subcommand =>
        subcommand
          .setName('encrypt')
          .setDescription('Encrypt a message')
          .addStringOption(option =>
            option.setName('message')
              .setDescription('The message to encrypt')
              .setRequired(true)
          )
          .addStringOption(option =>
            option.setName('algorithm')
              .setDescription('The encryption algorithm')
              .setRequired(true)
          )
          .addStringOption(option => option.setName('key').setDescription('The Key for encryption').setRequired(false))
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('decrypt')
          .setDescription('Decrypt a message')
          .addStringOption(option =>
            option.setName('cipher')
              .setDescription('The cipher text to decrypt')
              .setRequired(true)
          )
          .addStringOption(option =>
            option.setName('algorithm')
              .setDescription('The decryption algorithm')
              .setRequired(true)
          )
          .addStringOption(option => option.setName('key').setDescription('The Key for decryption').setRequired(true))
      ),

      async execute(interaction) {
        if (interaction.options.getSubcommand() === 'encrypt') {
            const message = interaction.options.getString('message');
			const algorithm = interaction.options.getString('algorithm');
            
            const hash = CryptoJS.algo[algorithm].create();
            hash.update(message);
            const hashedMessage = hash.finalize().toString();
            await interaction.reply(`Encrypted message : ${hashedMessage}`)

		} else if (interaction.options.getSubcommand() === 'decrypt') {
            const cp = interaction.options.getString('cipher');
            const cipher = CryptoJS.enc.Hex.parse(cp)
            const algorithm = interaction.options.getString('algorithm')
            const ckey = interaction.options.getString('key')
            const key = CryptoJS.enc.Utf8.parse(ckey);
            let decryptedMessage;
            switch (algorithm) {
              case 'AES':
                decryptedMessage = CryptoJS.AES.decrypt({ciphertext: cipher}, key, {
                  iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
                  mode: CryptoJS.mode.CBC
              }).toString(CryptoJS.enc.Utf8);
                break;
              case 'TripleDES':
                decryptedMessage = CryptoJS.TripleDES.decrypt({ciphertext: cipher}, key, {
                  iv: CryptoJS.enc.Hex.parse('0000000000000000'),
                  mode: CryptoJS.mode.CBC
              }).toString(CryptoJS.enc.Utf8);
                break;
              case 'DES':
                decryptedMessage = CryptoJS.DES.decrypt({ciphertext: cipher}, key, {
                  mode: CryptoJS.mode.CBC
              }).toString(CryptoJS.enc.Utf8);
                break;
              case 'RC4':
                decryptedMessage = CryptoJS.RC4.decrypt({ciphertext: cipher}, key, {
                  mode: CryptoJS.mode.CBC
              }).toString(CryptoJS.enc.Utf8);
              break;
              default:
                await interaction.reply(`Invalid algorithm: ${algorithm}`);
                return;
            }
            await interaction.reply(`Decrypted Message: ${decryptedMessage}`);
		}
	},
    }