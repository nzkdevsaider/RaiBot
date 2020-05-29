const { prefix, ownerId } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'bots',
    description: 'Displays bot count of server',
    usage: `${prefix}bots <server-id>`,
    category: 'restricted',
    access: 'restricted'
},

run: async (client, message, args) => {

    if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

    let guildId = args[0]

    if (!guildId) return message.reply('Please provide guild ID!');
    const guild = client.guilds.cache.get(guildId)
    const clients = guild.members.cache.filter(member => member.user.client).size

    let embed = new MessageEmbed()
    .setAuthor(`${guild.name} client Count`, client.user.displayAvatarURL())
    .setColor(colours.default)
    .setDescription(`${guild.name} has ${clients} clients`)
      
message.channel.send(embed)
}
}