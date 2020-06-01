const { prefix, ownerId } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'removecoins',
    description: 'Removes coins from an user',
    usage: `${prefix}removecoins <user> <amount>`,
    category: 'restricted',
    access: 'restricted',
    aliases: ['rc']
},

run: async (client, message, args) => {

  let pUser = message.mentions.users.first();

  const amount = args[1]

  if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

  db.subtract(`coins_${pUser.id}`, amount)

  message.delete()
  message.channel.send(`Removed **${amount}** coins from ${pUser}.`)
}
} 