const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(500, 421);
const ctx = canvas.getContext('2d');

module.exports = {
    config: {
    name: 'screams',
    description: 'Funny',
    usage: `${prefix}screams [user]`,
    category: 'image',
    access: 'everyone'
},

run: async (client, message, args) => {

    let screams = 'E:/RaiBot/assets/templates/screams.jpg'

    let user = message.mentions.users.first() || message.author;

	let background = await loadImage(screams);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const myAvatar = await loadImage(message.author.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(myAvatar, 250, 20, 128, 128);

    const avatar = await loadImage(user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 200, 230, 128, 128);
    
	const attachment = new MessageAttachment(canvas.toBuffer(), 'screams.jpg');

    message.channel.send(attachment);

}
}