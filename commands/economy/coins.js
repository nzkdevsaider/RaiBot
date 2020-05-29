const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const coins = require('../../coins.json');

module.exports = {
    config: {
    name: 'coins',
    description: 'Displays your wallet',
    usage: `${prefix}coins`,
    category: 'economy',
    access: 'everyone',
},

run: async (client, message, args) => {

    if (!coins[message.author.tag]) {
        coins[message.author.tag] = {
            coins: 0
        };
    }

    let uCoins = coins[message.author.tag].coins;

    const embed = new MessageEmbed()
    .setColor(colours.default)
    .setTitle(`${message.author.username}'s wallet`)
    .addField('Coins', uCoins)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed);

}
}