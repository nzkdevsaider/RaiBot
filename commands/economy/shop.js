const { prefix, ownerId } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
    name: 'shop',
    description: 'Displays shop',
    usage: `${prefix}shop [number]`,
    category: 'economy',
    access: 'everyone',
},

run: async (client, message, args) => {

    const owner = client.users.cache.get(ownerId);
    const server = client.guilds.cache.get('347876379645313024');
    const vipRole = server.roles.cache.get('687365069738082321');
    const vip2Role = server.roles.cache.get('716279242610049055');
    const coins = db.fetch(`coins_${message.author.id}`); 

    const embed = new MessageEmbed()
    .setAuthor(`${server.name} Shop`, server.iconURL())
    .setColor(colours.default)
    .addField('Shop Selection', stripIndents`
    **1.** [**2500** C] 💛 VIP Role
    **2.** [**5000** C] 🧡 VIP+ Role
    `)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()

    message.channel.send(embed).then(sentEmbed => {
    sentEmbed.react('💛')
    sentEmbed.react('🧡')

    const filter = (reaction, user) => {
        return ['💛', '🧡'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    sentEmbed.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
	.then(collected => {
        const reaction = collected.first()

		if (reaction.emoji.name === '💛') {

            if (message.guild.id !== server.id) return message.reply(`You need to be in ${server.name} to buy this!`)
            if (message.member.roles.cache.has(vipRole.id)) return message.reply(`You already have this role!`)

            if (coins < 2500) {
                return message.reply('You don\'t have enough coins!')
            } else {
            
            db.subtract(`coins_${message.author.id}`, 2500)

            message.member.roles.add(vipRole);
            message.channel.send(`${message.author} bought **VIP Role** for **2500** coins.`);
            message.delete()
            sentEmbed.delete()
            }
        };
        
		if (reaction.emoji.name === '🧡') {

            if (message.guild.id !== server.id) return message.reply(`You need to be in ${server.name} to buy this!`)
            if (message.member.roles.cache.has(vip2Role.id)) return message.reply(`You already have this role!`)

            if (coins < 5000) {
                return message.reply('You don\'t have enough coins!')
            } else {

            db.subtract(`coins_${message.author.id}`, 5000)

            message.member.roles.add(vip2Role);
            message.channel.send(`${message.author} bought **VIP+ Role** for **5000** coins.`);
            message.delete()
            sentEmbed.delete()
            }
        };
    }).catch(collected => {
	message.reply('Canceled selection.');
	});
})
}
}