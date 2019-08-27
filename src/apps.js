const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const vidUtils = require('./vidUtils');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.discord.game, {
        type: "WATCHING"
    });
});

client.on('message', msg => {
    if (!msg.content.startsWith(config.discord.prefix))
        return;

    if (!(msg.channel instanceof Discord.DMChannel)
        && msg.guild.me.hasPermission("MANAGE_MESSAGES")
        && msg.deletable)
        msg.delete().catch(o => { });

    let content = msg.content.slice(config.discord.prefix.length);

    if (!content) {
        msg.channel.send(`<@${msg.author.id}>` + vidUtils.getAllVideosTXT(), {
            split: true
        }).catch(o => { });
    } else {
        const items = vidUtils.getVideos(content);
        if (items.length == 0)
            msg.channel.send(`<@${msg.author.id}> **Filtre :** ${content}\n\n:x: Aucun résultat`).catch(o => { });
        else if (items.length > 1)
            msg.channel.send(`<@${msg.author.id}> **Filtre :** ${content}\n` + vidUtils.getVideosTXT(items), {
                split: true
            }).catch(o => { });
        else
            msg.channel.send({
                files: [{
                    attachment: items[0].folder,
                    name: items[0].name + "." + items[0].extension
                }]
            }).catch(o => { });
    }
});

client.login(config.discord.token);