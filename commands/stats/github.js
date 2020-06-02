const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { stripIndents } = require('common-tags');
const moment = require('moment');

module.exports = {
    config: {
    name: 'github',
    description: 'Displays information about Github account',
    usage: `${prefix}github <username>`,
    category: 'stats',
    access: 'everyone',
    aliases: ['git', 'gh']
},

run: async (client, message, args) => {

    if (!args[0]) return message.reply('Please provide a username!')

    let url = `https://api.github.com/users/${args[0]}`

    let res; 

    try {
        res = await fetch(url).then(url => url.json())
    } catch (e) {
        return message.reply('I couldn\'t find that account!')
    }

    const embed = new MessageEmbed()
    .setColor(colours.default)
    .setAuthor(res.login, res.avatar_url)
    .addField('Basic Info', stripIndents`
    **Name** ~ ${res.name}
    **Bio** ~ ${res.bio}
    **Location** ~ ${res.location}
    **ID** ~ ${res.id}
    **Followers** ~ ${res.followers}
    **Following** ~ ${res.following}
    **Repositories** ~ ${res.public_repos}
    **Created** ~ ${moment.utc(res.created_at).format('dddd, MMMM Do, YYYY')}
    __[Link](${res.html_url})__
    `)
    .setURL(res.html_url)
    .setThumbnail(res.avatar_url)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed)

}
}