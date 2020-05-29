const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    config: {
    name: 'blursed',
    description: 'blursed_command',
    usage: `${prefix}blursed`,
    category: 'fun',
    access: 'everyone'
},

run: async (client, message, args) => {

    const subReddits = [
        'blursedimages'
    ]

    const randomSub = subReddits[Math.floor(Math.random() * subReddits.length)];

    let msg = await message.channel.send("Fetching image...")

    const img = await randomPuppy(randomSub)

    const embed = new MessageEmbed()
    .setColor(colours.blue)
    .setTitle(`From /r/${randomSub}`)
    .setImage(img)
    .setURL(`https://www.reddit.com/r/${randomSub}`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()
    
    message.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('⬆️')
        sentEmbed.react('⬇️')
    })
    msg.delete()

}
}