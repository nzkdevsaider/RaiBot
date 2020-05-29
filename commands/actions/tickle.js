const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config: {
    name: 'tickle',
    description: 'Tickles someone',
    usage: `${prefix}tickle <user>`,
    category: 'actions',
    access: 'everyone'
},

run: async (client, message, args) => {

if (!message.mentions.users.first()) return message.reply('You can\'t tickle the air!');

    const embed = new MessageEmbed()
    .setColor(colours.red)
    .setDescription(`**${message.author.username}** tickled **${message.mentions.users.first().username}! ✨**`)
    .setImage((await neko.sfw.tickle()).url)

message.channel.send(embed)
    
}
}