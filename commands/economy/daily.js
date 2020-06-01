const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
    config: {
    name: 'daily',
    description: 'Allows you to collect your daily reward',
    usage: `${prefix}daily`,
    category: 'economy',
    access: 'everyone'
},

run: async (client, message, args) => {

    let timeout = 86400000
    let amount = 100

    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.reply(`You already collected your daily reward, you can come back and collect in **${time}**.`)
    } else {

        db.add(`coins_${message.author.id}`, amount)
        db.set(`daily_${message.author.id}`, Date.now())

    const embed = new MessageEmbed()
    .setAuthor(`Daily Reward`, message.author.displayAvatarURL())
    .setColor(colours.yellow)
    .setDescription(`Collected **${amount}** coins.`)

message.channel.send(embed)
    }

}
}