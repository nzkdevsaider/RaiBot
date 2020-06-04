const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { stripIndents } = require('common-tags');
const { contains, pad } = require('../../functions.js');

module.exports = {
    config: {
    name: 'help',
    description: 'Displays command list',
    usage: `${prefix}help [category | command]`,
    category: 'util',
    access: 'everyone',
    aliases: ['commands']
},

run: async (client, message, args) => {

    let colour = {
        'actions': colours.lime,
        'economy': colours.blue,
        'fun': colours.red,
        'mod': colours.yellow,
        'music': colours.pink,
        'nsfw': colours.default,
        'stats': colours.magenta,
        'text': colours.blue,
        'util': colours.blue
    };

    const ads = [
        `Do you have a suggestion? Found a bug? Feel free to join [my server](https://discord.gg/KD457qA)`, `Do you like my commands? [Add me to your server](https://discord.com/oauth2/authorize?client_id=668244314718994465&scope=bot&permissions=8)`
    ]

    const randomAd = ads[Math.floor(Math.random() * ads.length)];

    const embed = new MessageEmbed()
    .setAuthor(`${client.user.username} Help ✨`, client.user.displayAvatarURL())
    .setColor(colours.default)
    .setDescription(randomAd)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

    if (!args[0]) {
        embed.addField('Command Categories', stripIndents`
        \`actions           :\` IRL Stuff
        \`economy           :\` Simple economy system
        \`fun               :\` Mostly entertainment
        \`mod               :\` Moderate your server
        \`music             :\` plug.dj for Discord
        \`nsfw              :\` 18+ zone
        \`restricted        :\` Bot owner only
        \`stats             :\` Game and Social sites stats
        \`text              :\` Text manipulation
        \`util              :\` Useful utilities

        To view the commands inside a category use \`r!help <category>\`
        `)

return message.channel.send(embed)

    } else {
        const eEmbed = new MessageEmbed()
        const categories = ['actions', 'economy', 'fun', 'mod', 'music', 'nsfw', 'restricted', 'stats', 'text', 'util']

if (contains(args[0].toLowerCase(), categories)) {

            const dir = client.commands.filter(c => c.config.category === args[0].toLowerCase())
            const embed = new MessageEmbed()
            .setAuthor(`Commands in ${args[0].toLowerCase()}`, client.user.displayAvatarURL())
            .setColor(colours.default)
            .setDescription(dir.map(c => `\n\`${prefix}${pad(c.config.name, 18)}:\` ${c.config.description}`, true).join(' '))
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

return message.channel.send(embed)
}
}

let command = client.commands.get(args[0].toLowerCase())

if (command) {

command = command.config

const embed = new MessageEmbed()
.setAuthor(`${prefix}${command.name} Info`, client.user.displayAvatarURL())
.setColor(colours.default)
.addField(`Command Info`, stripIndents`
**Aliases** ~ ${command.aliases ? command.aliases.join(', ') : 'None'}
**Category** ~ ${command.category}
**Access** ~ ${command.access}
**NSFW** ~ ${command.nsfw ? 'Yes' : 'No'}
**Description** ~ ${command.description || 'No description provided'}
**Usage** ~ ${command.usage || 'No usage'}
`)
.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
.setTimestamp()

return message.channel.send(embed)
}

}
}
