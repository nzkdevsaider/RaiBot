const { prefix, ownerId } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'addcoins',
    description: 'Adds coins to an user',
    usage: `${prefix}addcoins <user> <amount>`,
    category: 'restricted',
    access: 'restricted',
    aliases: ['ac']
},

run: async (client, message, args) => {

  let pUser = message.mentions.users.first();

  const amount = args[1]

  if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

  db.add(`coins_${pUser.id}`, amount)

  message.delete()
  message.channel.send(`Added **${amount}** coins to ${pUser}.`)
}
} 