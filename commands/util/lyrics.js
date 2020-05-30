const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
    name: 'lyrics',
    description: 'Displays song\'s lyrics',
    usage: `${prefix}lyrics <input>`,
    category: 'util',
    access: 'everyone'
},

run: async (client, message, args) => {

    if (!args) message.reply('Please input something!')

    fetch(`https://some-random-api.ml/lyrics?title=${args.join('-')}`)
    .then(res => res.json())
    .then(body => {

    if (body.error) message.reply('I couldn\'t find that song\'s lyrics!')

    const embed = new MessageEmbed()
    .setColor(colours.blue)
    .setTitle(`Success!`)
    .setDescription(`Found lyrics for [${body.author} - ${body.title}](${body.links.genius})`)
    .setThumbnail(body.thumbnail.genius)
    .setURL(body.links.genius)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed)
})

}
}