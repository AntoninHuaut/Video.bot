const vidUtils = require("../vidUtils");
const config = require("../../config");

module.exports = function (msg) {
	if (!config.bot.owner.includes(msg.author.id))
		return msg.reply("Vous ne pouvez pas faire cette commande").catch((o) => {});

	vidUtils.refreshCache();
	msg.reply("Le cache a été rafraîchie");
};
