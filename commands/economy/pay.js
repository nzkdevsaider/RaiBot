const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const coins = require('../../coins.json');
const { writeFile } = require('fs');

module.exports = {
    config: {
    name: 'pay',
    description: 'Pays user some coins',
    usage: `${prefix}pay <user> <coins>`,
    category: 'economy',
    access: 'everyone',
},

run: async (client, message, args) => {

    if (!coins[message.author.tag]) {
        return message.reply('You don\'t have any coins!')
    }

    let pUser = message.mentions.users.first();	

    if (!coins[pUser.tag]) {
        coins[pUser.tag] = {
            coins: 0
        };
    }

    let pCoins = coins[pUser.tag].coins;
    let sCoins = coins[message.author.tag].coins;

    if (sCoins < args[0]) return message.reply('Not enough coins there!')

    coins[message.author.tag] = {
        coins: sCoins - parseInt(args[1])
    };

    coins[pUser.tag] = {
        coins: pCoins + parseInt(args[1])
    };

message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);

writeFile('./coins.json', JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });

}
}