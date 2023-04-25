require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { spawn } = require('child_process');

module.exports = {
  cooldown: 4,
  data: new SlashCommandBuilder()
    .setName('nmap')
    .setDescription('Scan ports with NMAP.')
    .addStringOption(option => option.setName('host').setDescription('Host').setRequired(true))
    .addStringOption(option => option.setName('min_port').setDescription('Minimal port').setRequired(true))
    .addStringOption(option => option.setName('max_port').setDescription('Maximal port').setRequired(true)),
  async execute(interaction) {
    interaction.deferReply(`The bot is thinking...`)
    const host = interaction.options.getString('host');
    const minPort = interaction.options.getString('min_port');
    const maxPort = interaction.options.getString('max_port');

    const nmapProcess = spawn('nmap', ['-p', `${minPort}-${maxPort}`, host]);

    let output = '';
    nmapProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    nmapProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    nmapProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      const message = `\`\`\`${output}\`\`\``;
      interaction.editReply({ content: message, allowedMentions: { repliedUser: false } });
    });
  }
};
