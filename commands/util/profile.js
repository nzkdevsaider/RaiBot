const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
    name: 'profile',
    description: 'Displays your profile',
    usage: `${prefix}profile`,
    category: 'utility',
    access: 'everyone',
    aliases: ['prf']
},

run: async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0]) || message.author;

    let level = await db.fetch(`level_${user.id}`)
    if (level === null) level = 0;

    let xp = await db.fetch(`xp_${user.id}`)
    if (xp === null) xp = 0;

    let coins = await db.fetch(`coins_${user.id}`)
    if (coins === null) coins = 0;

    let nxtLvlXp = level * 500;
    let difference = nxtLvlXp - xp;

    let messagesSentGlobal = await db.fetch(`globalMessages_${user.id}`)
    if (messagesSentGlobal === null) messagesSentGlobal = 0;
    let messagesSentGuild = await db.fetch(`guildMessages_${message.guild.id}_${user.id}`)
    if (messagesSentGuild === null) messagesSentGuild = 0;

    let title = await db.fetch(`title_${message.author.id}`)
    if (title === null) title = 'None';

    const embed = new MessageEmbed()
    .setColor(colours.default)
    .setAuthor(`${user.username}'s Profile`, user.displayAvatarURL())
    .addField('Basic Info', stripIndents`
    **Level** ~ ${level}
    **Next Level** ~ ${difference} XP needed
    **XP** ~ ${xp}
    **Coins** ~ ${coins}
    `, true)
    .addField('Advanced Info', stripIndents`
    **Messages Sent [GLOBAL]** ~ ${messagesSentGlobal}
    **Messages Sent [GUILD]** ~ ${messagesSentGuild}
    `, true)

message.channel.send(embed)
}
}