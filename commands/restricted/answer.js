const { prefix, ownerId } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'answer',
    description: 'Answers to ticket',
    usage: `${prefix}answer <user> <text>`,
    category: 'restricted',
    access: 'restricted'
},

run: async (client, message, args) => {

  if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

  const user = client.users.cache.get(args[0])
  const answer = args[1]

  const embed = new MessageEmbed()
  .setColor(colours.white)
  .setAuthor(`[TICKET ANSWERED]`, message.author.displayAvatarURL())
  .setDescription(answer)
  .setFooter(`Answered by ${message.author.tag}`, message.author.displayAvatarURL())
  .setTimestamp()

  message.delete()

  user.send(embed)
}
} 