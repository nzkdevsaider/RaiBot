const { prefix } = require('../../config.json');
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

    let user = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0]) || message.author;

    let curXp =  db.fetch(`xp_${user.id}`);
    let curLvl = db.fetch(`level_${user.id}`);
    let nxtLvlXp = curLvl * 500;
    let difference = nxtLvlXp - curXp;

    if (curLvl === null) curLvl = 0;

message.channel.send(`${user} is level **${curLvl}** *(${curXp} XP)* and needs **${difference} XP** til next level up.`)

}
}