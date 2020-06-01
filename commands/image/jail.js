const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(256, 256);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'jail',
    description: 'Funny',
    usage: `${prefix}jail <user>`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    let user = message.mentions.users.first();	

    if (!user) {
        return message.reply('Please provide an user!')
        };

    let jail = 'E:/RaiBot/assets/templates/jail.png'

    let background = await loadImage(user.displayAvatarURL({ format: 'png'}));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    let image = await loadImage(jail);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'jail.png');

    message.channel.send(attachment);

}
}