const config = require("../../config");
const vidUtils = require("../vidUtils");

module.exports = function (msg) {
    const content = msg.content.slice(config.discord.prefix.length).trim();

    content ? filtered(content, msg) : unfiltered(msg);
};

function unfiltered(msg) {
    msg.reply(vidUtils.getAllVideosTXT(), {
            split: true,
        })
        .catch((o) => {});
}

function filtered(content, msg) {
    const items = vidUtils.getVideos(content);
    if (items.length == 0)
        msg.reply(`**Filtre :** ${content}\n\n:x: Aucun résultat`)
        .catch((o) => {});
    else if (items.length > 1)
        msg.reply(`**Filtre :** ${content}\n` + vidUtils.getVideosTXT(items), {
            split: true,
        })
        .catch((o) => {});
    else
        msg.channel.send({
            content: `<@${msg.author.id}>`,
            files: [{
                attachment: items[0].folder,
                name: items[0].name + "." + items[0].extension,
            }, ],
        })
        .catch((o) => {});
}