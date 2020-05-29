const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    config: {
    name: 'ticket',
    description: 'Allows you to suggest a feature or report a bug',
    usage: `${prefix}ticket <text>`,
    category: 'util',
    access: 'everyone'
},

run: async (client, message, args) => {

    let ticket = args.slice(0).join(' ');
    if (!ticket) return message.reply('Please provide a text!')

    message.delete()

    const embed = new MessageEmbed()
    .setColor(colours.white)
    .setAuthor(`[TICKET] ${message.author.id}`, message.author.displayAvatarURL())
    .setDescription(ticket)
    .setFooter(`Submitted by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

    const tEmbed = new MessageEmbed()
    .setColor(colours.white)
    .setAuthor('[TICKET SUBMITTED]', message.author.displayAvatarURL())
    .setDescription(ticket)
    .setFooter(`Submitted by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

let sChannel = client.channels.cache.get('698294835039305868')
sChannel.send(embed)
message.author.send(tEmbed)

}
}