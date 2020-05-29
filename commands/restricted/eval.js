const { prefix, ownerId } = require('../../botconfig.json');
const colours = require('../../colours.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
    name: 'eval',
    description: 'Evalutes js code',
    usage: `${prefix}eval <code>`,
    category: 'restricted',
    access: 'restricted'
},

run: async (client, message, args) => {

  if (message.author.id != ownerId) return message.reply('You don\'t have permission to use this command.')

  let toEval = args.slice(0).join(' ')
  let evaluated = eval(toEval)
  try {
    if(toEval) {
      let hrStart = process.hrtime()
      let hrDiff;
      hrDiff = process.hrtime(hrStart)
      return message.channel.send(`Executed in **${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.** \`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })

    } else {
      message.reply('Please provide something to evaluate!')
    }
  } catch(e) {
    message.reply(`Error whilst evaluating: \`${e.message}\``)
  }
  
}
} 