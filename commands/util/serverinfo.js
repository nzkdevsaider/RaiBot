const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
    name: 'serverinfo',
    description: 'Displays information about server',
    usage: `${prefix}serverinfo`,
    category: 'util',
    access: 'everyone',
    aliases: ['si']
},

run: async (client, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? ' day' : ' days') + ' ago';
    }

    let region = {
        'brazil': ':flag_br: Brazil',
        'eu-central': ':flag_eu: Central Europe',
        'europe': ':flag_eu: Europe',
        'singapore': ':flag_sg: Singapore',
        'us-central': ':flag_us: U.S. Central',
        'sydney': ':flag_au: Sydney',
        'us-east': ':flag_us: U.S. East',
        'us-south': ':flag_us: U.S. South',
        'us-west': ':flag_us: U.S. West',
        'eu-west': ':flag_eu: Western Europe',
        'vip-us-east': ':flag_us: VIP U.S. East',
        'london': ':flag_gb: London',
        'amsterdam': ':flag_nl: Amsterdam',
        'hongkong': ':flag_hk: Hong Kong',
        'russia': ':flag_ru: Russia',
        'southafrica': ':flag_za:  South Africa'
    };

    const embed = new MessageEmbed()
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
    .setColor(colours.default)
    .addField('Basic Info', stripIndents`
    **Name** ~ ${message.guild.name}
    **ID** ~ ${message.guild.id}
    **Owner** ~ ${message.guild.owner}
    **Created** ~ ${moment.utc(message.guild.createdAt).format('dddd, MMMM Do, YYYY')} (${checkDays(message.channel.guild.createdAt)})
    `)

    .addField('Advanced Info', stripIndents`
    **Region** ~ ${region[message.guild.region]}
    **Verification Level** ~ ${message.guild.verificationLevel.charAt(0).toUpperCase() + message.guild.verificationLevel.slice(1).toLowerCase()}
    `)

    .addField('Stats', stripIndents`
    **Total Members** ~ ${message.guild.memberCount}
    **Total Bots** ~ ${message.guild.members.cache.filter(member => member.user.bot).size}
    **Total Roles** ~ ${message.guild.roles.cache.size}
    **Total Channels** ~ ${message.guild.channels.cache.size}
    **Total Members** ~ ${message.guild.memberCount}
    `)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

message.channel.send(embed);
    
}
}