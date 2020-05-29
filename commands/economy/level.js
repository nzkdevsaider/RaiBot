const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const xp = require('../../xp.json');

module.exports = {
    config: {
    name: 'level',
    description: 'Displays your level',
    usage: `${prefix}level`,
    category: 'economy',
    access: 'everyone',
    aliases: ['lvl', 'xp']
},

run: async (client, message, args) => {

    if (!xp[message.author.tag]) {
        xp[message.author.tag] = {
            xp: 0,
            level: 1
        };
    }

    let curXp = xp[message.author.tag].xp;
    let curLvl = xp[message.author.tag].level;
    let nxtLvlXp = curLvl * 500;
    let difference = nxtLvlXp - curXp;

message.reply(`You are level **${curLvl}** *(${curXp} XP)* and you need **${difference} XP** til next level up.`)

}
}