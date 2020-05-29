const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(778, 1063);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'trashcan',
    description: 'Funny',
    usage: `${prefix}trashcan <user>`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    let user = message.mentions.users.first();	

    if (!user) {
        return message.reply('Please provide an user!')
        };

    let trashcan = 'E:/RaiBot/assets/templates/trashcan.jpg'

	let background = await loadImage(trashcan);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await loadImage(user.displayAvatarURL({ format: 'png'}));
    ctx.drawImage(avatar, 300, 805, 180, 180);
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'trashcan.jpg');

    message.channel.send(attachment);

}
}