const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
    name: 'legs',
    description: 'Shows some legs',
    usage: `${prefix}legs`,
    category: 'nsfw',
    access: 'everyone',
    nsfw: true
},

run: async (client, message, args) => {

    if (!message.channel.nsfw) return message.reply('This isn\'t NSFW channel!')

    const subReddits = [
        'girlsinyogapants', 'stockings', 'legs', 'tightshorts'
    ]

    const sort = [
        '?hot'
    ]

    const randomSub = subReddits[Math.floor(Math.random() * subReddits.length)];

    const randomSort = sort[Math.floor(Math.random() * sort.length)];

    let msg = await message.channel.send("Fetching image...")

    fetch(`https://www.reddit.com/r/${randomSub}.json${randomSort}`)
    .then(res => res.json())
    .then(body => {

    const whitelist = [
        'jpg', 'png', 'jpeg'
    ]
     
    function contains(target, pattern){
        var value = 0;
        pattern.forEach(function(word){
          value = value + target.includes(word);
        });
        return (value === 1)
    }

    const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => contains(post.data.url, whitelist));
    const random = Math.floor(Math.random() * allowed.length)

    if (!allowed.length) return message.reply('**I can\'t reach Reddit!** Try again.');

    const embed = new MessageEmbed()
    .setColor(colours.pink)
    .setTitle(`From /r/${randomSub}`)
    .setImage(allowed[random].data.url)
    .setURL(`https://www.reddit.com${allowed[random].data.permalink}`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed).then(sentEmbed => {
    sentEmbed.react('⬆️')
    sentEmbed.react('⬇️')
})
msg.delete()
})

}
}