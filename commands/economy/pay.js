const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'pay',
    description: 'Allows you to make a payment',
    usage: `${prefix}pay <user> <amount>`,
    category: 'economy',
    access: 'everyone',
    aliases: ['give']
},

run: async (client, message, args) => {
    
    let coins = await db.fetch(`coins_${message.author.id}`)

    if (!coins) return message.reply('You don\'t have any coins!')

    let pUser = message.mentions.users.first();
    if (!message.mentions.users.first()) return message.reply('Please provide an user!')

    if (!args[1]) return message.reply('Please provide an amount of coins!')

    let pCoins = db.fetch(`coins_${pUser.id}`)
    let sCoins = db.fetch(`coins_${message.author.id}`)

    if (sCoins < args[0]) return message.reply('Not enough coins there!')

    db.subtract(`coins_${message.author.id}`, args[1])
    db.add(`coins_${pUser.id}`, args[1])

message.channel.send(`${message.author} has given ${pUser} **${args[1]}** coins.`);

}
}