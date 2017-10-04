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
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Prevent bot to answer another bot
    if (message.author.bot) return;
    // It will listen for messages that will start with `§`
    if (message.substring(0, 1) == '§') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
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

     if (message.toLowerCase().includes('omae wa mo shindeiru')) {
         bot.sendMessage({
             to: channelID,
             message: 'NANI ?!'
         });
     }

     if ((message.toLowerCase().includes('chine'))
        || message.toLowerCase().includes('tine') 
        || message.toLowerCase().includes('chinois') 
        || message.toLowerCase().includes('chinoise') 
        || message.toLowerCase().includes('tinois')
        || message.toLowerCase().includes('tinoise')) {
         bot.sendMessage({
             to: channelID,
             message: 'Tine ? Tinois ? Ping pong mahjong dugong !'
         });
     }

     if (message.toLowerCase().includes('gnap')) {
         if ( Math.floor(Math.random() * (1000 + 1)) > 950) {
            bot.sendMessage({
                to: channelID,
                message: 'Attention, cas de rage potentiel, prenez garde aux gnappeurs !'
            });
         }
     }
});