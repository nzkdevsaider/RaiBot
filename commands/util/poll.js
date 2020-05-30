const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'poll',
    description: 'Creates poll',
    usage: `${prefix}poll`,
    category: 'util',
    access: 'everyone'
},

run: async (client, message, args) => {

    if (!args.join(' ')) return message.reply('Please input a question!')

    const embed = new MessageEmbed()
    .setColor(colours.magenta)
    .setAuthor(`Poll created by ${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(args.join(' '))
    .setFooter('React to vote.')
    .setTimestamp()

    message.delete()
    
    let msg = await message.channel.send({embed});

    await msg.react('✅'); 
    await msg.react('❌');

}
}
