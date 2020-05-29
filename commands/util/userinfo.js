const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');

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

    let user = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0]) || message.author;
    let member = message.guild.member(user)

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? ' day' : ' days') + ' ago';
    }
    
    let clientYesNo = {
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
    **Bot** ~ ${clientYesNo[user.bot]}
    `)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed);
    
}
}