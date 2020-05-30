const { prefix, ownerId } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');
const coins = require('../../coins.json');
const { writeFile } = require('fs');
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
    **1.** [**250** C] 💛 VIP Role
    **2.** [**500** C] 🧡 VIP+ Role
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

            if (!coins[message.author.tag]) {
                return message.reply('You don\'t have any coins!')
            }

            let uCoins = coins[message.author.tag].coins;

            message.member.roles.add(vipRole);
            message.channel.send(`${message.author} bought **VIP Role** for **5** coins.`);
            coins[message.author.tag] = {
                coins: uCoins - 5
            };
            writeFile('./coins.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
              })
              message.delete()
              sentEmbed.delete()
        };
        
		if (reaction.emoji.name === '🧡') {

            if (!coins[message.author.tag]) {
                return message.reply('You don\'t have any coins!')
            }

            let uCoins = coins[message.author.tag].coins;

            message.member.roles.add(vip2Role);
            message.channel.send(`${message.author} bought **VIP+ Role** for **10** coins.`);
            coins[message.author.tag] = {
                coins: uCoins - 10
            };
            writeFile('./coins.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
              })
              message.delete()
              sentEmbed.delete()
        };
    }).catch(collected => {
	message.reply('Canceled selection.');
	});
})
}
}