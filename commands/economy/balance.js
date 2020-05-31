const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'coins',
    description: 'Displays your balance',
    usage: `${prefix}coins`,
    category: 'economy',
    access: 'everyone',
    aliases: ['bal']
},

run: async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0]) || message.author;

    let coins = await db.fetch(`coins_${user.id}`)
    if (coins === null) coins = 0;

message.channel.send(`${user} has **${coins}** coins.`)

}
}