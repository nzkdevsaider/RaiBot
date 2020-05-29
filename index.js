const { token, prefix } = require('./botconfig.json');
const { Client, Collection, MessageEmbed, MessageCollector } = require('discord.js');
const client = new Client()
const moment = require('moment');
const colours = require('./colours.json');
const { writeFile } = require('fs');
const { stripIndents } = require('common-tags');
const xp = require('./xp.json');
const coins = require('./coins.json');

// Login

client.login(token);

// Events & Command Handler

['commands', 'aliases'].forEach(x => client [x] = new Collection());
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(client))

// Message Event

client.on('message', message => {

// Message Listener

console.log(`[${moment().format('LT')}] ${message.author.tag} | ${message.guild.name} ~ ${message.content}`)

// XP System

if (!message.author.bot) {

let xpAdd = Math.floor(Math.random() * 5) + 10;

if (!xp[message.author.tag]) {
  xp[message.author.tag] = {
    xp: 0,
    level: 1,
  };
}

xp[message.author.tag].xp = xp[message.author.tag].xp + xpAdd;
let curXp = xp[message.author.tag].xp;
let curLvl = xp[message.author.tag].level;
let nxtLvl = xp[message.author.tag].level * 500;

if (nxtLvl <= xp[message.author.tag].xp) {
  xp[message.author.tag].level = curLvl + 1;
  const lvlEmbed = new MessageEmbed()
  .setTitle(`Congrats, ${message.author.tag}! You are now level ${curLvl + 1}.`)
  .setColor(colours.lime)
  message.channel.send(lvlEmbed)
}
writeFile('./xp.json', JSON.stringify(xp), (err) => {
  if(err) console.log(err)
})

// Coin System

if (!message.author.bot) {

  if (!coins[message.author.tag]) {
    coins[message.author.tag] = {
      coins: 0,
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;

  if (coinAmt === baseAmt) {
    coins[message.author.tag] = {
      coins: coins[message.author.tag].coins + coinAmt
    };
    writeFile('./coins.json', JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });
    const coinEmbed = new MessageEmbed()
    .setTitle(`Congrats, ${message.author.tag}! ${coinAmt} coins were added to your account.`)
    .setColor(colours.yellow)
    message.channel.send(coinEmbed)
  }
}
}});

// Invite Message

  const imEmbed = new MessageEmbed()
  .setDescription(stripIndents`
  Thanks for inviting me!

  To get started type \`${prefix}help\`.

  - View commands inside category using \`${prefix}help <category>\`.
  - View information about command using \`${prefix}help <command>\`.
  - Setup all required text channels using \`${prefix}setup\`. *To remove these channels, trigger the command again.*

  If you want to suggest a feature or report a bug feel free to join my [server](https://discord.gg/KD457qA) or use \`${prefix}ticket <text>\`.
  `)
  .setColor(colours.default)

client.on('guildCreate', guild => {

  const generalChannel = guild.channels.cache.find(ch => ch.name === 'general');

generalChannel.send(imEmbed)

  if (!generalChannel) {
    let defaultChannel = '';
    guild.channels.cache.forEach((channel) => {
    if (channel.type == 'text' && defaultChannel == '') {
    if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
    defaultChannel = channel;
    }
  }
})

defaultChannel.send(imEmbed)
  }
})

// Join-Leave Chat

client.on('guildMemberAdd', member => {
  let joinedReplies = [`Where's **${member.user.tag}**? In the server!`, `We've been expecting you, **${member.user.tag}**`,`**${member.user.tag}** just showed up. Hold my beer.`,
  `**${member.user.tag}** just joined. Can I get a heal?`, `Welcome, **${member.user.tag}**. Stay awhile and listen.`
];
  let joinedResponse = joinedReplies[Math.floor(Math.random() * joinedReplies.length)];
  const channel = member.guild.channels.cache.find(ch => ch.name === 'join-leave');
  if (!channel) return;
  const joinedEmbed = new MessageEmbed()
    .setColor(colours.green)
    .setDescription(joinedResponse)
  channel.send(joinedEmbed);
});
client.on('guildMemberRemove', member => {
  let leftReplies = [`**${member.user.tag}** has quit. Party's over.`, `Whoopsies! **${member.user.tag}** left us.`, `Commander, we've lost **${member.user.tag}**!`,
  `Oh no. **${member.user.tag}** left.`, `Nooooooo, **${member.user.tag}** closed the door.`
];
  let leftResponse = leftReplies[Math.floor(Math.random() * leftReplies.length)];
  const channel = member.guild.channels.cache.find(ch => ch.name === 'join-leave');
  if (!channel) return;
  const leftEmbed = new MessageEmbed()
    .setColor(colours.red)
    .setDescription(leftResponse)
  channel.send(leftEmbed);
});

// Setup

client.on('message', message => {

  if (message.content === `${prefix}setup`) {
    if (!message.member.hasPermission('MANAGE_CHANNELS', 'ADMINISTRATOR') || !message.guild.owner) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'ADMINISTRATOR'])) return message.channel.send('I do not have permission to create channels!')

    const jlChannel = message.guild.channels.cache.find(ch => ch.name === 'join-leave');
    const mlChannel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
    const fgChannel = message.guild.channels.cache.find(ch => ch.name === 'free-games');

    const filter = m => m.author.id === message.author.id;

    message.reply('**Are you sure you want to initiate setup?** Type **\'Yes\'** to confirm.\nYou have 5 seconds to reply.')
    .then(() => {
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ['time'],
      }).then((collected) => {
        if (collected.first().content.toLowerCase() === 'yes') {

    message.channel.send(`Setup initiated by **${message.author}**`)
    message.channel.send(`Setting up...**`).then(m => {

    let ping = m.createdTimestamp - message.createdTimestamp

    if (!jlChannel || !mlChannel || !fgChannel) {

        message.guild.channels.create('join-leave', { type: 'text',
        permissionOverwrites: [
            {
                id: message.channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES'],
            },
        ],
    });
            message.guild.channels.create('mod-logs', { type: 'text',
        permissionOverwrites: [
            {
                id: message.channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES'],
            },
        ],
    });
                message.guild.channels.create('free-games', { type: 'text',
        permissionOverwrites: [
            {
                id: message.channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES'],
            },
        ],
    });

m.edit(`Setup completed in **${ping}ms**`)

} else {
    jlChannel.delete();
    mlChannel.delete();
    fgChannel.delete();

m.edit(`De-setup completed in **${ping}ms**`)
}
})
}
if (collected.first().content.toLowerCase() !== 'yes') {
    message.channel.send('Setup cancelled - Your reply was wrong!')
}
}).catch(() => {
    message.channel.send('Setup cancelled - You were too slow!')
});

})
  }
  })