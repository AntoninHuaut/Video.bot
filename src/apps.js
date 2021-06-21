const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
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

    if (msg.deletable && msg.guild.me.hasPermission("MANAGE_MESSAGES"))
        msg.delete().catch(o => {});

    if (msg.content == config.discord.prefix + 'reload') return commands.reload(msg);

    commands.content(msg);
});

client.login(config.discord.token);