const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config: {
    name: 'slap',
    description: 'Slaps someone',
    usage: `${prefix}slap <user>`,
    category: 'actions',
    access: 'everyone'
},

run: async (client, message, args) => {

if (!message.mentions.users.first()) return message.reply('You can\'t slap the air!');

    const embed = new MessageEmbed()
    .setColor(colours.red)
    .setDescription(`**${message.author.username}** slapped **${message.mentions.users.first().username}! 💫**`)
    .setImage((await neko.sfw.slap()).url)

message.channel.send(embed)
    
}
}