const { prefix, nodes } = require('../../botconfig.json');
const { version } = require('../../package.json');
const moment = require('moment');
const { ErelaClient, Utils } = require('erela.js');

module.exports = client => {
    console.log(`[${moment().format('M/D/YYYY h:mm a')}] ${client.user.username} v${version} is online`);

    client.user.setActivity(`${prefix}help || v${version}`, { type: 'PLAYING'})

    client.music = new ErelaClient(client, nodes)
    .on('nodeError', console.log)
    .on('nodeConnect', () => console.log('Succesfully created a new Node.'))
    .on('queueEnd', player => {
        player.textChannel.send('Queue has ended.')
        return client.music.players.destroy(player.guild.id)
    })
    .on('trackStart', ({textChannel}, {title, duration}) => textChannel.send(`Now playing: \`${title}\``))

    client.levels = new Map()
    .set('none', 0.0)
    .set('low', 0.10)
    .set('medium', 0.15)
    .set('high', 0.25);
}
