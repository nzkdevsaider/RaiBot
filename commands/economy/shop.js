const { prefix, ownerId } = require('../../botconfig.json');
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

    const embed = new MessageEmbed()
    .setAuthor(`${server.name} Shop`, server.iconURL())
    .setColor(colours.default)
    .addField('Shop Selection', stripIndents`
    **1.** [**500** C] 💛 VIP Role
    **2.** [**1000** C] 🧡 VIP+ Role
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

            db.subtract(`coins_${message.author.id}`, 500)

            message.member.roles.add(vipRole);
            message.channel.send(`${message.author} bought **VIP Role** for **500** coins.`);
            message.delete()
            sentEmbed.delete()
        };
        
		if (reaction.emoji.name === '🧡') {

            db.subtract(`coins_${message.author.id}`, 1000)

            message.member.roles.add(vip2Role);
            message.channel.send(`${message.author} bought **VIP+ Role** for **1000** coins.`);
            message.delete()
            sentEmbed.delete()
        };
    }).catch(collected => {
	message.reply('Canceled selection.');
	});
})
}
}