const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
    name: 'base64',
    description: 'RW5jb2RlcyBhbmQgZGVjb2RlcyBiYXNlNjQ=',
    usage: `${prefix}base64 <encode | decode> <text>`,
    category: 'text',
    access: 'everyone'
},

run: async (client, message, args) => {

message.delete()

if (!args[0]) return message.reply('Please provide a valid option: `encode` | `decode`')

if (args[0].toLowerCase() == 'encode' || args[0].toLowerCase() == 'decode') {

if (args[0].toLowerCase() === 'encode') {

    if (!args.slice(1).join(' ')) return message.reply('You need to input a text to encode!')

    fetch(`https://some-random-api.ml/base64?encode=${args.slice(1).join(' ')}`)
    .then(res => res.json())
    .then(body => {

message.channel.send(body.base64)
})
}

if (args[0].toLowerCase() === 'decode') {

    if (!args.slice(1).join(' ')) return message.reply('You need to input a text to decode!')

    fetch(`https://some-random-api.ml/base64?decode=${args.slice(1).join(' ')}`)
    .then(res => res.json())
    .then(body => {

message.channel.send(body.text)
})
}
} else {
    return message.reply('Please provide a valid option: `encode` | `decode`')
}

}
}