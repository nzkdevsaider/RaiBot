const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'balance',
    description: 'Displays user\'s balance',
    usage: `${prefix}balance [user]`,
    category: 'economy',
    access: 'everyone',
    aliases: ['bal']
},

run: async (client, message, args) => {

    if (!message.mentions.users.size) {
    let myCoins = await db.fetch(`coins_${message.author.id}`)
    if (myCoins === null) myCoins = 0;

message.reply(`You have **${myCoins}** coins.`)
    } else {

    let user = message.mentions.users.first()

    let coins = await db.fetch(`coins_${user.id}`)
    if (coins === null) coins = 0;

message.channel.send(`${user} has **${coins}** coins.`)
    }

}
}