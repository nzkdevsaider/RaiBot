const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(512, 472);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'virgin',
    description: 'Funny',
    usage: `${prefix}virgin [user]`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let virgin = 'E:/RaiBot/assets/templates/virgin.png'

	let background = await loadImage(virgin);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await loadImage(user.displayAvatarURL({ format: 'png'}));
    ctx.drawImage(avatar, 103, 347, 105, 105);
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'virgin.png');

    message.channel.send(attachment);

}
}