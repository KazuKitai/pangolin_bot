var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // It will listen for messages that will start with `§`
    if (message.substring(0, 1) == '§') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // §ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // §tableflip
            case 'tableflip':
				bot.sendMessage({
					to: channelID,
					message: '(ノಠ益ಠ)ノ彡┻━┻'
				});
            break;
            // §unflip
			case 'unflip':
				bot.sendMessage({
					to: channelID,
					message: '┬──┬ ノ( ゜-゜ノ)'
				});
            break;
            // §stupid
			case 'stupid':
				bot.sendMessage({
					to: channelID,
					message: 'I am the almighty pangolin-bot. You are all stupid.'
				});
            break;
            // §omae
			case 'omae':
				bot.sendMessage({
					to: channelID,
					message: 'NANI ?!?'
				});
			break;
         }
     }
});