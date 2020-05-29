const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1125, 1097);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'retarded',
    description: 'Funny',
    usage: `${prefix}retarded <text>`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    if (args.slice(0).join(' ').length < 1) {
        return message.reply('Please input a text!');
        };

    if (args.length > 24) {
        return message.reply('Your text is too long! **24 characters is the limit.**');

    } else {

    let retarded = 'E:/RaiBot/assets/templates/retarded.jpg'

	let background = await loadImage(retarded);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '48px arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(args.slice(0).join(' '), 850, 200)
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'retarded.jpg');

    message.channel.send(attachment);
}

}
}