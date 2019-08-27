const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const vidUtils = require('./vidUtils');
const commands = require("./commands");

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

    commands.content(msg);
});

client.login(config.discord.token);