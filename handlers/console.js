module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener('data', res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.cache.find(ch => ch.name === 'general').send(x.join(' '));
});
}