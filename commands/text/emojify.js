const { prefix } = require('../../config.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'emojify',
    description: ':regional_indicator_e: :regional_indicator_m: :regional_indicator_o: :regional_indicator_j: :regional_indicator_i: :regional_indicator_f: :regional_indicator_i: :regional_indicator_e: :regional_indicator_s:       :regional_indicator_a:      :regional_indicator_t: :regional_indicator_e: :regional_indicator_x: :regional_indicator_t:',
    usage: `${prefix}emojify <text>`,
    category: 'text',
    access: 'everyone'
},

run: async (client, message, args) => {

    message.delete()

    function emojify(str) {
        if (typeof str === 'string') {
            return Array.prototype.map.call(str, (e, i, a) => {
                if (/[a-zA-Z]/.test(e)) {
                    return ':regional_indicator_' + e.toLowerCase() + ':'
                } else {
                    return e;
                }
            }).join(' ');
        }
    }

    let textToEmojify = args.slice(0).join(' ')
    if (!textToEmojify) return message.reply('Please input a text to emojify!')

    let emojifiedText = emojify(textToEmojify)
    if (emojifiedText.length > 2000) return message.reply('Your text is too long!')
    
message.channel.send(emojifiedText)

}
}