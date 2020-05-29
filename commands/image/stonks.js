const { prefix } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(512, 472);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'stonks',
    description: 'Funny',
    usage: `${prefix}stonks <text>`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    if (args.length < 1) {
        return message.reply('Please input a text!');
        };

    if (args.length > 40) {
        return message.reply('Your text is too long! **40 characters is the limit.**');

    } else {

    let stonks = 'E:/RaiBot/assets/templates/stonks.png'

	let background = await loadImage(stonks);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '28px arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(args, 256, 40)
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'stonks.png');

    message.channel.send(attachment)
}

}
}