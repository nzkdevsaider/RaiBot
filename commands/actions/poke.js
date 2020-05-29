const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config: {
    name: 'poke',
    description: 'Pokes someone',
    usage: `${prefix}poke <user>`,
    category: 'actions',
    access: 'everyone'
},

run: async (client, message, args) => {

if (!message.mentions.users.first()) return message.reply('You can\'t poke the air!');

    const embed = new MessageEmbed()
    .setColor(colours.red)
    .setDescription(`**${message.author.username}** poked **${message.mentions.users.first().username}! ✨**`)
    .setImage((await neko.sfw.poke()).url)

message.channel.send(embed)
    
}
}