const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const { Utils } = require('erela.js');

module.exports = {
    config: {
    name: 'volume',
    description: 'Adjusts the volume of the bot',
    usage: `${prefix}volume <input>`,
    category: 'music',
    access: 'everyone',
    aliases: ['vol']
},

run: async (client, message, args) => {
    
    const { channel } = message.member.voice;
    const player = client.music.players.get(message.guild.id);

    if (channel && channel.id !== player.voiceChannel.id) return message.reply('You need to be in a voice channel!');
    if (!player) return message.channel.send('No song/s currently playing in this server.');

    if (!args[0]) return message.channel.send(`Current volume: \`${player.volume}\``)
    if(Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send('\`100\` is the maximum volume!')

    player.setVolume(Number(args[0]));
    return message.channel.send(`Successfully set the volume to ${args[0]}`)
}
}