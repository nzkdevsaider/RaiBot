const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

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

    let curXp =  db.fetch(`xp_${message.author.id}`);
    let curLvl = db.fetch(`level_${message.author.id}`);
    let nxtLvlXp = curLvl * 500;
    let difference = nxtLvlXp - curXp;

    if (curLvl === null) curLvl = 0;

message.reply(`You are level **${curLvl}** *(${curXp} XP)* and you need **${difference} XP** til next level up.`)

}
}