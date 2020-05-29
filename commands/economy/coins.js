const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const coins = require('../../coins.json');

module.exports = {
    config: {
    name: 'coins',
    description: 'Displays how much coins you have',
    usage: `${prefix}coins`,
    category: 'economy',
    access: 'everyone',
    aliasees: ['balance', 'bal']
},

run: async (client, message, args) => {

    if (!coins[message.author.tag]) {
        coins[message.author.tag] = {
            coins: 0
        };
    }

    let uCoins = coins[message.author.tag].coins;

message.reply(`You have **${uCoins}** coins.`)

}
}