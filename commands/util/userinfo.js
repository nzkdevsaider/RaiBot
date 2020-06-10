const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
const { checkDays } = require('../../functions.js');

module.exports = {
    config: {
    name: 'userinfo',
    description: 'Displays information about user',
    usage: `${prefix}userinfo [user]`,
    category: 'util',
    access: 'everyone',
    aliases: ['ui']
},

run: async (client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let botYesNo = {
        'false': 'No',
        'true': 'Yes'
    }
    
    const embed = new MessageEmbed()
    .setAuthor(`${user.username} Info`, user.displayAvatarURL())
    .setColor(colours.default)
    .addField('Basic Info', stripIndents`
    **Nickname** ~ ${user.username}
    **Discriminator** ~ ${user.discriminator}
    **ID** ~ ${user.id}
    **Registered** ~ ${moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format('dddd, MMMM Do, YYYY')} (${checkDays(message.guild.members.cache.get(user.id).user.createdAt)})
    **Joined** ~ ${moment.utc(message.guild.members.cache.get(user.id).joinedAt).format('dddd, MMMM Do, YYYY')} (${checkDays(message.guild.members.cache.get(user.id).joinedAt)})
    `)

    .addField('Advanced Info', stripIndents`
    **Status** ~ ${user.presence.status.charAt(0).toUpperCase() +user.presence.status.slice(1).toLowerCase()}
    **Game** ~ ${user.presence.game ? user.presence.game.name : 'None'}
    **Bot** ~ ${botYesNo[user.bot]}
    `)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed);
    
}
}