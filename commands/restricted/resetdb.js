const { prefix, ownerId } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'resetdb',
    description: 'Resets database',
    usage: `${prefix}reset`,
    category: 'restricted',
    access: 'restricted',
    aliases: ['rdb']
},

run: async (client, message, args) => {

  db.delete(`xp_${message.author.id}`).then(message => message.channel.send(`XP Reseted.`))
  db.delete(`level_${message.author.id}`).then(message => message.channel.send(`Levels Reseted.`))
  db.delete(`coins_${message.author.id}`).then(message => message.channel.send(`Coins Reseted.`))

  message.delete()
  message.channel.send(`**Database reseted.**`)
}
} 