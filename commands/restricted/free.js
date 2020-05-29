const { prefix, ownerId } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'free',
    description: 'Makes announcement about free game',
    usage: `${prefix}free <text>`,
    category: 'restricted',
    access: 'restricted'
},

run: async (client, message, args) => {

  if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

  client.guilds.cache.map((guild) => {
  let found = 0
  guild.channels.cache.map((c) => {
    if (found === 0) {
    if (c.name === 'free-games') {

    message.delete()

  c.send(args.join(' '));
  found = 1;
  }}
  if (found = 0) guild.channels.create('free-games', { type: 'text'})
            });
          });

}
} 