const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
    name: 'level',
    description: 'Displays user\'s level',
    usage: `${prefix}level [user]`,
    category: 'economy',
    access: 'everyone',
    aliases: ['lvl', 'xp']
},

run: async (client, message, args) => {

    if (!message.mentions.users.size) {

        let myCurXp =  db.fetch(`xp_${message.author.id}`);
        let myCurLvl = db.fetch(`level_${message.author.id}`);
        let myNxtLvlXp = myCurLvl * 500;
        let myDifference = myNxtLvlXp - myCurXp;
    
        if (myCurLvl === null) myCurLvl = 0;
    
    message.reply(`You are level **${myCurLvl}** *(${myCurXp} XP)* and you need **${myDifference} XP** til next level up.`)
    } else {

        let user = message.mentions.users.first()

        let curXp =  db.fetch(`xp_${user.id}`);
        let curLvl = db.fetch(`level_${user.id}`);
        let nxtLvlXp = curLvl * 500;
        let difference = nxtLvlXp - curXp;
    
        if (curLvl === null) curLvl = 0;
    
    message.channel.send(`${user} is level **${curLvl}** *(${curXp} XP)* and needs **${difference} XP** til next level up.`)
    }

}
}