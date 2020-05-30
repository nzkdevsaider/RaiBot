const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'clapify',
    description: 'Makes 👏 text 👏 look 👏 like 👏 this',
    usage: `${prefix}clapify <text>`,
    category: 'text',
    access: 'everyone'
},

run: async (client, message, args) => {

    message.delete()

    let textToClapify = args.slice(0).join(' ')
    if (!textToClapify) return message.reply('Please input a text to clapify!')

    let clapifiedText = (textToClapify.replace(/ /g, ' 👏 '))
    if (clapifiedText.length > 2000) return message.reply('Your text is too long!')
    
message.channel.send(clapifiedText)

}
}