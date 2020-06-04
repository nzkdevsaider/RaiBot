const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    config: {
    name: 'dog',
    description: 'woof',
    usage: `${prefix}dog`,
    category: 'fun',
    access: 'everyone',
    aliases: ['woof']
},

run: async (client, message, args) => {

    const subReddits = [
        'woof_irl', 'dogpictures', 'dogswithjobs', 'dogmemes', 'corgi', 'corgis', 'BabyCorgis', 'husky', 'ShibaInu', 'shiba', 'shibe'
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