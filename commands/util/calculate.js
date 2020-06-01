const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
    config: {
    name: 'calculate',
    description: 'Calculator',
    usage: `${prefix}calculate <mathematical operation>`,
    category: 'util',
    access: 'everyone',
    aliases: ['calc']
},

run: async (client, message, args) => {

    let calculation = args[0]
    if (!calculation) return message.reply('Please input a mathematical operation!');

    let resp;
    try {
        resp = math.evaluate(args.join(' '));
    } catch (e) {
        return message.reply('Please input a valid mathematical operation!');
    }

    const embed = new MessageEmbed()
    .setColor('#3AA990')
    .setTitle('Your calculation')
    .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
    .addField('Output', `\`\`\`js\n${resp}\`\`\``)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed)

}
}