const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const ow = require('overwatch-stat');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
    name: 'overwatch',
    description: 'Displays Overwatch stats',
    usage: `${prefix}overwatch <battletag> <region>`,
    category: 'stats',
    access: 'everyone',
    aliases: ['ow']
},

run: async (client, message, args) => {

    const regions = ['asia', 'us', 'eu']

    const battletag = args[0]
    const region = args[1]

    if (!battletag) return message.reply('Please provide a battletag!');
    if (!region) return message.reply(`Please provide a region! \nValid regions: \`${regions.join(`\` | \``)}\``);

    if (args[1].toLowerCase() === 'asia' || args[1].toLowerCase() === 'us' || args[1].toLowerCase() === 'eu') {

    const stats = await ow.getStat(battletag, region.toLowerCase(), 'pc')
    if (!stats.name) return message.reply('Please provide a valid battletag!');

    const embed = new MessageEmbed()
    .setColor(colours.orange)
    .setAuthor(stats.name, stats.icon)
    .addField('Basic Info', stripIndents`
    **Level** ~ ${stats.level}
    **Prestige** ~ ${stats.prestige}
    **SR** ~ ${stats.ratings ? stats.ratings[0].level : '0'}
    **Endorsement Level** ~ ${stats.endorsement}
    `)

    .addField('Competitive Stats', stripIndents`
    **Played** ~ ${stats.competitiveStats.games.played}
    **Wins** ~ ${stats.competitiveStats.games.won}
    **Medals Earned** ~ ${stats.competitiveStats.awards.medals}
    `, true)
    
    .addField('Quick Play Stats', stripIndents`
    **Played** ~ ${stats.quickPlayStats.games.played}
    **Wins** ~ ${stats.quickPlayStats.games.won}
    **Medals Earned** ~ ${stats.quickPlayStats.awards.medals}
    `, true)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed)
} else {
    return message.reply(`Please provide a valid region! \nValid regions: \`${regions.join(`\` | \``)}\``);
}

}
}