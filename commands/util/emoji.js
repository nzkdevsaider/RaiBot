const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'emoji',
    description: 'Displays full resolution emoji image and it\'s download link',
    usage: `${prefix}emoji`,
    category: 'util',
    access: 'everyone',
    aliases: ['e']
},

run: async (client, message, args) => {

    let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0])
    if (!emoji) return message.reply('Please provide an emoji!')
    
    const embed = new MessageEmbed()
    .setAuthor(`${emoji.name} Emoji`)
    .setColor(colours.default)
    .setThumbnail(emoji.url)
    .setDescription(`[Download](${emoji.url})`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed);
    
}
}