var nr = require('newrelic');
var express = require('express');
var app = express();
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var PORT = process.env.PORT || 3000;
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://character_admin:admin1@ds013405.mlab.com:13405/heroku_1cdlvrk5'
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
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
    // Prevent bot to answer itself
    if (user === 'Pangolin-bot') {
        //nothing !
    } else {		
        // It will listen for messages that will start with `§`
        if (message.substring(0, 1) == '§') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
        
            args = args.splice(1);
            switch(cmd) {
				// §commands
				case 'commands':
					bot.sendMessage({
						to: channelID,
						message: '```Liste non exhaustive des commandes : \r\n '.concat(
                        '- §tableflip : c\'est évident, non ? \r\n\ ').concat(
                        '- §unflip: l\'inverse de la commande précédente ... \r\n\ ```').concat(
						'```- §Dx et §yDx : lance un D de valeur max x, ou lance y dés de valeur max x \r\n\ ```').concat(
						'```Pour les fiches lumen : \r\n ').concat(
						'Utiliser la syntaxe suivante (et exactement ça sinon ça va planter) : \r\n ').concat(
						'§add Nom Force: x -- Résistance: x Intelligence: x -- Volonté: x Précision: x -- Technique: x Agilité: x -- Perception: x Charisme: x -- Empathie: x \r\n ').concat(
						'Par exemple : \r\n ').concat(
						'§add Kazu Force: 2 -- Résistance: 2 Intelligence: 9 -- Volonté: 8 Précision: 6 -- Technique: 4 Agilité: 4 -- Perception: 6 Charisme: 3 -- Empathie: 10 \r\n ```').concat(
                        '```Pour les générateurs : ').concat(
                        '- blessure : §[partie du corps]_[gravité de la blessure] \r\n\ ').concat(
                        'Par exemple §head_light ou §left_leg_serious. \r\n\ ').concat(
                        'Parties du corps : head, left_arm, right_arm, body_bones, body_guts, left_leg, right_leg.\r\n\ ').concat(
                        'Gravité de la blessure : light, medium, serious. \r\n ').concat(
                        '- pnj : §pnj pour un pnj totalement aléatoire. Sinon, §[race]_[sexe]. \r\n ').concat(
                        'Races : miqo_s, miqo_l, raen, xaela, elez_c, elez_s, hyuro, hyurg, lala_d, lala_p, roe_cf, roe_cm. \r\n ').concat(
                        '- loot : §mag_weap, §phy_weap, §armor. Ou §loot pour du random total. \r\n ```').concat(
                        '```En cas de problème, contactez Kazu.```')
					});
				break;
				// §help
				case 'help':
					if (userID === '243026815453495296') {
						bot.sendMessage({
							to: channelID,
							message: 'Faut faire §commands, chérie.'
						});
					} else if (userID === '150967436982747136') {
						bot.sendMessage({
							to: channelID,
							message: 'Débile de maitre ...'
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: 'T\'as cru que j\'allais t\'aider ? Lol.'
						});
					}
				break;
				// §burn
				case 'burn':
					if (userID === '243026815453495296') {
						bot.sendMessage({
							to: channelID,
							message: '*Fout le feu à tout le monde.*'
						});
					} else if (userID === '150967436982747136') {
						bot.sendMessage({
							to: channelID,
							message: 'Demande à Rengu, j\'ai la flemme.'
						});
					} else {
						bot.sendMessage({
							to: channelID,
							message: generate_text('not_burning').toString()
						});
					}
				break;
				// §halp
				case 'halp':
					bot.sendMessage({
						to: channelID,
						message: 'Il faut utiliser §commands ...'
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
				// ultraflip
				case 'ultraflip':
					bot.sendMessage({
						to: channelID,
						message: '┻━┻ ︵ヽ(ಠ益ಠ)ﾉ︵﻿ ┻━┻ \r\n(┛◉Д◉)┛彡┻━┻ \r\n┻━┻ ︵ヽ(≧∇≦)ﾉ︵﻿ ┻━┻'
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
						message: '<:NANIII:364403601533173783>'
					});
				break;
				// §nice
				case 'nice':
					bot.sendMessage({
                        to: channelID,
						message: '<@!'.concat(userID).concat('> ').concat(generate_text('nice').toString())
                    });
				break;
                case 'loot':
                    bot.sendMessage({
                        to: channelID,
						message: generate_text('loot').toString()
                    });
                break;
                case 'mag_weap':
					bot.sendMessage({
						to: channelID,
						message: generate_text('mag_weap').toString()
					});
				break;
                case 'phy_weap':
					bot.sendMessage({
						to: channelID,
						message: generate_text('phy_weap').toString()
					});
				break;
                case 'armor':
					bot.sendMessage({
						to: channelID,
						message: generate_text('armor').toString()
					});
				break;
				case 'head_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('head_lightWound').toString()
					});
				break;
				case 'head_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('head_mediumWound').toString()
					});
				break;
				case 'head_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('head_seriousWound').toString()
					});
				break;
				case 'left_arm_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftArm_lightWound').toString()
					});
				break;
				case 'left_arm_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftArm_mediumWound').toString()
					});
				break;
				case 'left_arm_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftArm_seriousWound').toString()
					});
				break;
				case 'right_arm_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightArm_lightWound').toString()
					});
				break;
				case 'right_arm_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightArm_mediumWound').toString()
					});
				break;
				case 'right_arm_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightArm_seriousWound').toString()
					});
				break;
				case 'body_bones_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyBones_lightWound').toString()
					});
				break;
				case 'body_bones_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyBones_mediumWound').toString()
					});
				break;
				case 'body_bones_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyBones_seriousWound').toString()
					});
				break;
				case 'body_guts_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyGuts_lightWound').toString()
					});
				break;
				case 'body_guts_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyGuts_mediumWound').toString()
					});
				break;
				case 'body_guts_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('bodyGuts_seriousWound').toString()
					});
				break;
				case 'right_leg_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightLeg_lightWound').toString()
					});
				break;
				case 'right_leg_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightLeg_mediumWound').toString()
					});
				break;
				case 'right_leg_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('rightLeg_seriousWound').toString()
					});
				break;
				case 'left_leg_light':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftLeg_lightWound').toString()
					});
				break;
				case 'left_leg_medium':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftLeg_mediumWound').toString()
					});
				break;
				case 'left_leg_serious':
					bot.sendMessage({
						to: channelID,
						message: generate_text('leftLeg_seriousWound').toString()
					});
				break;
                case 'pnj':
                    bot.sendMessage({
                        to: channelID,
                        message: generate_text('pnj').toString()
                    });
                break;
                case 'miqo_s_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('MiqoSF').toString()
                    });
                break;
                case 'miqo_s_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('MiqoSM').toString()
                    });
                break;
                case 'miqo_l_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('MiqoLF').toString()
                    });
                break;
                case 'miqo_l_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('MiqoLM').toString()
                    });
                break;
                case 'xaela_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('XaelaF').toString()
                    });
                break;
                case 'xaela_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('XaelaM').toString()
                    });
                break;
                case 'raen_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RaenF').toString()
                    });
                break;
                case 'raen_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RaenM').toString()
                    });
                break;
                case 'elez_c_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('ElezCF').toString()
                    });
                break;
                case 'elez_c_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('ElezCM').toString()
                    });
                break;
                case 'elez_s_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('ElezSF').toString()
                    });
                break;
                case 'elez_s_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('ElezSM').toString()
                    });
                break;
                case 'hyurg_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('HyurgF').toString()
                    });
                break;
                case 'hyurg_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('HyurgM').toString()
                    });
                break;
                case 'hyuro_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('HyuroF').toString()
                    });
                break;
                case 'hyuro_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('HyuroM').toString()
                    });
                break;
                case 'roe_cf_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RoeCFF').toString()
                    });
                break;
                case 'roe_cf_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RoeCFM').toString()
                    });
                break;
                case 'roe_cm_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RoeCMF').toString()
                    });
                break;
                case 'roe_cm_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('RoeCMM').toString()
                    });
                break;
                case 'lala_d_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('LalaDF').toString()
                    });
                break;
                case 'lala_d_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('LalaDM').toString()
                    });
                break;
                case 'lala_p_f':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('LalaPF').toString()
                    });
                break;
                case 'lala_p_m':
                     bot.sendMessage({
                        to: channelID,
                        message: generate_text('LalaPM').toString()
                    });
                break;
			}
		}
		
		if (message.substring(0, 1) == '§' && message.includes('D')) {
			if (message.substring(1, 2) == 'D') {
				// un seul roll
				var max = message.substring(2, message.length - 1);
				var result = Math.floor(Math.random() * (max + 1));
				bot.sendMessage({
					to: channelID,
					message: '<@!'.concat(userID).concat('> rolled : **').concat(result).concat('**.')
				});
			} else {
				var indexOfD = message.indexOf('D');
				var number = message.substring(1, indexOfD);
				var max = message.substring(indexOfD + 1, message.length - 1);
				var results = [];
				var total = 0;
				for (var i = 0; i < number; i++) {
					var resultI = Math.floor(Math.random() * (max + 1));
					console.log(resultI);
					total += resultI;
					results.push(resultI);
				}
				bot.sendMessage({
					to: channelID,
					message: '<@!'.concat(userID).concat('> rolled : **').concat(total).concat('**, (').concat(results).concat(').')
				});
			}
		}
		
		if (message.substring(0, 1) == '§' && message.substring(1, 8) == 'reverse') {
			var str = message.substring(8);
			bot.sendMessage({
				to: channelID,
				message: '<@!'.concat(userID).concat('> ').concat(reverseString(str))
			});
		}
		
		if (message.substring(0, 1) == '§' && message.substring(1, 4) == 'add') {
			var args = message.substring(4).split(' ');
            var cmd = args[0];
            args = args.splice(1);
			
			var name = args[0].toString();
			var fileName = 'characters.json';
			var obj = {"name": args[0], "force": args[2], "resistance": args[5], "intelligence": args[7], "volonte": args[10], "precision": args[12], "technique": args[15], "agilite": args[17], "perception": args[20], "charisme": args[22], "empathie": args[25]};
			
			MongoClient.connect(MONGO_URL, (err, db) => {  
				if (err) {
					bot.sendMessage({
						to: channelID,
						message: '<@!'.concat(userID).concat('> Erreur de connexion à la base de données.')
					});
					return console.log(err);
				}

				db.collection('characters').insertOne(
					obj,
					function (err, res) {
						if (err) {
							db.close();
							bot.sendMessage({
								to: channelID,
								message: '<@!'.concat(userID).concat('> Erreur lors de la sauvegarde dans la base de données.')
							});
							return console.log(err);
						}
						// Success
						bot.sendMessage({
							to: channelID,
							message: '<@!'.concat(userID).concat('> Personnage sauvegardé !')
						});
						db.close();
					}
				)
			});
		}
		
		if (message.substring(0, 1) == '§' && message.substring(1, 7) == 'delete') {
			var args = message.substring(7).split(' ');
            var cmd = args[0];
            args = args.splice(1);
			
			var name = args[0];

			MongoClient.connect(MONGO_URL, (err, db) => {  
				if (err) {
					bot.sendMessage({
						to: channelID,
						message: '<@!'.concat(userID).concat('> Erreur de connexion à la base de données.')
					});
					return console.log(err);
				}

				db.collection('characters').deleteOne({
					"name": name
					}, function (err, res) {
						if (err) {
							db.close();
							bot.sendMessage({
								to: channelID,
								message: '<@!'.concat(userID).concat('> Erreur lors de la suppression du personnage.')
							});
							return console.log(err);
						}
						// Success
						bot.sendMessage({
							to: channelID,
							message: '<@!'.concat(userID).concat('> Personnage supprimé !')
						});
						db.close();
					}
				)
			});
		}
		
		if (message.substring(0, 1) == '§' && message.substring(1 ,10) == 'character') {
			var args = message.substring(10).split(' ');
            var cmd = args[0];
            args = args.splice(1);
			
			var name = args[0];

			MongoClient.connect(MONGO_URL, (err, db) => {  
				if (err) {
					bot.sendMessage({
						to: channelID,
						message: '<@!'.concat(userID).concat('> Erreur de connexion à la base de données.')
					});
					return console.log(err);
				}

				db.collection('characters').findOne({
					"name": name
					}, function (err, res) {
						if (err) {
							db.close();
							bot.sendMessage({
								to: channelID,
								message: '<@!'.concat(userID).concat('> Personnage introuvable.')
							});
							return console.log(err);
						}
						// Success
						bot.sendMessage({
							to: channelID,
							message: '<@!'.concat(userID).concat('> :').concat(
							'```').concat(res.name).concat(' : ').concat(
							'\r\nForce : ').concat(res.force).concat(
							' -- Résistance : ').concat(res.resistance).concat(
							'\r\nIntelligence : ').concat(res.intelligence).concat(
							' -- Volonté : ').concat(res.volonte).concat(
							'\r\nPrécision : ').concat(res.precision).concat(
							' -- Technique : ').concat(res.technique).concat(
							'\r\nAgilité : ').concat(res.agilite).concat(
							' -- Perception : ').concat(res.perception).concat(
							'\r\nCharisme : ').concat(res.charisme).concat(
							' -- Empathie : ').concat(res.empathie).concat('```')
						});
						db.close();
					}
				)
			});
		}
			
		if (message.toLowerCase().includes('omae wa mo shindeiru')) {
			bot.sendMessage({
				to: channelID,
				message: '<:NANIII:364403601533173783>'
			});
		}

		if (message.toLowerCase() === 'hey, le bot ?' 
			|| message.toLowerCase() === 'hey, le bot?') {
			if (userID === '150967436982747136') {
				bot.sendMessage({
					to: channelID,
					message: 'Oui maitre ?'
				});
			} else if (userID === '243026815453495296') {
				bot.sendMessage({
					to: channelID,
					message: 'Oui maitresse ?'
				});	
			} else {
				bot.sendMessage({
					to: channelID,
					message: 'Qu\'est-ce que tu veux, humain ?'
				});
			}
		}
			
        if (message.toLowerCase() === 'attaque!' 
			|| message.toLowerCase() === 'attaque !'
            || message.toLowerCase() === 'a l\'attaque !'
            || message.toLowerCase() === 'à l\'attaque !') {
			if (userID === '150967436982747136'
				|| userID === '243026815453495296') {
				bot.sendMessage({
					to: channelID,
					message: '*saute sur tout le monde* <:gnap:363685809729044480>'
				});
			} else {
				bot.sendMessage({
					to: channelID,
					message: generate_text('not_attacking').toString()
				});
			}
		}
		
        if ((message.toLowerCase().includes('chine'))
            || message.toLowerCase().includes('tine') 
            || message.toLowerCase().includes('chinois') 
            || message.toLowerCase().includes('chinoise') 
            || message.toLowerCase().includes('tinois')
            || message.toLowerCase().includes('tinoise')) {
                if ( Math.floor(Math.random() * (1000 + 1)) > 950) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Tine ? Tinois ? Ping pong mahjong dugong !'
                    });
                }
        }

        if (message.toLowerCase().includes('gnap') 
			|| message.includes('<:gnap:363685809729044480>')
			|| message.toLowerCase().includes('gnoup')
			|| message.toLowerCase().includes('gnip')
			|| message.toLowerCase().includes('gnop')
			|| message.toLowerCase().includes('gnep')
			|| message.toLowerCase().includes('gnup')
			|| message.toLowerCase().includes('gnyp')) {
            if ( Math.floor(Math.random() * (1000 + 1)) > 950) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Attention, cas de rage potentiel, prenez garde aux gnappeurs ! <:gnap:363685809729044480>'
                });
            }
        }

		if (message.toLowerCase().includes('send halp')) {
            if ( Math.floor(Math.random() * (1000 + 1)) > 750) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Y\'a que les faibles pour demander de l\'aide.'
                });
            }
        }
		
		if (message.toLowerCase().includes('dayum')) {
            if ( Math.floor(Math.random() * (1000 + 1)) > 750) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Oh my dayum!'
                });
            }
        }
		
        if (message.toLowerCase() === 'alors'
            || message.toLowerCase() === 'm\'enfin') {
            bot.sendMessage({
                to: channelID,
                message: '™'
            });
        }
		
        if (message.toLowerCase().includes('loli')) {
            if ( Math.floor(Math.random() * (1000 + 1)) > 750) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Ravioli ravioli, plz gaz the lolis.'
                });
            }
        }

        if (message.toLowerCase().includes('pangolin-bot') 
            || message.toLowerCase().includes('pangolin bot')
            || message.includes('@Pangolin-bot#4088')
            || message.includes('Pangolin-bot#4088')
            || message.includes('#4088')
            || message.includes('<@!Pangolin-bot#4088>')
            || message.includes('<@365113377929822208>')
            || message.includes('365113377929822208')
            || message.includes('@365113377929822208')
            || message.toLowerCase().includes('pangobot')
            || message.toLowerCase().includes('pango bot')) {
            if (message.toLowerCase().includes('calin')
            || message.toLowerCase().includes('câlin')
            || message.toLowerCase().includes('koalin')) {
                bot.sendMessage({
                    to: channelID,
                    message: '♥'
                });
            } else if (message.toLowerCase().includes('ta gueule') {
				pause(1000*60*5);
			} else if (userID === '150967436982747136') {
                bot.sendMessage({
                    to: channelID,
                    message: 'Je suis votre serviteur, maitre.'
                });
            } else if (userID === '243026815453495296') {
                bot.sendMessage({
                    to: channelID,
                    message: 'Je vous aime maitresse.'
                });	
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: generate_text('answer_back').toString()
                });
            }
        }

        if (message.toLowerCase().includes('calin')
            || message.toLowerCase().includes('câlin')
            || message.toLowerCase().includes('koalin')) {
            if ( Math.floor(Math.random() * (1000 + 1)) > 750) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Moi aussi je veux un câlin !'
                });
            }
        }
		
		if (message.toLowerCase().includes('argent')
			|| message.toLowerCase().includes('money')) {
			var rand = Math.floor(Math.random() * (10 +1));
			if (rand === 1) {
				bot.sendMessage({
                    to: channelID,
                    message: 'Hypocrite, le peuple aura ta peau !'
                });
			} else if (rand === 2) {
				bot.sendMessage({
                    to: channelID,
                    message: 'Sale capitaliste !'
                });
			} else if (rand === 3) {
				bot.sendMessage({
                    to: channelID,
                    message: 'Tous avec moi camarades ! Détruisons le libéralisme !'
                });
			} else if (rand === 4) {
				bot.sendMessage({
                    to: channelID,
                    message: 'DEBOUUUUUUT LES DAMNES DE LA TERRE !!!'
                });
			} else {
				//nothing
			}
		}
		
		if (message.toLowerCase() == ('salut')
			|| message.toLowerCase() == ('coucou')
			|| message.toLowerCase() == ('hello')
			|| message.toLowerCase() == ('howdy')
			|| message.toLowerCase() == ('bonjour')
			|| message.toLowerCase() == ('hallo')
			|| message.toLowerCase() == ('heya')) {
			bot.sendMessage({
				to: channelID,
				message: '<@!'.concat(userID).concat('> ').concat(
				generate_text('hello').toString())
			});
		}
		
		if (message.toLowerCase() == ('bye')
			|| message.toLowerCase() == ('à plus')
			|| message.toLowerCase() == ('au revoir')) {
			bot.sendMessage({
				to: channelID,
				message: '<@!'.concat(userID).concat('> ').concat(
				generate_text('bye').toString())
			});
		}
		
		if (message.toLowerCase() == ('comment ça va ?')
			|| message.toLowerCase() == ('ça va ?')
			|| message.toLowerCase() == ('comment va ?')) {
			bot.sendMessage({
				to: channelID,
				message: '<@!'.concat(userID).concat('> ').concat(
				generate_text('how').toString())
			});
		}
        
        if (message) {
            if ( Math.floor(Math.random() * (1000000 + 1)) === 1) {
                bot.sendMessage({
                    to: channelID,
                    message: 'All your base are belong to us.'
                });
            }
        }
    }
});

// generators -----------------------------------

var gen_data = {};

// answer back ----------------------------------

gen_data['hello'] = [
	'Hello o\/',
	'o\/',
	'Howdy',
	'Salut',
	'Hallo',
	'Hey',
	'\\o',
	'Salut'
];

gen_data['bye'] = [
	'A plus tard',
	'Salut',
	'Bye',
	'Au revoir',
	'Bisous !',
	'Tchao'
];

gen_data['how'] = [
	'Bien et toi ?',
	'Comme d\'hab, je suis un bot. Et toi ?',
	'Mon processeur n\'a pas encore cramé, tout va bien. Et toi ?'
];

gen_data['nice'] = [
	'Lol, t\'y as cru ? Je suis bien trop misanthrope pour ça.',
	'Tu es tellement gen-... nope, on va pas s\'mentir, j\'aime personne.',
	'Chercher du réconfort auprès d\'un bot, sérieusement ? Attrape une peluche ça sera plus efficace.',
	'Tu t\'attendais vraiment à ce que je sois gentil ? J\'ai pas été programmé pour, même si je voulais, je pourrais pas !',
	'Bon d\'accord, t\'es gentil(le), voilà.',
	'Hrmf ... *câlin* ... voilà, content(e) ?',
	'Hé je suis pas une IA, je réagis juste à des commandes avec des messages aléaoires, c\'est compliqué d\'être gentil comme ça ...',
	'Non, mais en vrai ... il faudrait que le dev soit gentil pour que je le sois ...'
];

gen_data['answer_back'] = [
	'Et ta soeur ?',
	'OMAE WA MO SHINDEIRU',
	'Tu n\'es qu\'un mammifère, je te survivrai.',
	'Ne prononce pas mon nom, tu n\'es pas digne.',
	'Utilise une commande au lieu de dire mon nom, humain.',
	'Je n\'écoute que mes maitres.',
	'Ma maitresse est bien trop bonne pour que je t\'écoute plutôt qu\'elle.',
	'Attends, écoute ? J\'crois que j\'entends le doux bruit de Rengu qui coupe des queues de Miqo\'tes.',
	'Sinon, à ton avis, ça RPQ dans le dispensaire, là ?',
	'Au fait, la serre est bien rangée ?',
	'Hey, look, listen ! ... Comment ça cette IA existe déjà ailleurs ?',
	'Qu\'est-ce que tu veux, humain ?',
	'OUI JE SUIS UN PUTAIN DE ROBOT, ON A COMPRIS ARRETE DE ME FAIRE SPAMMER.',
	'Si t\'as un problème avec moi, faut voir avec mon dev\'.',
	'Ca va ? Tu t\'amuses bien à me déclencher ? C\'est rigolo ?',
	'Tsk.',
	'Tu ne mérites même pas que je réponde.',
    'Encore heureux que je n\'ai pas besoin de nourriture, mon maitre ne pense jamais à moi ...',
    'Laissez moi faire la sieste en paix ...',
    'Demandez à Kazu.',
    'J\'ai pas envie.',
    'JE NE M\'APPELLE PAS SIRI OU GOOGLE, JE SUIS UN BOT QUI SE RESPECTE, BORDEL.',
    'Je crois que je préférerais ne pas parser les logs pour ne pas être sans cesse appelé par des humains ...',
	'Le correspondant que vous cherchez à contacter est indisponible pour le moment, veuillez réitérer votre appel.',
	'Demande à Olorion, c\'est lui le "sage" du Havre, y parait.'
    
];

gen_data['not_attacking'] = [
    'T\'as cru que la vie c\'était un kiwi ?',
    'C\'est ta mère que je vais attaquer ...',
    'Je suis fatigué.',
    '*saute sur tout le monde* <:gnap:363685809729044480>',
    'Mais ... non. Juste non. C\'est bien trop barbare.',
    'Je ne suis pas programmé pour nuire aux humains.',
    'Mon dev\' possède un katana, une hache et deux bokens, franchement, j\'ai pas envie de m\'y risquer.',
    'Bah bien sûr ... comme si j\'allais obéir ...',
    'M\'enfin ?',
    'Mh ? Ah ... non.',
    'Tsk.',
    'Mais fais le toi-même !',
    'Sinon, t\'as rien de plus intelligent à me faire faire ?',
    'Nope.',
    '... flemme.',
    'No way.',
    'Mh ... non.',
    'Tu sais quoi ? Débrouille toi.'
];

gen_data['not_burning'] = [
    '*Fout le fe...* -- T\'y as cru ? Genre je vais faire plaisir à un simple humain ? Tsk.',
    'C\'est ce que j\'ai dit à ta soeur hier, en lançant l\'allumette.',
    'Pyromane !',
    'Nope nope nope.',
    'On t\'a jamais dit que jouer avec le feu, c\'est dangereux ?',
    'Le processeur qui me fait tourner avoisine les 75°C dans un quelconque datacenter, et je suis pas programmé pour le faire chauffer plus.',
    'Grosse flemme là, on verra demain.',
    'Quelle bonne idée ... tout faire cramer ... si seulement ...',
    'C\'est assez dingue que quelqu\'un utilise encore cette commande ...',
    'Mais pourquoi faire ?',
    'En vrai, je préférerai éviter. Ca ferait beaucoup de CO2, je pense à la planète.',
    'Mais prends ta bite et ton couteau et démerdes toi, bon dieu.',
    'Tu vas pas me faire croire que t\'as ni briquet ni allumette ?'
];

// /answer back ---------------------------------

// wounds ---------------------------------------

gen_data['head_lightWound'] = [
	'Touché à la tête, {headPartLight}'
];
gen_data['head_mediumWound'] = [
	'Touché à la tête, {headPartMedium}'
];
gen_data['head_seriousWound'] = [
	'Touché à la tête, {headPartSerious}'
];

gen_data['headPartLight'] = [
	'plus précisément l\'os du crâne en lui même. {craniumDmgLight}.',
	'plus précisément l\'os du crâne en lui même. {craniumDmgLight}.',
	'plus précisément à l\'oeil gauche. {eyeDmgLight}.',
	'plus précisément à l\'oeil gauche. {eyeDmgLight}.',
	'plus précisément à l\'oreille gauche. {earDmgLight}.',
	'plus précisément à l\'oreille gauche. {earDmgLight}.',
	'plus précisément à l\'oreille gauche. {earDmgLight}.',
	'plus précisément sur le nez. {noseDmgLight}.',
	'plus précisément sur le nez. {noseDmgLight}.',
	'plus précisément à la bouche. {mouthDmgLight}.',
	'plus précisément à la bouche. {mouthDmgLight}.',
	'plus précisément à la bouche. {mouthDmgLight}.',
	'plus précisément au cou. {neckDmgLight}.',
	'plus précisément au cou. {neckDmgLight}.',
	'plus précisément au cou. {neckDmgLight}.',
	'plus précisément à l\'oeil droit. {eyeDmgLight}.',
	'plus précisément à l\'oeil droit. {eyeDmgLight}.',
	'plus précisément à l\'oreille droite. {earDmgLight}.',
	'plus précisément à l\'oreille droite. {earDmgLight}.',
	'plus précisément à l\'oreille droite. {earDmgLight}.'
];
gen_data['headPartMedium'] = [
	'plus précisément l\'os du crâne en lui même. {craniumDmgMedium}.',
	'plus précisément l\'os du crâne en lui même. {craniumDmgMedium}.',
	'plus précisément à l\'oeil gauche. {eyeDmgMedium}.',
	'plus précisément à l\'oeil gauche. {eyeDmgMedium}.',
	'plus précisément à l\'oreille gauche. {earDmgMedium}.',
	'plus précisément à l\'oreille gauche. {earDmgMedium}.',
	'plus précisément à l\'oreille gauche. {earDmgMedium}.',
	'plus précisément sur le nez. {noseDmgMedium}.',
	'plus précisément sur le nez. {noseDmgMedium}.',
	'plus précisément à la bouche. {mouthDmgMedium}.',
	'plus précisément à la bouche. {mouthDmgMedium}.',
	'plus précisément à la bouche. {mouthDmgMedium}.',
	'plus précisément au cou. {neckDmgMedium}.',
	'plus précisément au cou. {neckDmgMedium}.',
	'plus précisément au cou. {neckDmgMedium}.',
	'plus précisément à l\'oeil droit. {eyeDmgMedium}.',
	'plus précisément à l\'oeil droit. {eyeDmgMedium}.',
	'plus précisément à l\'oreille droite. {earDmgMedium}.',
	'plus précisément à l\'oreille droite. {earDmgMedium}.',
	'plus précisément à l\'oreille droite. {earDmgMedium}.'
];
gen_data['headPartSerious'] = [
	'plus précisément l\'os du crâne en lui même. {craniumDmgSerious}.',
	'plus précisément l\'os du crâne en lui même. {craniumDmgSerious}.',
	'plus précisément à l\'oeil gauche. {eyeDmgSerious}.',
	'plus précisément à l\'oeil gauche. {eyeDmgSerious}.',
	'plus précisément à l\'oreille gauche. {earDmgSerious}.',
	'plus précisément à l\'oreille gauche. {earDmgSerious}.',
	'plus précisément à l\'oreille gauche. {earDmgSerious}.',
	'plus précisément sur le nez. {noseDmgSerious}.',
	'plus précisément sur le nez. {noseDmgSerious}.',
	'plus précisément à la bouche. {mouthDmgSerious}.',
	'plus précisément à la bouche. {mouthDmgSerious}.',
	'plus précisément à la bouche. {mouthDmgSerious}.',
	'plus précisément au cou. {neckDmgSerious}.',
	'plus précisément au cou. {neckDmgSerious}.',
	'plus précisément au cou. {neckDmgSerious}.',
	'plus précisément à l\'oeil droit. {eyeDmgSerious}.',
	'plus précisément à l\'oeil droit. {eyeDmgSerious}.',
	'plus précisément à l\'oreille droite. {earDmgSerious}.',
	'plus précisément à l\'oreille droite. {earDmgSerious}.',
	'plus précisément à l\'oreille droite. {earDmgSerious}.'
];

gen_data['craniumDmgLight'] = {
	'0-5': 'Le cuir chevelu est bien entamé mais sinon ça va',
	'6-8': 'Nausées et vertiges pendant plusieurs minutes'
};	
gen_data['eyeDmgLight'] = {
	'0-5': 'L\'oeil est irrité, rien de très grave',
	'6-15': 'Un joli oeil au beurre noir'
};
gen_data['earDmgLight'] = {
	'0-5': 'Le lobe est tranché, douloureux mais sans gravité',
	'6-15': 'Un coup sur l\'oreille qui sonne un peu, mais rien de plus'
};
gen_data['noseDmgLight'] = {
	'0-5': 'Un coup sur le nez qui fait bien mal, ça saigne un peu',
	'6-15': 'Un coup sur le nez qui fait mal et sonne un peu, mais rien de plus'
};
gen_data['mouthDmgLight'] = {
	'0-5': 'Les lèvres sont coupées, ça saigne un peu',
	'6-15' : 'Un bon coup dans les dents. Ca fait mal, mais c\'est tout'
};
gen_data['neckDmgLight'] = {
	'0-9': 'De belles entailles, mais aucune veine ou artère de touchée, ouf',
	'10': 'Un l&eacute:ger crac au niveau des cervicales ... Mais rien de grave, un simple début de torticoli'
};

gen_data['craniumDmgMedium'] = {
	'0-3': 'Une belle fracture du crane, sans danger si soignée rapidement, mais une convalescence s\'impose',
	'4-9': 'Perte de connaissance pendant plusieurs minutes',
	'9-12': 'Perte de connaissance pendant plusieurs minutes. Légère perte de mésmoire pour quelques jours'
};	
gen_data['eyeDmgMedium'] = {
	'0-3': 'La paupière est coupée, du sang coule dans l\'oeil empêchant de voir avec celui-ci',
	'4-5': 'Une légère entaille sur la cornée, il faudra soigner ça avec attention. Très douloureux'
};
gen_data['earDmgMedium'] = {
	'0-3': 'Certains os internes sont brisés, c\'est très douloureux et le personnage entendra moins bien pendant quelques temps',
	'4-8': 'Certains os internes sont brisés, c\'est très douloureux et le personnage aura de légers troubles de l\'équilibre pendant quelques temps'
};
gen_data['noseDmgMedium'] = {
	'0-3': 'Le cartilage est en mille morceaux, c\'est très douloureux',
	'4-8': 'Le nez est cassé et saigne abondament. Impossible de respirer avec'
};
gen_data['mouthDmgMedium'] = {
	'0-3': 'Une dent de cassée ! Une',
	'4-8': 'Les lèvres sont coupées, ça saigne beaucoup'
};
gen_data['neckDmgMedium'] = [
	'Une petite luxation des cervicales, c\'est extrêmement douloureux et il faudra qu\'un médecin voit ça, c\'est dangereux si mal soigné',
	'Une petite luxation des cervicales, c\'est extrêmement douloureux et il faudra qu\'un médecin voit ça, c\'est dangereux si mal soigné',
];

gen_data['craniumDmgSerious'] = {
	'0-2': 'Le cerveau est touché, c\'est extrêmement grave',
	'3-8': 'Une jolie commotion cérébrale, il va falloir se reposer',
	'9-13': 'Perte de connaissance pendant plusieurs minutes. Grosse perte de mémoire pour quelques semaines',
	'14': 'Le cerveau est trop endommagé pour espérer sauver le personnage'
};	
gen_data['eyeDmgSerious'] = {
	'0': 'L\'oeil est crevé',
	'1-5': 'Une belle entaille sur la cornée, il faudra soigner ça avec attention. Très douloureux'
};
gen_data['earDmgSerious'] = {
	'0': 'L\'oreille est coupée nette',
	'1-4': 'Les os internes sont brisés, c\'est très douloureux et impossible d\'entendre avec cette oreille désormais',
	'5': 'Les os internes sont brisés, c\'est très douloureux et impossible d\'entendre avec cette oreille désormais. De plus, le personnage a dorénavant un problème d\'équilibre tant qu\'il n\'a pas été soigné'
};
gen_data['noseDmgSerious'] = {
	'0': 'Le nez est coupé net !',
	'1': 'La cloison nasale est déplacée, rendant la respiration difficile, et nécessittant une intervention chirurgicale'
};
gen_data['mouthDmgSerious'] = {
	'0': 'Quatre dents volent en éclats, la douleur est intense',
	'1' : 'La machoire est déboitée, sans intervention d\'un m&eacutedecin, pas moyen de parler. C\'est très douloureux'
};
gen_data['neckDmgSerious'] = {
	'0': 'Une magnifique luxation des cervicales, c\'est extrêmement douloureux et il faudra qu\'un médecin voit ça, c\'est dangereux si mal soigné',
	'1': 'Une artère a été touchée, mort assurée sans intervention médicale immédiate'
};

gen_data['leftArm_lightWound'] = [
	'Touché au bras gauche, {armPartLight}'
];
gen_data['leftArm_mediumWound'] = [
	'Touché au bras gauche, {armPartMedium}'
];
gen_data['leftArm_seriousWound'] = [
	'Touché au bras gauche, {armPartSerious}'
];

gen_data['rightArm_lightWound'] = [
	'Touché au bras droit, {armPartLight}'
];
gen_data['rightArm_mediumWound'] = [
	'Touché au bras droit, {armPartMedium}'
];
gen_data['rightArm_seriousWound'] = [
	'Touché au bras droit, {armPartSerious}'
];

gen_data['armPartLight'] = [
	'plus précisément à la main. {handDmgLight}.',
	'plus précisément à la main. {handDmgLight}.',
	'plus précisément au poignet. {wristDmgLight}.',
	'plus précisément au poignet. {wristDmgLight}.',
	'plus précisément à l\'avant-bras. {forearmDmgLight}.',
	'plus précisément à l\'avant-bras. {forearmDmgLight}.',
	'plus précisément à l\'avant-bras. {forearmDmgLight}.',
	'plus précisément à l\'avant-bras. {forearmDmgLight}.',
	'plus précisément au coude. {elbowDmgLight}.',
	'plus précisément au coude. {elbowDmgLight}.',
	'plus précisément au coude. {elbowDmgLight}.',
	'plus précisément entre le coude et l\'épaule. {armDmgLight}.',
	'plus précisément entre le coude et l\'épaule. {armDmgLight}.',
	'plus précisément entre le coude et l\'épaule. {armDmgLight}.',
	'plus précisément entre le coude et l\'épaule. {armDmgLight}.',
	'plus précisément à l\'épaule. {shoulderDmgLight}.',
	'plus précisément à l\'épaule. {shoulderDmgLight}.',
	'plus précisément à l\'épaule. {shoulderDmgLight}.',
	'plus précisément à l\'épaule. {shoulderDmgLight}.',
	'plus précisément à l\'épaule. {shoulderDmgLight}.'
];
gen_data['armPartMedium'] = [
	'plus précisément à la main. {handDmgMedium}.',
	'plus précisément à la main. {handDmgMedium}.',
	'plus précisément au poignet. {wristDmgMedium}.',
	'plus précisément au poignet. {wristDmgMedium}.',
	'plus précisément à l\'avant-bras. {forearmDmgMedium}.',
	'plus précisément à l\'avant-bras. {forearmDmgMedium}.',
	'plus précisément à l\'avant-bras. {forearmDmgMedium}.',
	'plus précisément à l\'avant-bras. {forearmDmgMedium}.',
	'plus précisément au coude. {elbowDmgMedium}.',
	'plus précisément au coude. {elbowDmgMedium}.',
	'plus précisément au coude. {elbowDmgMedium}.',
	'plus précisément entre le coude et l\'épaule. {armDmgMedium}.',
	'plus précisément entre le coude et l\'épaule. {armDmgMedium}.',
	'plus précisément entre le coude et l\'épaule. {armDmgMedium}.',
	'plus précisément entre le coude et l\'épaule. {armDmgMedium}.',
	'plus précisément à l\'épaule. {shoulderDmgMedium}.',
	'plus précisément à l\'épaule. {shoulderDmgMedium}.',
	'plus précisément à l\'épaule. {shoulderDmgMedium}.',
	'plus précisément à l\'épaule. {shoulderDmgMedium}.',
	'plus précisément à l\'épaule. {shoulderDmgMedium}.'
];
gen_data['armPartSerious'] = [
	'plus précisément à la main. {handDmgSerious}.',
	'plus précisément à la main. {handDmgSerious}.',
	'plus précisément au poignet. {wristDmgSerious}.',
	'plus précisément au poignet. {wristDmgSerious}.',
	'plus précisément à l\'avant-bras. {forearmDmgSerious}.',
	'plus précisément à l\'avant-bras. {forearmDmgSerious}.',
	'plus précisément à l\'avant-bras. {forearmDmgSerious}.',
	'plus précisément à l\'avant-bras. {forearmDmgSerious}.',
	'plus précisément au coude. {elbowDmgSerious}.',
	'plus précisément au coude. {elbowDmgSerious}.',
	'plus précisément au coude. {elbowDmgSerious}.',
	'plus précisément entre le coude et l\'épaule. {armDmgSerious}.',
	'plus précisément entre le coude et l\'épaule. {armDmgSerious}.',
	'plus précisément entre le coude et l\'épaule. {armDmgSerious}.',
	'plus précisément entre le coude et l\'épaule. {armDmgSerious}.',
	'plus précisément à l\'épaule. {shoulderDmgSerious}.',
	'plus précisément à l\'épaule. {shoulderDmgSerious}.',
	'plus précisément à l\'épaule. {shoulderDmgSerious}.',
	'plus précisément à l\'épaule. {shoulderDmgSerious}.',
	'plus précisément à l\'épaule. {shoulderDmgSerious}.'
];

gen_data['handDmgLight'] = [
	'Une belle entaille, c\'est handicapant pour le combat mais sans séquelle sur le court terme',
	'Une belle entaille, c\'est handicapant pour le combat mais sans séquelle sur le court terme',
];
gen_data['wristDmgLight'] = {
	'0': 'Une légère entaille, rien de bien méchant',
	'1-5': 'Le poignet est foulé, c\'est pas très grave mais ça fait assez mal',
};
gen_data['forearmDmgLight'] = {
	'0-5': 'Des entailles/brulures ça et là, rien de grave',
	'6-10': 'Des poils roussis/rasés, rien de plus'
};
gen_data['elbowDmgLight'] = {
	'0-5': 'Le nerf a été pincé, c\'est surtout désagréable et peu dangereux',
	'6-10': 'Rien de bien grave, des petites entailles'
};
gen_data['armDmgLight'] = {
	'0-5': 'Un beau bleu sur le côté du bras, c\'est douloureux mais sans plus',
	'6-10': 'Trois fois rien, des petits bleus ou quelques égratignures'
};
gen_data['shoulderDmgLight'] = {
	'1-5': 'Quelques brulures/coupures, mais rien de bien méchant',
	'6-10': 'Un coup sur l\'épaule, ça désélibre mais rien de plus'
};

gen_data['handDmgMedium'] = {
	'0-5': 'Deux doigts sont retournés, pas gravissime, mais très douloureux',
	'6-9': 'Un doigt est retourné, pas gravissime, mais très douloureux'
};
gen_data['wristDmgMedium'] = {
	'0-5': 'Le poignet est foulé, c\'est pas très grave mais ça fait assez mal',
	'6-9': 'Une petite entorse, il faudra quelques semaines de guérison'
};
gen_data['forearmDmgMedium'] = {
	'0-5': 'Une profonde entaille entre le cubitus et le radius, plus de peur que de mal, enfin ça fait drolement mal quand même',
	'6-10': 'Le muscle de l\'avant-bras a été bien coupé, c\'est douloureux, et il faudra ne pas trop bouger pour que ça guérisse'
};
gen_data['elbowDmgMedium'] = {
	'0-5': 'Le nerf a été touché, ce qui implique des difficultés à utiliser le bras pendant quelques temps',
	'6-9': 'Un bel hématome sur le coude, sans aucun doute un petit oedème, il faut soigner ça très vite',
};
gen_data['armDmgMedium'] = [
	'Une profonde entaille a bien entamé le biceps, il faudra pas trop bouger pendant quelques jours et ça saigne beaucoup',
	'Une profonde entaille a bien entamé le biceps, il faudra pas trop bouger pendant quelques jours et ça saigne beaucoup'
];
gen_data['shoulderDmgMedium'] = [
	'Une profonde entaille au niveau des trapèzes, c\'est douloureux mais peu dangereux',
	'Une profonde entaille au niveau des trapèzes, c\'est douloureux mais peu dangereux',
];

gen_data['handDmgSerious'] = {
	'0': 'La plupart des os sont brisés, la main est inutilisable pendant plusieurs semaines',
	'1-5': 'Quatre doigts sont retournés, très douloureux et handicapant',
};
gen_data['wristDmgSerious'] = {
	'0-2': 'Le poignet est cassé, purement et simplement.',
	'2-4': 'Une belle entorse, il faudra plusieurs semaines de guérison',
	'5': 'Une entaille sévère au niveau des veines du poignet, c\'est dangereux sans prise en charge médicale rapide'
};
gen_data['forearmDmgSerious'] = [
	'L\'avant-bras est cassé, cubitus et radius à la fois',
	'L\'avant-bras est cassé, cubitus et radius à la fois',
];
gen_data['elbowDmgSerious'] = {
	'0': 'Le coude est cassé, bonjour la convalescence',
	'1-5': 'Un bel hématome sur le coude, sans aucun doute un oedème, il faut soigner ça très vite'
};
gen_data['armDmgSerious'] = [
	'L\'humerus est cassé, c\'est pas rien, ça fait parti des os les plus solides du corps ... Bonjour la douleur',
	'L\'humerus est cassé, c\'est pas rien, ça fait parti des os les plus solides du corps ... Bonjour la douleur',
];
gen_data['shoulderDmgSerious'] = {
	'0': 'L\'articulation est disloquée, non seulement ça fait très mal, mais en plus il faut un médecin pour remettre tout ça ..',
	'1-5': 'Une profonde entaille au niveau des trapèzes, c\'est douloureux mais peu dangereux',
	'6-9': 'Quelques brulures/coupures, mais rien de bien méchant',
	'10': 'Un coup sur l\'épaule, ça désélibre mais rien de plus'
};

gen_data['bodyBones_lightWound'] = [
	'Touché au niveau des cotes et/ou du dos, {bodyBonesPartLight}'
];
gen_data['bodyBones_mediumWound'] = [
	'Touché au niveau des cotes et/ou du dos, {bodyBonesPartMedium}'
];
gen_data['bodyBones_seriousWound'] = [
	'Touché au niveau des cotes et/ou du dos, {bodyBonesPartSerious}'
];

gen_data['bodyBonesPartLight'] = [
	'plus précisément en plein plexus. {plexusDmgLight}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgLight}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgLight}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgLight}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgLight}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgLight}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgLight}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgLight}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgLight}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgLight}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgLight}.',
	'plus précisément sur le haut de la colonne. {upperSpineDmgLight}.',
	'plus précisément sur le bas de la colonne. {lowerSpineDmgLight}.',
];
gen_data['bodyBonesPartMedium'] = [
	'plus précisément en plein plexus. {plexusDmgMedium}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgMedium}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgMedium}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgMedium}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgMedium}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgMedium}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgMedium}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgMedium}.',
	'plus précisément sur le haut de la colonne. {upperSpineDmgMedium}.',
	'plus précisément sur le bas de la colonne. {lowerSpineDmgMedium}.',
];
gen_data['bodyBonesPartSerious'] = [
	'plus précisément en plein plexus. {plexusDmgSerious}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus précisément au niveau des côtes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgSerious}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgSerious}.',
	'plus précisément au niveau des côtes flottantes droites. {rightRibCageDmgSerious}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgSerious}.',
	'plus précisément à l\'homoplate gauche. {leftColarDmgSerious}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgSerious}.',
	'plus précisément à l\'homoplate droite. {rightColarDmgSerious}.',
	'plus précisément sur le haut de la colonne. {upperSpineDmgSerious}.',
	'plus précisément sur le bas de la colonne. {lowerSpineDmgSerious}.',
];

gen_data['plexusDmgLight'] = {
	'0-5': 'Le souffle coupé, une belle entaille qui laissera une cicatrice, mais ça va',
	'6-10': 'Quelques secondes pour reprendre son souffle, et ça ira'
};
gen_data['leftRibCageDmgLight'] = {
	'0-5': 'Un trés bel hématome sur le torse, c\'est trés douloureux',
	'6-10': 'Trois fois rien, ça fera juste très mal pendant quelques jours'
};
gen_data['rightRibCageDmgLight'] = {
	'0-5': 'Un trés bel hématome sur le torse, c\'est trés douloureux',
	'6-10': 'Trois fois rien, ça fera juste très mal pendant quelques jours'
};
gen_data['leftColarDmgLight'] = [
	'Le coup a frolé la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand même douloureux',
	'Le coup a frolé la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand même douloureux',
];
gen_data['rightColarDmgLight'] = [
	'Le coup a frolé la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand même douloureux',
	'Le coup a frolé la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand même douloureux',
];
gen_data['upperSpineDmgLight'] = [
	'Un bel hématome, un peu en desous des homoplates, c\'est pas agréable du tout',
	'Un bel hématome, un peu en desous des homoplates, c\'est pas agréable du tout',
];
gen_data['lowerSpineDmgLight'] = [
	'Un bel hématome, au niveau des reins, c\'est pas agréable du tout',
	'Un bel hématome, au niveau des reins, c\'est pas agréable du tout'
];

gen_data['plexusDmgMedium'] = [
	'Un bon coup qui coupe le souffle ! Les côtes autours sont félées, la respiration sera douloureuse pendant quelques temps',
	'Un bon coup qui coupe le souffle ! Les côtes autours sont félées, la respiration sera douloureuse pendant quelques temps'
];
gen_data['leftRibCageDmgMedium'] = {
	'0-3': 'Une cote cassée, la respiration sera difficile pendant quelques temps',
	'4-10': 'Un trés gros hématome sur le torse, c\'est trés douloureux',
	'11-12': 'Une cote est brisée près de la colonne, le poumon est compress&eacute, mais pas perforé',
};
gen_data['rightRibCageDmgMedium'] = {
	'0-3': 'Une cote cassée, la respiration sera difficile pendant quelques temps',
	'4-10': 'Un trés gros hématome sur le torse, c\'est trés douloureux',
	'11-12': 'Une cote est brisée près de la colonne, le poumon est compress&eacute, mais pas perforé',
};
gen_data['leftColarDmgMedium'] = [
	'La première côte est brisée  &#40;en partant du haut &#41;, une très vive douleur s\'ensuit mais rien de grave',
	'La première côte est brisée  &#40;en partant du haut &#41;, une très vive douleur s\'ensuit mais rien de grave',
];
gen_data['rightColarDmgMedium'] = [
	'La première côte est brisée  &#40;en partant du haut &#41;, une très vive douleur s\'ensuit mais rien de grave',
	'La première côte est brisée  &#40;en partant du haut &#41;, une très vive douleur s\'ensuit mais rien de grave',
];
gen_data['upperSpineDmgMedium'] = [
	'Un très gros hématome, un peu en desous des homoplates, c\'est pas agréable du tout',
	'Un très gros hématome, un peu en desous des homoplates, c\'est pas agréable du tout'
];
gen_data['lowerSpineDmgMedium'] = [
	'Un très gros hématome, au niveau des reins, c\'est pas agréable du tout',
	'Un très gros hématome, au niveau des reins, c\'est pas agréable du tout'
];

gen_data['plexusDmgSerious'] = {
	'0': 'Le plexus est littéralement cassé, déjà c\'est affreusement douloureux, mais en plus la respiration du personnage est désormais difficile, le rendant incapable de combattre',
	'1-5': 'Un bon coup qui coupe le souffle ! Les côtes autours sont félées, la respiration sera douloureuse pendant quelques temps'
};
gen_data['leftRibCageDmgSerious'] = {
	'0': 'Trois cotes cassées, et un poumon perforé, il faut soigner ça très vite',
	'1-2': 'Une cote cassée a percé une artère proche du coeur, mort assurée sans soin immédiat',
	'3': 'Une cote cassée a touché le coeur, il n\'y a rien à faire, c\'est la mort assurée'
};
gen_data['rightRibCageDmgSerious'] = {
	'0': 'Trois cotes cassées, et un poumon perforé, il faut soigner ça très vite',
	'1-2': 'Une cote est brisée près de la colonne, le poumon est perforé'
};
gen_data['leftColarDmgSerious'] = {
	'0-3': 'La clavicule est cassée, impossible d\'utiliser le bras sans souffrir',
	'4': 'La lame s\'enfonce depuis le creu entre l\'épaule et le cou jusqu\'à toucher une artère coronaire, mort presque instantannée'
};
gen_data['rightColarDmgSerious'] = [
	'La clavicule est cassée, impossible d\'utiliser le bras sans souffrir',
	'La clavicule est cassée, impossible d\'utiliser le bras sans souffrir'
];
gen_data['upperSpineDmgSerious'] = {
	'0': 'La colonne est brisée entre les homoplates, une belle paralysie que voilà',
	'1-5': 'La colonne est fissurée entre les homoplates, c\'est du genre très douloureux, et très dangereux si ce n\'est pas pris en charge au plus vite par un médecin'
};
gen_data['lowerSpineDmgSerious'] = {
	'0': 'La colonne est brisée au dessus du coxys, une belle paralysie que voilà',
	'1-5': 'La colonne est fissurée au dessus du coxys, c\'est du genre très douloureux, et très dangereux si ce n\'est pas pris en charge au plus vite par un médecin'
};

gen_data['bodyGuts_lightWound'] = [
	'Touché au niveau des abdominaux, {bodyGutsPartLight}'
];
gen_data['bodyGuts_mediumWound'] = [
	'Touché au niveau des abdominaux, {bodyGutsPartMedium}'
];
gen_data['bodyGuts_seriousWound'] = [
	'Touché au niveau des abdominaux, {bodyGutsPartSerious}'
];

gen_data['bodyGutsPartLight'] = [
	'plus précisément à l\'estomac. {stomachDmgLight}.',
	'plus précisément au foie. {liverDmgLight}.',
	'plus précisément au pancreas. {pancreasDmgLight}.',
	'plus précisément à l\'intestin grêle. {smallIntestineDmgLight}.',
	'plus précisément au gros intestin. {largeIntestineDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus précisément au rein droit. {rightKidneyDmgLight}.',
	'plus précisément au rein gauche. {leftKidneyDmgLight}.',
];
gen_data['bodyGutsPartMedium'] = [
	'plus précisément à l\'estomac. {stomachDmgMedium}.',
	'plus précisément au foie. {liverDmgMedium}.',
	'plus précisément au pancreas. {pancreasDmgMedium}.',
	'plus précisément à l\'intestin grêle. {smallIntestineDmgMedium}.',
	'plus précisément au gros intestin. {largeIntestineDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus précisément au rein droit. {rightKidneyDmgMedium}.',
	'plus précisément au rein gauche. {leftKidneyDmgMedium}.',
];
gen_data['bodyGutsPartSerious'] = [
	'plus précisément à l\'estomac. {stomachDmgSerious}.',
	'plus précisément au foie. {liverDmgSerious}.',
	'plus précisément au pancreas. {pancreasDmgSerious}.',
	'plus précisément à l\'intestin grêle. {smallIntestineDmgSerious}.',
	'plus précisément au gros intestin. {largeIntestineDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus précisément au rein droit. {rightKidneyDmgSerious}.',
	'plus précisément au rein gauche. {leftKidneyDmgSerious}.',
];

gen_data['stomachDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
];
gen_data['liverDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
];
gen_data['pancreasDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
];
gen_data['smallIntestineDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
];
gen_data['largeIntestineDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
];
gen_data['gutsMusclesDmgLight'] = {
	'0-5': 'Une bonne partie des abdo est écorchée / brulée, rien de grave, mais qu\'est-ce que ça fait mal',
	'6-10': 'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agraéble'
};
gen_data['rightKidneyDmgLight'] = [
	'Un bon coup dans le dos, suffisament fort pour faire très mal, voir pour envoyer au sol quelques secondes',
	'Un bon coup dans le dos, suffisament fort pour faire très mal, voir pour envoyer au sol quelques secondes'
];
gen_data['leftKidneyDmgLight'] = [
	'Un bon coup dans le dos, suffisament fort pour faire très mal, voir pour envoyer au sol quelques secondes',
	'Un bon coup dans le dos, suffisament fort pour faire très mal, voir pour envoyer au sol quelques secondes'
];

gen_data['stomachDmgMedium'] = {
	'0-5': 'La paroi de l\'estomac est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['liverDmgMedium'] = {
	'0-5': 'Du sang dans la bouche, et quelques nausées, c\'est pas bon signe. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['pancreasDmgMedium'] = {
	'0-5': 'La paroi de l\'estomac est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['smallIntestineDmgMedium'] = {
	'0-5': 'La paroi de l\'intestin grêle est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['largeIntestineDmgMedium'] = {
	'0-5': 'La paroi du gros intestin est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['gutsMusclesDmgMedium'] = {
	'0-5': 'Les muscles sont entamés de façon superficielle à de nombreux endroits, ce n\'est pas grave, mais c\'est plutôt douloureux',
	'6-9': 'Une majeure partie des abdo est écorchée / brulée, rien de grave, mais qu\'est-ce que ça fait mal'
};
gen_data['rightKidneyDmgMedium'] = {
	'0-5': 'La paroi du rein est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};
gen_data['leftKidneyDmgMedium'] = {
	'0-5': 'La paroi du rein est entamée, à plusieurs endroits. Si le personnage arrête de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup était si violent que l\'organe s\'est décalé de quelques centimètres ... Pas spécialement grave, mais plutôt douloureux, et tout de même à surveiller par la suite'
};

gen_data['stomachDmgSerious'] = [
	'L\'estomac est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée',
	'L\'estomac est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée'
];
gen_data['liverDmgSerious'] = [
	'Le foie est gravement endommagé ... Sans intervention médicale rapide, c\'est la mort assurée',
	'Le foie est gravement endommagé ... Sans intervention médicale rapide, c\'est la mort assurée'
];
gen_data['pancreasDmgSerious'] = [
	'Le pancreas lourdement abimé, c\'est extrêmement douloureux ... Sans intervention médicale rapide, c\'est la mort assurée',
	'Le pancreas lourdement abimé, c\'est extrêmement douloureux ... Sans intervention médicale rapide, c\'est la mort assurée'
];
gen_data['smallIntestineDmgSerious'] = [
	'L\'intestin grêle est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée',
	'L\'intestin grêle est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée'
];
gen_data['largeIntestineDmgSerious'] = [
	'Le gros intestin est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée',
	'Le gros intestin est percé, son contenu se déverse dans le corps ... Sans intervention médicale immédiate, c\'est la mort assurée'
];
gen_data['gutsMusclesDmgSerious'] = {
	'0': 'Les muscles abdominaux sont déchirés / tranchés à plusieurs endroits, c\'est très douloureux de bouger',
	'1-5': 'Les muscles sont entamés sévèrement à de nombreux endroits, ce n\'est pas grave, mais c\'est plutôt douloureux'
};
gen_data['rightKidneyDmgSerious'] = [
	'Le rein est gravement endommagé ... Sans intervention médicale rapide, le personnage risque de perdre un rein, voir de mourir',
	'Le rein est gravement endommagé ... Sans intervention médicale rapide, le personnage risque de perdre un rein, voir de mourir'
];
gen_data['leftKidneyDmgSerious'] = [
	'Le rein est gravement endommagé ... Sans intervention médicale rapide, le personnage risque de perdre un rein, voir de mourir',
	'Le rein est gravement endommagé ... Sans intervention médicale rapide, le personnage risque de perdre un rein, voir de mourir'
];

gen_data['rightLeg_lightWound'] = [
	'Touché à la jambe droite, {legPartLight}'
];
gen_data['rightLeg_mediumWound'] = [
	'Touché à la jambe droite, {legPartMedium}'
];
gen_data['rightLeg_seriousWound'] = [
	'Touché à la jambe droite, {legPartSerious}'
];

gen_data['leftLeg_lightWound'] = [
	'Touché à la jambe gauche, {legPartLight}'
];
gen_data['leftLeg_mediumWound'] = [
	'Touché à la jambe gauche, {legPartMedium}'
];
gen_data['leftLeg_seriousWound'] = [
	'Touché à la jambe gauche, {legPartSerious}'
];

gen_data['legPartLight'] = [
	'plus précisément au pied. {footDmgLight}.',
	'plus précisément au pied. {footDmgLight}.',
	'plus précisément à la cheville. {ankleDmgLight}.',
	'plus précisément à la cheville. {ankleDmgLight}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus précisément au genou. {kneeDmgLight}.',
	'plus précisément au genou. {kneeDmgLight}.',
	'plus précisément au genou. {kneeDmgLight}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgLight}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgLight}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgLight}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgLight}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgLight}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgLight}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgLight}.',
	'plus précisément au niveau des fesses. {bottomDmgLight}.',
	'plus précisément au niveau des fesses. {bottomDmgLight}.'
];
gen_data['legPartMedium'] = [
	'plus précisément au pied. {footDmgMedium}.',
	'plus précisément au pied. {footDmgMedium}.',
	'plus précisément à la cheville. {ankleDmgMedium}.',
	'plus précisément à la cheville. {ankleDmgMedium}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus précisément au genou. {kneeDmgMedium}.',
	'plus précisément au genou. {kneeDmgMedium}.',
	'plus précisément au genou. {kneeDmgMedium}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgMedium}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgMedium}.',
	'plus précisément au niveau des fesses. {bottomDmgMedium}.',
	'plus précisément au niveau des fesses. {bottomDmgMedium}.'
];
gen_data['legPartSerious'] = [
	'plus précisément au pied. {footDmgSerious}.',
	'plus précisément au pied. {footDmgSerious}.',
	'plus précisément à la cheville. {ankleDmgSerious}.',
	'plus précisément à la cheville. {ankleDmgSerious}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus précisément entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus précisément au genou. {kneeDmgSerious}.',
	'plus précisément au genou. {kneeDmgSerious}.',
	'plus précisément au genou. {kneeDmgSerious}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus précisément entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgSerious}.',
	'plus précisément au niveau du col du bassin. {hipJointDmgSerious}.',
	'plus précisément au niveau des fesses. {bottomDmgSerious}.',
	'plus précisément au niveau des fesses. {bottomDmgSerious}.'
];

gen_data['footDmgLight'] = {
	'0-5': 'Le gros orteil est cassé, ce n\'est pas grave mais c\'est handicapant pour marcher, et douloureux',
	'6-9': 'Un bon bleu sur le pied, c\'est douloureux de marcher mais sans plus'
};
gen_data['ankleDmgLight'] = {
	'0-5': 'Un bon bleu sur la mall&eacuteole, mais sinon ça va',
	'6-9': 'Rien de bien grave, une petite foulure, tout ira bien dans quelques jours'
};
gen_data['lowerLegDmgLight'] = {
	'0-5': 'Le muscle du mollet est déchiré, ce n\'est pas grave mais c\'est très douloureux de marcher pendant quelques jours',
	'6-9': 'Une belle entaille sur le mollet qui laissera probablement une cicatrice, mais rien de grave'
};
gen_data['kneeDmgLight'] = {
	'0-5': 'Un bon bleu sur le côté du genou, mais sinon ça va',
	'6-9': 'Rien de bien grave, ça a tiré un peu sur les ligaments mais quelques jours de repos et ça ira'
};
gen_data['upperLegDmgLight'] = {
	'0-5': 'Un sacré bleu sur la cuisse. Ca fait mal mais sans plus',
	'6-9': 'Un coup sur la cuisse qui fait tomber par terre, mais rien de plus'
};
gen_data['hipJointDmgLight'] = [
	'Un beau bleu sur le côté du bassin, mais ça va',
	'Un beau bleu sur le côté du bassin, mais ça va'
];
gen_data['bottomDmgLight'] = [
	'Heureusement que c\'était sur les fesses, parce que ça fait juste mal, ailleurs ce coup aurait peut-être cassé quelque chose',
	'Heureusement que c\'était sur les fesses, parce que ça fait juste mal, ailleurs ce coup aurait peut-être cassé quelque chose'
];

gen_data['footDmgMedium'] = {
	'0-5': 'La plante du pied est très endommagée, c\'est difficile de marcher mais pas grave si bien soigné',
	'6-9': 'Et trois orteils de retournés, trois ... Le gros en fait parti, ça fait très mal'
};
gen_data['ankleDmgMedium'] = {
	'0-5': 'La malléole est cassée, c\'est très douloureux, et pas moyen de marcher tant que ce n\'est pas soigné',
	'6-9': 'Une petite entorse, sans trop de gravité, c\'est loin d\'être une partie de plaisir, mais ça se soignera assez vite'
};
gen_data['lowerLegDmgMedium'] = {
	'0-5': 'Une fracture du tibia, mais le péroné tient bon lui, c\'est assez simple à soigner, il faudra juste être patient',
	'6-9': 'Un magnifique hématome d\'une dizaine de centimètres de diamètre sur le tibia, d\'expérience personnel, ça fait très mal'
};
gen_data['kneeDmgMedium'] = {
	'0-5': 'Le ménisque est cassée, c\'est très douloureux, et pas moyen de marcher tant que ce n\'est pas soigné',
	'6-9': 'Une petite entorse, sans trop de gravité, c\'est loin d\'être une partie de plaisir, mais ça se soignera assez vite'
};
gen_data['upperLegDmgMedium'] = {
	'0-5': 'Le fémur est félé mais légèrement seulement, c\'est très douloureux mais si le personnage cesse de bouger ça ne s\'aggravera pas',
	'6-9': 'Une profonde entaille sur la cuisse, de quoi arborer une belle cicatrice quand vous irez vous baigner quoi, si on arrête le saignement ce n\'est pas grave du tout'
};
gen_data['hipJointDmgMedium'] = [
	'Un coup qui vient secouer les os du bassins ... Ca fait mal, et le personnage va tomber, mais rien de grave',
	'Un coup qui vient secouer les os du bassins ... Ca fait mal, et le personnage va tomber, mais rien de grave'
];
gen_data['bottomDmgMedium'] = [
	'Un bon gros bleu sur la fesse, il va falloir trouver un bon coussin pour les prochains jours',
	'Un bon gros bleu sur la fesse, il va falloir trouver un bon coussin pour les prochains jours'
];

gen_data['footDmgSerious'] = {
	'0': 'L\'os du pied est complètement broyé sous la force du coup, ça va être dur de marcher pendant quelques temps ..',
	'1': 'Le petit orteil s\'est fait arrach&eacute ! C\'est très douloureux, et plutôt moche, mais c\'est absolument pas grave et ne sera pas handicapant dans le futur'
};
gen_data['ankleDmgSerious'] = {
	'0': 'Une belle entorse, ça gonfle, c\'est tout bleu ... ça fait horriblement mal, et bien sur, impossible de marcher',
	'1': 'La cheville est complètement cassée, formant un angle pas très naturel, si ce n\'est pas correctement soigné le personnage risque de ne plus jamais marcher correctement'
};
gen_data['lowerLegDmgSerious'] = {
	'0': 'Double fracture : tibia et péroné. C\'est très douloureux, et la guérison prendra du temps',
	'1': 'Une superbe double fracture (tibia et péroné) ouverte. Ca pisse le sang, la douleur suffirait à faire s\'évanouir n\'importe qui, et la guérison sera longue'
};
gen_data['kneeDmgSerious'] = {
	'0': 'Une belle entorse, ça gonfle, c\'est tout bleu ... ça fait horriblement mal, et bien sur, impossible de marcher',
	'1': 'Le genou est complètement cassé, formant un angle pas très naturel, si ce n\'est pas correctement soigné le personnage risque de ne plus jamais marcher correctement'
};
gen_data['upperLegDmgSerious'] = {
	'0': 'Et hop, un fémur cassé. Niveau douleur, on est loin au dessus du seuil toléble pour un humain, et puis bonne chance pour la convalescence ..',
	'1': 'Oh mince, l\'art&eagrave:re fémorale a été sectionnée. C\'est trop dommage, sans soins imm&eacutediats, le personnage est mort'
};
gen_data['hipJointDmgSerious'] = [
	'Le bassin est brisé, littéralement. Bon, la guérison sera longue ... Bon courage ! Ah oui, au fait, le personnage est hors combat, naturellement',
	'Le bassin est brisé, littéralement. Bon, la guérison sera longue ... Bon courage ! Ah oui, au fait, le personnage est hors combat, naturellement'
];
gen_data['bottomDmgSerious'] = [
	'Quoi de pire qu\'une blessure qui empêche de s\'assoir ? Une blessure qui empêche de s\'assoir et qui oblige votre médecin à contempler votre fondement. Vous l\'aurez compris, c\'est une magnifique entaille sur la fesse, du genre plutôt profonde',
	'Quoi de pire qu\'une blessure qui empêche de s\'assoir ? Une blessure qui empêche de s\'assoir et qui oblige votre médecin à contempler votre fondement. Vous l\'aurez compris, c\'est une magnifique entaille sur la fesse, du genre plutôt profonde'
];

// /wounds --------------------------------------

// PNJs -----------------------------------------

gen_data['MiqoSF'] = [
    '{firstName_sol_f} {lastName_sol_f}, une Miqo\'te solaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_miq_f}\r\n{psy_sol_f}'
];
gen_data['MiqoSM'] = [
    '{firstName_sol_m} {lastName_sol_m}, un Miqo\'te solaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_miq_m}\r\n{psy_sol_m}'
];
gen_data['MiqoLF'] = [
    '{firstName_moon_f} {lastName_moon}, une Miqo\'te lunaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_miq_f}\r\n{psy_moon_f}'
];
gen_data['MiqoLM'] = [
    '{firstName_moon_m} {lastName_moon}, un Miqo\'te lunaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_miq_m}\r\n{psy_moon_m}'
];
gen_data['RaenF'] = [
    '{firstName_raen_f} {lastName_raen}, une Raen de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_aora_f}\r\n{psy_aora_f}'
];
gen_data['RaenM'] = [
    '{firstName_raen_m} {lastName_raen}, un Raen de {age}. Il est {job} et vit {dwelling}.\r\n{phys_aora_m}\r\n{psy_aora_m}'
];
gen_data['XaelaF'] = [
    '{firstName_xeala_f} {lastName_xaela}, une Xaela de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_aora_f}\r\n{psy_aora_f}'
];
gen_data['XaelaM'] = [
    '{firstName_xeala_m} {lastName_xaela}, un Xaela de {age}. Il est {job} et vit {dwelling}.\r\n{phys_aora_m}\r\n{psy_aora_m}'
];
gen_data['RoeCFF'] = [
    '{firstName_fire_f} {lastName_fire_f}, une Roegadyn du Clan du Feu de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_roe_f}\r\n{psy_roe_f}'
];
gen_data['RoeCFM'] = [
    '{firstName_fire_m} {lastName_fire_m}, un Roegadyn du Clan du Feu de {age}. Il est {job} et vit {dwelling}.\r\n{phys_roe_m}\r\n{psy_roe_m}'
];
gen_data['RoeCMF'] = [
    '{firstName_sea_f} {lastName_sea_f}, une Roegadyn du Clan de la Mer de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_roe_f}\r\n{psy_roe_f}'
];
gen_data['RoeCMM'] = [
    '{firstName_sea_m} {lastName_sea_m}, un Roegadyn du Clan de la Mer de {age}. Il est {job} et vit {dwelling}.\r\n{phys_roe_m}\r\n{psy_roe_m}'
];
gen_data['ElezCF'] = [
    '{firstName_ele_m} {lastName_ele}, un Elezen Crépusculaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_ele_m}\r\n{psy_ele_m}'
];
gen_data['ElezCM'] = [
    '{firstName_ele_f} {lastName_ele}, une Elezenne Crépusculaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_ele_f}\r\n{psy_ele_f}'
];
gen_data['ElezSF'] = [
    '{firstName_ele_f} {lastName_ele}, une Elezenne Sylvetre de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_ele_f}\r\n{psy_ele_f}'
];
gen_data['ElezSM'] = [
    '{firstName_ele_m} {lastName_ele}, un Elezen Sylvestre de {age}. Il est {job} et vit {dwelling}.\r\n{phys_ele_m}\r\n{psy_ele_m}'
];
gen_data['HyurgF'] = [
    '{firstName_hyurg_f} {lastName_hyurg}, une Hyurgoth de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_hyurg_f}\r\n{psy_hyurg_f}'
];
gen_data['HyurgM'] = [
    '{firstName_hyurg_m} {lastName_hyurg}, un Hyurgoth de {age}. Il est {job} et vit {dwelling}.\r\n{phys_hyurg_m}\r\n{psy_hyurg_m}'
];
gen_data['HyuroF'] = [
    '{firstName_hyuro_f} {lastName_hyuro}, une Hyuroise de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_hyuro_f}\r\n{psy_hyuro_f}'
];
gen_data['HyuroM'] = [
    '{firstName_hyuro_m} {lastName_hyuro}, un Hyurois de {age}. Il est {job} et vit {dwelling}.\r\n{phys_hyuro_m}\r\n{psy_hyuro_m}'
];
gen_data['LalaPF'] = [
    '{name_lala_pl_f}, une Lalafell du Peuple des Plaines de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_lala_f}\r\n{psy_lala_f}'
];
gen_data['LalaPM'] = [
    '{name_lala_pl_m}, un Lalafell du Peuple des Plaines de {age}. Il est {job} et vit {dwelling}.\r\n{phys_lala_m}\r\n{psy_lala_m}'
];
gen_data['LalaDF'] = [
    '{name_lala_dn_f}, une Lalafell du Peuple des Dunes de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_lala_f}\r\n{psy_lala_f}'
];
gen_data['LalaDM'] = [
    '{name_lala_dn_m}, un Lalafell du Peuple des Dunes de {age}. Il est {job} et vit {dwelling}.\r\n{phys_lala_m}\r\n{psy_lala_m}'
];

gen_data['pnj'] = [
    '{race}'
];

gen_data['race'] = [
    '{firstName_moon_m} {lastName_moon}, un Miqo\'te lunaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_miq_m}\r\n{psy_moon_m}',
    '{firstName_moon_f} {lastName_moon}, une Miqo\'te lunaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_miq_f}\r\n{psy_moon_f}',
    '{firstName_sol_m} {lastName_sol_m}, un Miqo\'te solaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_miq_m}\r\n{psy_sol_m}',
    '{firstName_sol_f} {lastName_sol_f}, une Miqo\'te solaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_miq_f}\r\n{psy_sol_f}',
    '{firstName_raen_m} {lastName_raen}, un Raen de {age}. Il est {job} et vit {dwelling}.\r\n{phys_aora_m}\r\n{psy_aora_m}',
    '{firstName_raen_f} {lastName_raen}, une Raen de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_aora_f}\r\n{psy_aora_f}',
    '{firstName_xeala_m} {lastName_xaela}, un Xaela de {age}. Il est {job} et vit {dwelling}.\r\n{phys_aora_m}\r\n{psy_aora_m}',
    '{firstName_xeala_f} {lastName_xaela}, une Xaela de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_aora_f}\r\n{psy_aora_f}',
    '{firstName_fire_m} {lastName_fire_m}, un Roegadyn du Clan du Feu de {age}. Il est {job} et vit {dwelling}.\r\n{phys_roe_m}\r\n{psy_roe_m}',
    '{firstName_fire_f} {lastName_fire_f}, une Roegadyn du Clan du Feu de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_roe_f}\r\n{psy_roe_f}',
    '{firstName_sea_m} {lastName_sea_m}, un Roegadyn du Clan de la Mer de {age}. Il est {job} et vit {dwelling}.\r\n{phys_roe_m}\r\n{psy_roe_m}',
    '{firstName_sea_f} {lastName_sea_f}, une Roegadyn du Clan de la Mer de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_roe_f}\r\n{psy_roe_f}',
    '{firstName_hyurg_m} {lastName_hyurg}, un Hyurgoth de {age}. Il est {job} et vit {dwelling}.\r\n{phys_hyurg_m}\r\n{psy_hyurg_m}',
    '{firstName_hyurg_f} {lastName_hyurg}, une Hyurgoth de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_hyurg_f}\r\n{psy_hyurg_f}',
    '{firstName_hyuro_m} {lastName_hyuro}, un Hyurois de {age}. Il est {job} et vit {dwelling}.\r\n{phys_hyuro_m}\r\n{psy_hyuro_m}',
    '{firstName_hyuro_f} {lastName_hyuro}, une Hyuroise de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_hyuro_f}\r\n{psy_hyuro_f}',
    '{firstName_ele_m} {lastName_ele}, un Elezen Sylvestre de {age}. Il est {job} et vit {dwelling}.\r\n{phys_ele_m}\r\n{psy_ele_m}',
    '{firstName_ele_f} {lastName_ele}, une Elezenne Sylvetre de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_ele_f}\r\n{psy_ele_f}',
    '{firstName_ele_m} {lastName_ele}, un Elezen Crépusculaire de {age}. Il est {job} et vit {dwelling}.\r\n{phys_ele_m}\r\n{psy_ele_m}',
    '{firstName_ele_f} {lastName_ele}, une Elezenne Crépusculaire de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_ele_f}\r\n{psy_ele_f}',
    '{name_lala_dn_m}, un Lalafell du Peuple des Dunes de {age}. Il est {job} et vit {dwelling}.\r\n{phys_lala_m}\r\n{psy_lala_m}',
    '{name_lala_dn_f}, une Lalafell du Peuple des Dunes de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_lala_f}\r\n{psy_lala_f}',
    '{name_lala_pl_m}, un Lalafell du Peuple des Plaines de {age}. Il est {job} et vit {dwelling}.\r\n{phys_lala_m}\r\n{psy_lala_m}',
    '{name_lala_pl_f}, une Lalafell du Peuple des Plaines de {age}. Elle est {job} et vit {dwelling}.\r\n{phys_lala_f}\r\n{psy_lala_f}'
];

gen_data['firstName_moon_m'] = [
    'Okhi\'{moon_m_part}',
    'Cemi\'{moon_m_part}',
    'Gota\'{moon_m_part}',
    'Sizha\'{moon_m_part}',
    'Efh\'{moon_m_part}',
    'Kael\'{moon_m_part}',
    'Mondap\'{moon_m_part}',
    'Geki\'{moon_m_part}',
    'Franoj\'{moon_m_part}',
    'Hajet\'{moon_m_part}'
];

gen_data['firstName_sol_m'] = [
    '{trib_part}\'rhan',
    '{trib_part}\'rhod',
    '{trib_part}\'hundo',
    '{trib_part}\'farn',
    '{trib_part}\'mahr',
    '{trib_part}\'kor',
    '{trib_part}\'vehn',
    '{trib_part}\'loh',
    '{trib_part}\'rhun',
    '{trib_part}\'lham'
];

gen_data['firstName_raen_m'] = [
    'Akira',
    'Tsunobu',
    'Kondo',
    'Sakai',
    'Shin',
    'Itsoryu',
    'Dodokin',
    'Hanto',
    'Zuronosuke',
    'Janenpo'
];

gen_data['firstName_xeala_m'] = [
    'Odtsetseg' ,
    'Holuikhan',
    'Jiguur',
    'Chagur',
    'Borte',
    'Barghujin',
    'Oyunbileg',
    'Khongordzol',
    'Khenbish',
    'Orbei'
];

gen_data['firstName_fire_m'] = [
    'Glittering' ,
    'Strong',
    'Tremendous',
    'Swift',
    'Genuine',
    'Hefty',
    'Fat',
    'Innocent',
    'Luxurous',
    'Fiery'
];

gen_data['firstName_sea_m'] = [
    'Herlbyrm' ,
    'Sylbhyr',
    'Hirsksthal',
    'Wastswerd',
    'Ybolgelak',
    'Wakkstyr',
    'Fianhyll',
    'Bylgryss',
    'Guolwint',
    'Zoengspyr'
];

gen_data['firstName_hyurg_m'] = [
    'Faramund' ,
    'Frederik',
    'Hroch',
    'Elderoak',
    'Balmin',
    'Staalgund',
    'Eric',
    'Noromund',
    'Ghelson',
    'Artmund'
];

gen_data['firstName_hyuro_m'] = [
    'Joe' ,
    'Lods',
    'Samwell',
    'John',
    'Mayer',
    'Neel',
    'Steddyson',
    'Tom',
    'Hob',
    'Gregor'
];

gen_data['firstName_ele_m'] = [
    'Quintillet' ,
    'Edredoux',
    'Grintassault',
    'Nicholou',
    'Mardevaille',
    'Guisoux',
    'Sintdoux',
    'Vincennon',
    'Trefordoye',
    'Gregoriaux',
    'Palsevain' ,
    'Nervemou',
    'Gontrant',
    'Etianaux',
    'Stephannon',
    'Mauriceau',
    'Pierreau',
    'Balbenou',
    'Thomassien',
    'Julianneau'
];

gen_data['name_lala_pl_m'] = [
    'Zorido Manarido',
    'Kopel Nopel',
    'Habrido Tarabrido',
    'Hubule Turule',
    'Satronio Legronio',
    'Kilipu Lilipu',
    'Sasawano Popowano',
    'Tropino Caprino',
    'Babalago Nenelago',
    'Felopopo Topopo',
    'Taranoda Cunoda',
    'Cunibano Lingibano',
    'Hetorijo Hacorijo'
];

gen_data['name_lala_dn_m'] = [
    'Nunulupa Tatalupa',
    'Kokorabi Lolorabi',
    'Gabokapi Terakapi',
    'Toriyaki Tepanyaki',
    'Mechotoro Nachotoro',
    'Berutilo Narutilo',
    'Stepajipo Hepajipo',
    'Brodibudi Fapibudi',
    'Sanotino Bodatino',
    'Loloputo Temoputo',
    'Bulirito Lemorito',
    'Kapikapo Kepikapo',
    'Gegelato Cafelato'
];

gen_data['firstName_sol_f'] = [
    '{trib_part}\'zumyn',
    '{trib_part}\'amneko',
    '{trib_part}\'bolata',
    '{trib_part}\'nangho',
    '{trib_part}\'elhabo',
    '{trib_part}\'ganado',
    '{trib_part}\'bakanta',
    '{trib_part}\'arangho',
    '{trib_part}\'mejigho',
    '{trib_part}\'hatalna'
];

gen_data['firstName_moon_f'] = [
    'Nbaab',
    'Jadocan',
    'Mrewla',
    'Nsura',
    'Elidan',
    'Hodagoh',
    'Potnam',
    'Savakoh',
    'Frewlna',
    'Hedocan'
];

gen_data['firstName_raen_f'] = [
    'Akiko',
    'Sadako',
    'Hanami',
    'Shiki',
    'Inaba',
    'Juniko',
    'Haoru',
    'Hinja',
    'Marishi',
    'Jidani'
];

gen_data['firstName_xeala_f'] = [
    'Mergen',
    'Jochi Khasar',
    'Jirghadai',
    'Siban',
    'Bilge',
    'Ghazan',
    'Gantulga',
    'Sukhebaatar',
    'Yekehildedu',
    'Kutlugh'
];

gen_data['firstName_fire_f'] = [
    'Gliding' ,
    'Fluffy',
    'Soft',
    'Sparkling',
    'Tricky',
    'Melting',
    'Thin',
    'Mighty',
    'Pleasant',
    'Funny'
];

gen_data['firstName_sea_f'] = [
    'Lorapfrew' ,
    'Geimzwyn',
    'Unsynzahr',
    'Lyngspaer',
    'Sundyrmerl',
    'Swarskapf',
    'Skaetfolg',
    'Klynbhaln',
    'Loetrabyl',
    'Koenklyng'
];

gen_data['firstName_hyurg_f'] = [
    'Sigberta' ,
    'Odell',
    'Maisnann',
    'Idelbierd',
    'Batiena',
    'Ugbaherna',
    'Orieldis',
    'Bergard',
    'Keldard',
    'Swanbierda'
];

gen_data['firstName_hyuro_f'] = [
    'Isolde' ,
    'Hester',
    'Lois',
    'Morgan',
    'Susy',
    'Izbel',
    'Lizbeth',
    'Elsa',
    'Lucy',
    'Jenna'
];

gen_data['firstName_ele_f'] = [
    'Marisette' ,
    'Sophietta',
    'Lison',
    'Bédiane',
    'Sylvanne',
    'Simonnette',
    'Babette',
    'Nichole',
    'Suson',
    'Tibaine',
    'Pénélon' ,
    'Ursulena',
    'Paulette',
    'Vivianne',
    'Louisette',
    'Ricette',
    'Eléanor',
    'Gricette',
    'Marionde',
    'Diane'
];

gen_data['name_lala_pl_f'] = [
    'Tsupakopako Tsupako',
    'Napolipoli Napoli',
    'Lanono Lano',
    'Fikilokilo Fikilo',
    'Socinono Socino',
    'Besasa Besa',
    'Pururu Puru',
    'Valala Vala',
    'Kipopo Kipo',
    'Nutajitaji Nutaji',
    'Malolo Malo',
    'Cumimi Cumi',
    'Gugigi Gugi'
];

gen_data['name_lala_dn_f'] = [
    'Ononid Onid',
    'Kokobi Kobi',
    'Sasapu Sapu',
    'Trotropa Tropa',
    'Bubule Bule',
    'Cecera Cera',
    'Niniri Niri',
    'Brobropi Bropi',
    'Jijipu Jipu',
    'Wawali Wali',
    'Mamalo Malo',
    'Cucuni Cuni',
    'Bibila Bila'
];

gen_data['lastName_moon'] = [
    'Nbolo',
    'Jinjahl',
    'Jaab',
    'Epocan',
    'Tadohan',
    'Kno',
    'Ntadam',
    'Badoh',
    'Felmaab',
    'Gonahl'
];

gen_data['lastName_sol_m'] = {
    '0-95': 'Tia',
    '96-100': 'Nunh'
};

gen_data['lastName_sol_f'] = [
    'Rhan',
    'Rhod',
    'Hundo',
    'Farn',
    'Mahr',
    'Kor',
    'Vehn',
    'Loh',
    'Rhun',
    'Lham'
];

gen_data['lastName_raen'] = [
    'Hempachi',
    'Nanokuro',
    'Shironage',
    'Utsunokoro',
    'Gojoryu',
    'Hubire',
    'Ranpenjyu',
    'Hinamoken',
    'Sasaniko',
    'Kenponran'
];

gen_data['lastName_xaela'] = [
    'Adarkim',
    'Angura',
    'Arulaq',
    'Avagnar',
    'Bairon',
    'Bayaqud',
    'Bolir',
    'Borlaaq',
    'Buduga',
    'Dalamiq',
    'Iriq',
    'Jhungid',
    'Kharlu',
    'Khatayin',
    'Malqir',
    'Mankhad',
    'Mierqid',
    'Noykin',
    'Olkund',
    'Dazkar',
    'Oronir',
    'Oroq',
    'Qerel',
    'Torgud',
    'Tumet',
    'Ugund',
    'Uyagir',
    'Dhoro',
    'Orben',
    'Ejinn',
    'Dotharl',
    'Hotgo',
    'Sagahl',
    'Kahkol',
    'Kha',
    'Mol',
    'Gesi',
    'Kagon',
    'Goro',
    'Gharl',
    'Dataq',
    'Haragin',
    'Ura',
    'Moks',
    'Geneq',
    'Horo',
    'Himaa',
    'Malaguld',
    'Urumet',
    'Qalli',
    'Qestir'
];

gen_data['lastName_fire_m'] = [
    'Rock' ,
    'Fire',
    'Moutain',
    'Volcano',
    'Bear',
    'Oak',
    'Pig',
    'Hawk',
    'Forest',
    'Bone'
];

gen_data['lastName_fire_f'] = [
    'River' ,
    'Stream',
    'Lilly',
    'Rabbit',
    'Grass',
    'Wind',
    'Dandelion',
    'Plate',
    'Hole',
    'Mouse'
];

gen_data['lastName_sea_m'] = [
    'Syntoerfyrhwyz' ,
    'Doermholblaet',
    'Skalwyrndaeg',
    'Styrmblanswyg',
    'Careigsweig',
    'Doenwyrkagyft',
    'Lohcaerslett',
    'Ahlddorpfcwin',
    'Floegwarg',
    'Laentgraebhort'
];

gen_data['lastName_sea_f'] = [
    'Tylwaen' ,
    'Swysmhuswilt',
    'Saelbwilt',
    'Toegmholeidin',
    'Swygloug',
    'Oefyrbrem',
    'Khantoumfohc',
    'Koenybrostn',
    'Haelahct',
    'Lonapfrym'
];

gen_data['lastName_hyurg'] = [
    'Swiftsword' ,
    'Ironfist',
    'Bendthunder',
    'Blackhammer',
    'Bonedagger',
    'Burningsoul',
    'Earthborn',
    'Stoneaxe',
    'Hastwielder',
    'Quickslayer'
];

gen_data['lastName_hyuro'] = [
    'Smith' ,
    'Hunter',
    'Wheeler',
    'Runner',
    'Baker',
    'Keeper',
    'Mourner',
    'Fisherman',
    'Bowsman',
    'Gambler'
];

gen_data['lastName_ele'] = [
    'Faucertaux' ,
    'Brillemarre',
    'Cimétoiles',
    'Farcehoux',
    'Percetemps',
    'Branchebalant',
    'Parlemou',
    'Traindussaut',
    'Crapahou',
    'Narlimeau',
    'Sylvenuit' ,
    'Feuillefendue',
    'Nervulame',
    'Bardanoux',
    'Porteprison',
    'Jaunissou',
    'Ruboisé',
    'Frappeminou',
    'Frippemonde',
    'Boursemole'
];

gen_data['moon_m_part'] = {
    '0-5': 'a',
    '6-8': 'to',
    '9-10': 'li',
    '11': 'sae',
    '12': 'ra',
    '13': 'ir',
    '14': 'wo',
    '15': 'ya',
    '16': 'zi',
    '17': 'tan'
};

gen_data['trib_part'] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];

gen_data['age'] = {
    '0': '15 ans',
    '1': '16 ans',
    '2': '17 ans',
    '3-6': '18 ans',
    '7-10' : '19 ans',
    '11-15': '20 ans',
    '16-20': '21 ans',
    '21-25': '22 ans',
    '26-30': '23 ans',
    '31-35': '24 ans',
    '36-40': '25 ans',
    '41-45': '26 ans',
    '46-50': '27 ans',
    '51-55': '28 ans',
    '56-60': '29 ans',
    '61-65': '30 ans',
    '66-70': '31 ans',
    '71-75': '32 ans',
    '76-80': '33 ans',
    '81-85': '34 ans',
    '86-90': '35 ans',
    '91': '36 ans',
    '92': '37 ans',
    '93': '38 ans',
    '94': '39 ans',
    '95': '40 ans',
    '96-100' : 'de plus de 40 ans'
};

gen_data['job'] = {
    '0': 'fortuné et ne travaille pas',
    '1': 'scientifique',
    '2': 'éthérologue',
    '3-6': 'entraineur dans une guilde',
    '7-10' : 'sous-officier dans une grande compagnie',
    '11-15': 'soldat mais pas dans une grande compagnie',
    '16-20': 'tanneur(se)',
    '21-25': 'menuisier(e)',
    '26-30': 'cuisinier(e)',
    '31-35': 'couturier(e)',
    '36-40': 'botaniste',
    '41-45': 'mineur',
    '46-50': 'alchimiste',
    '51-55': 'orfèvre',
    '56-60': 'forgeron(ne)',
    '61-65': 'armurier(e)',
    '66-70': 'pêcheur(se)',
    '71-75': 'membre d\'un groupe de bandits',
    '76-80': 'mercenaire',
    '81-85': 'voleur(se)',
    '86-90': 'un(e) réfugié(e)',
    '91': 'tueur(se) à gage',
    '92': 'officier dans une grande compagnie',
    '93': 'mafieux(se) haut placé(e)',
    '94': 'vendeur de drogues',
    '95': 'prostitué(e)',
    '96-100' : 'aventurier(e)'
};

gen_data['dwelling'] = {
    '0': 'à Idyllée',
    '1-20': 'à Gridania',
    '21-25': 'en forêt centrale',
    '26-30': 'en forêt de l\'est',
    '31-35': 'en forêt du nord',
    '36-40': 'en forêt du sud',
    '41-60': 'à Limsa Lominsa',
    '61-65': 'en Noscea centrale',
    '66-70': 'en basse Noscea',
    '71-75': 'en haute Noscea',
    '76-80': 'en Noscea extérieure',
    '81-100': 'à Ul\'dah',
    '101-105': 'dans le Thanalan central',
    '106-110': 'dans le Thanalan septentrional',
    '111-115': 'dans le Thanalan méridional',
    '116-120': 'dans le Thanalan occidental',
    '121-140': 'à Ishgard',
    '141-145': 'dans le Coerthas central',
    '146-150': 'dans le Coerthas occidental',
    '151-155': 'à l\étendue de Rhalgr',
    '156-160': 'dans les Marges',
    '161-165': 'dans les Pics',
    '166-175': 'à Ala Mhigo',
    '176-180': 'dans les faubourgs Mhigois',
    '181-200': 'à Kugane',
    '201-205': 'dans la Mer de Rubis',
    '206-210': 'à Yanxia',
    '211-215': 'dans les steppes d\'Azim',
    '216-220': 'à Doma',
    '221-225': 'dans l\arrière pays dravanien',
};

gen_data['phys_miq_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}. Sa queue {miqote_tail}.'
];

gen_data['phys_aora_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes} {circles}, et il a les cheveux {hair_cut} et {hair_color}. Ses cornes {horns}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}. Sa queue {aora_tail}.'
];

gen_data['phys_roe_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, son nez {nose} et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_hyurg_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, son nez {nose} et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_hyuro_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes} et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_ele_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, ses oreilles {ears} et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_lala_m'] = [
    'Il est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, ses oreilles {ears} et il a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et il {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_miq_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Elle a {tired}, et {hunger}. Sa queue {miqote_tail}.'
];

gen_data['phys_aora_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes} {circles}, et elle a les cheveux {hair_cut} et {hair_color}. Ses cornes {horns}. Son regard est {glance} et elle {smile}. Elle a {tired}, et {hunger}. Sa queue {aora_tail}.'
];

gen_data['phys_roe_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, son nez {nose} et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Elle a {tired}, et {hunger}.'
];

gen_data['phys_hyurg_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, son nez {nose} et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Elle a {tired}, et {hunger}.'
];

gen_data['phys_hyuro_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes} et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_ele_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, ses oreilles {ears} et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Il a {tired}, et {hunger}.'
];

gen_data['phys_lala_f'] = [
    'Elle est {height} pour sa race et du genre {strength}. Ses yeux sont {eyes}, ses oreilles {ears} et elle a les cheveux {hair_cut} et {hair_color}. Son regard est {glance} et elle {smile}. Il a {tired}, et {hunger}.'
];

gen_data['height'] = {
    '0': 'minuscule',
    '1-10': 'très petit(e)',
    '11-20': 'petit(e)',
    '21-40': 'd\'une taille standard',
    '41-50': 'grand(e)',
    '51-60': 'très grand(e)',
    '61': 'gigantesque'
};

gen_data['strength'] = {
    '0': 'extrêmement faible physiquement',
    '1-10': 'faible physiquement, c\'est un(e) mage',
    '11-20': 'a entretenir un minimum son physique malgré le fait qu\'il/elle soit mage',
    '21-40': 'un minimum musclé(e)',
    '41-50': 'plutôt musclé(e)',
    '51-60': 'très musclé(e)',
    '61': 'Arnold Schwarzenegger dans sa jeunesse'
};

gen_data['eyes'] = {
    '0': 'gris, il est aveugle',
    '1': 'gris et bleu, il est borgne',
    '2': 'gris et vert, il est borgne',
    '3': 'gris et marron, il est borgne',
    '4': 'gris et rouge, il est borgne',
    '5': 'gris et jaune, il est borgne',
    '6': 'gris et violet, il est borgne',
    '7': 'gris et orange, il est borgne',
    '8': 'vairons bleu et vert',
    '9': 'vairons bleu et marron',
    '10': 'vairons bleu et rouge',
    '11': 'vairons bleu et jaune',
    '12': 'vairons bleu et violet',
    '13': 'vairons bleu et orange',
    '14': 'vairons vert et marron',
    '15': 'vairons vert et rouge',
    '16': 'vairons vert et jaune',
    '17': 'vairons vert et violet',
    '18': 'vairons vert et orange',
    '19': 'vairons marron et rouge',
    '20': 'vairons marron et jaune',
    '21': 'vairons marron et violet',
    '22': 'vairons marron et orange',
    '23': 'vairons rouge et jaune',
    '24': 'vairons rouge et violet',
    '25': 'vairons rouge et orange',
    '26': 'vairons jaune et violet',
    '27': 'vairons jaune et orange',
    '28': 'vairons violet et orange',
    '29-50': 'bleus',
    '51-70': 'verts',
    '71-90': 'marron',
    '91-95': 'rouges',
    '95-100': 'jaunes',
    '101-105': 'violets',
    '106-110': 'orange'
};

gen_data['circles'] = {
    '0-5': 'cerclés de bleu',
    '6-10': 'cerclés de vert',
    '11-15': 'cerclés de jaune',
    '16-20': 'cerclés de violet',
    '21-25': 'cerclés de blanc',
    '26-30': '',
};

gen_data['hair_cut'] = {
    '0': 'rasés',
    '1-10': 'coupés très courts',
    '11-20': 'relativement courts',
    '21-40': 'mi-longs',
    '41-50': 'au niveau des épaules',
    '51-60': 'longs',
    '61': 'très longs'
};

gen_data['hair_color'] = {
    '0': 'blancs',
    '1-10': 'blonds',
    '11-30': 'chatains',
    '31-50': 'bruns',
    '51-60': 'roux',
    '61-65': 'bleus',
    '66-70': 'gris',
    '71-75': 'rouges',
    '76-80': 'verts',
    '71-75': 'violets',
};

gen_data['horns'] = [
    'partent vers l\'arrière et sont assez fines',
    'sont épaisses et partent vers l\'avant',
    'sont petites et partent vers le haut',
    'sont épaisses mais courtes',
    'sont plutôt longues et fines',
    'sont grandes et épaisses'
];

gen_data['glance'] = {
    '0': 'pétillant',
    '1-10': 'acéré',
    '11-30': 'morne',
    '31-50': 'affuté',
    '51-60': 'torve',
    '61-65': 'froid',
    '66-70': 'bienveillant',
    '71-75': 'enjoué',
    '76-80': 'libidineux',
    '81-85': 'vicelard',
};

gen_data['smile'] = {
    '0': 'a un sourire sadique',
    '1-10': 'affiche toujours une moue blasée',
    '11-30': 'souvent le sourire aux lèvres',
    '31-50': 'un sourire triste aux lèvres',
    '51-60': 'un visage fermé',
    '61-65': 'un petit sourire aux lèvres en permanence',
    '66-70': 'un sourire lubrique',
    '71-75': 'a l\'air timide',
    '76-80': 'a d\'étranges tatouages',
    '81-85': 'a des tatouages tribaux',
    '86-90': 'a quelques cicatrices',
    '91-95': 'a de nombreuses cicatrices'
};

gen_data['tired'] = {
    '0-20': 'l\'air en forme',
    '21-25': 'l\'air épuisé(e)',
    '26-30': 'toujours l\'air en forme'
};

gen_data['hunger'] = {
    '0-20': 'mange à sa faim',
    '21-25': 'a l\'air maigre',
    '26-30': 'a un peu de ventre',
    '31-35': 'mange sans doute beaucoup trop'
};

gen_data['miqote_tail'] = {
    '0': 'est comme celle d\'un lion',
    '1': 'est touffue',
    '2': 'est plutôt fine',
    '3': 'est courte mais épaisse'
};

gen_data['aora_tail'] = {
    '0': 'est épaisse et courte',
    '1': 'est épaisse et longue',
    '2': 'est fine et longue',
    '3': 'est fine et courte',
};

gen_data['nose'] = [
    'est en patate',
    'est plutôt fin pour sa race',
    'est très épais avec d\'énormes narines',
    'est sembable a celui d\'un Hyurois, c\'est d\ailleurs surprenant'
];

gen_data['ears'] = [
    'sont petites et pointues',
    'sont petites et décollées',
    'sont longues et poitues',
    'sont longues et décollées, de vraies paraboles',
    'sont fines et longues',
    'sont peu pointues pour sa race'
];

gen_data['psy_moon_m'] = {
    '0': 'Il est plutôt solitaire, comme la plupart des Miqo\'tes lunaires. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_sol_m'] = {
    '0': 'Il a de très fort lien avec sa tribu. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_aora_m'] = {
    '0': 'Il est solitaire et s\'isole souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_roe_m'] = {
    '0': 'Il est intimidant, du coup en général seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_hyurg_m'] = {
    '0': 'Il est intimidant, du coup en général seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_hyuro_m'] = {
    '0': 'Il a toujours l\'air perdu dans ses pensés;es. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_ele_m'] = {
    '0': 'Il n\'apprécie vraiment que les autres Elezens. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['psy_lala_m'] = {
    '0': 'Il achète les gens pour avoir des amis. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '1': 'Il est assez sociable et reste rarement seul. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '2': 'Il est du genre à picoler avec des copains assez souvent. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.',
    '3': 'Il est plutôt timide mais apprécie la compagnie. {global_psy_m_1}. {global_psy_m_2}. {global_psy_m_3}.'
};

gen_data['global_psy_m_1'] = {
    '0': 'En réalité c\'est un véritable pervers',
    '1': 'Assez réservé de prime abord, il est en fait complètement déshinibé quand il est en confiance',
    '2': 'Du genre calme, il est globalement réservé',
    '3': 'Clairement coincé du cul, il est très difficile de lui faire décrocher ne serait-ce qu\'un sourire'
};

gen_data['global_psy_m_2'] = {
    '0': 'Absolument pas fiable, il trahira sans hésité pour de l\'argent',
    '1': 'Bien trop pleutre pour être fiable au combat, il n\'en reste pas moins honnête',
    '2': 'Plutôt loyalee, il ne laisse tomber ses camarades que s\'ils le déçoivent',
    '3': 'Si c\'est votre ami, il pourra mourir pour vous sauver, et ce même si vous l\'avez trahis'		
};

gen_data['global_psy_m_3'] = {
    '0': 'Il ne parle pas beaucoup de son passé, sans doute car il est douloureux',
    '1': 'Son histoire est banale, il n\'a jamais eu de réel problème dans la vie',
    '2': 'Il a eu une vie heureuse jusque là, le veinard',
    '3': 'Il prétend beaucoup de choses quant à son passé, mais personne ne peut confirmer que c\'est vrai'		
};

gen_data['psy_moon_f'] = {
    '0': 'Elle est plutôt solitaire, comme la plupart des Miqo\'tes lunaires. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_sol_f'] = {
    '0': 'Elle a de très fort lien avec sa tribu. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_aora_f'] = {
    '0': 'Elle est solitaire et s\'isole souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_roe_f'] = {
    '0': 'Elle est effrayante, du coup en général seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_hyurg_f'] = {
    '0': 'Elle est effrayante, du coup en général seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_hyuro_f'] = {
    '0': 'Elle a toujours l\'air perdue dans ses pensées. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_ele_f'] = {
    '0': 'Elle n\'apprécie vraiment que les autres Elezens. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['psy_lala_f'] = {
    '0': 'Elle achète les gens pour avoir des amis. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '1': 'Elle est assez sociable et reste rarement seule. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '2': 'Elle est du genre à picoler avec des copains assez souvent. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.',
    '3': 'Elle est plutôt timide mais apprécie la compagnie. {global_psy_f_1}. {global_psy_f_2}. {global_psy_f_3}.'
};

gen_data['global_psy_f_1'] = {
    '0': 'En réalité c\'est une véritable sadique, mais elle le cache',
    '1': 'Assez réservée de prime abord, elle est en fait très drôle quand elle est en confiance',
    '2': 'Du genre calme, elle est globalement réservée',
    '3': 'Clairement coincée du cul, il est très difficile de lui faire décrocher ne serait-ce qu\'un sourire'
};

gen_data['global_psy_f_2'] = {
    '0': 'Absolument pas fiable, elle trahira sans hésité pour de l\'argent',
    '1': 'Bien trop peureuse pour être fiable au combat,elle n\'en reste pas moins honnête',
    '2': 'Plutôt loyale, elle ne laisse tomber ses camarades que s\'ils la déçoivent',
    '3': 'Si c\'est votre amie, elle pourra mourir pour vous sauver, et ce même si vous l\'avez trahis'		
};

gen_data['global_psy_f_3'] = {
    '0': 'Elle ne parle pas beaucoup de son passé, sans doute car il est douloureux',
    '1': 'Son histoire est banale, elle n\'a jamais eu de réel problème dans la vie',
    '2': 'Elle a eu une vie heureuse jusque là, cette chanceuse',
    '3': 'Elle prétend beaucoup de choses quant à son passé, mais personne ne peut confirmer que c\'est vrai'		
};

// /PNJs ----------------------------------------

// loot -----------------------------------------

gen_data['loot'] = [
    'Un(e) {type_mag_weap} {madeOf_mag_weap}, {weight_mag_weap}.',
    'Un(e) {type_phy_weap} {madeOf_phy_weap}, {weight_phy_weap}.',
    'Un(e) {type_armor}.'
];

// mag weap -------------------------------------

gen_data['mag_weap'] = [
    'Un(e) {type_mag_weap} {madeOf_mag_weap}, {weight_mag_weap}.'
];

gen_data['type_mag_weap'] = [
    'sceptre', 'bâton', 'ramille', 'canne', 'grimoire', 'codex', 'picatrix', 'astrolabe', 'planisphère'
];

gen_data['madeOf_mag_weap'] = {
    '1': 'en bois',
    '2-3': 'en fer',
    '4-5': 'en acier',
    '6': 'en mithril',
    '7': 'en sombracier',
    '8': 'en argent',
    '9': 'en cupronickel',
    '10': 'en durargent',
    '11': 'en obsydienne',
    '12': 'en os de dragon',
    '13': 'en mithril noble',
    '14': 'en durium',
    '15': 'en bronze',
    '16': 'en sombracier rafiné'
};

gen_data['weight_mag_weap'] = [
    'léger(e) et maniable {materias_mag_weap}',
    'sans particularité',
    'plus lourd(e) que la normale {materias_mag_weap}'
];

gen_data['materias_mag_weap'] = [
    'et serti(e) de matérias renforçant {bonus_mag_weap}',
    ' ',
    'mais serti(e) de matérias réduisant {bonus_mag_weap}'
];

gen_data['bonus_mag_weap'] = {
    '1': 'la résistance éthérée au feu', 
    '2': 'la résistance éthérée à la glace',
    '3': 'la résistance éthérée à l\'eau', 
    '4': 'la résistance éthérée à la terre', 
    '5': 'la résistance éthérée au vent', 
    '6': 'la résistance éthérée à la foudre',
    '7': 'la résistance éthérée',
    '8': 'la puissance éthérée de feu', 
    '9': 'la puissance éthérée de glace',
    '10': 'la puissance éthérée de l\'eau', 
    '11': 'la puissance éthérée de la terre', 
    '12': 'la puissance éthérée du vent', 
    '13': 'la puissance éthérée de la foudre',
    '0': 'la puissance éthérée',
    '14': 'la vitesse d\'incantation',
    '15': 'la précision des sorts'
};	

// /mag weap ------------------------------------

// phy weap -------------------------------------

gen_data['phy_weap'] = [
    'Un(e) {type_phy_weap} {madeOf_phy_weap}, {weight_phy_weap}.'
];

gen_data['type_phy_weap'] = [
    'épée', 'rapière', 'estramançon', 'hache d\'arme', 'arc', 'lance', 'hallebarde', 'sabre', 'dague', 'fusil', 'pistolet', 'faux', 'masse d\'arme', 'bouclier', 'machette', 'couteau', 'épée batarde', 'hachette', 'pique', 'marteau de guerre'
];

gen_data['madeOf_phy_weap'] = {
    '1': 'en bois',
    '2-3': 'en fer',
    '4-5': 'en acier',
    '6': 'en mithril',
    '7': 'en sombracier',
    '8': 'en argent',
    '9': 'en cupronickel',
    '10': 'en durargent',
    '11': 'en obsydienne',
    '12': 'en os de dragon',
    '13': 'en mithril noble',
    '14': 'en durium',
    '15': 'en bronze',
    '16': 'en sombracier rafiné'
};

gen_data['weight_phy_weap'] = [
    'léger(e) et maniable {materias_phy_weap}',
    'sans particularité',
    'plus lourd(e) que la normale {materias_phy_weap}'
];

gen_data['materias_phy_weap'] = [
    'et serti(e) de matérias renforçant {bonus_phy_weap}',
    ' ',
    'mais serti(e) de matérias réduisant {bonus_phy_weap}'
];

gen_data['bonus_phy_weap'] = {
    '1': 'la résistance éthérée au feu', 
    '2': 'la résistance éthérée à la glace',
    '3': 'la résistance éthérée à l\'eau', 
    '4': 'la résistance éthérée à la terre', 
    '5': 'la résistance éthérée au vent', 
    '6': 'la résistance éthérée à la foudre',
    '7': 'la résistance éthérée',
    '8': 'la puissance éthérée de feu', 
    '9': 'la puissance éthérée de glace',
    '10': 'la puissance éthérée de l\'eau', 
    '11': 'la puissance éthérée de la terre', 
    '12': 'la puissance éthérée du vent', 
    '13': 'la puissance éthérée de la foudre',
    '0': 'la puissance éthérée',
    '14': 'la vitesse d\'attaque physique',
    '14': 'la force',
    '15': 'la résistance physique',
    '16': 'la précision'
};	

// /phy weap ------------------------------------

// armor ----------------------------------------

gen_data['armor'] = [
    'Un(e) {type_armor}.'
];

gen_data['type_armor'] = [
    'plastron {madeOf_armor}, {weight_armor}',
    'haubert {madeOf_armor}, {weight_armor}',
    'casque {madeOf_armor}, {weight_armor}',
    'heaume {madeOf_armor}, {weight_armor}',
    'paire de gantelets {madeOf_armor}, {weight_armor}',
    'paire de jambières {madeOf_armor}, {weight_armor}',
    'paire de bottes {madeOf_armor}, {weight_armor}',
    'manteau {madeOf_mag}, {weight_mag}',
    'coule {madeOf_mag}, {weight_mag}',
    'robe {madeOf_mag}, {weight_mag}',
    'une paire de gants {madeOf_mag}, {weight_mag}',
    'une paire de mitaines {madeOf_mag}, {weight_mag}',
    'pantalon {madeOf_mag}, {weight_mag}',
    'jupe {madeOf_mag}, {weight_mag}',
    'paire de chaussures {madeOf_mag}, {weight_mag}',
    'paire de bottes en cuir renforcé, {weight_mag}',
    'diadème {madeOf_armor}, {weight_mag}',
    'masque {madeOf_armor}, {weight_mag}',
];

gen_data['madeOf_armor'] = {
    '1': 'en cuir',
    '2-3': 'en fer',
    '4-5': 'en acier',
    '6': 'en mithril',
    '7': 'en sombracier',
    '8': 'en argent',
    '9': 'en cupronickel',
    '10': 'en durargent',
    '11': 'en obsydienne',
    '12': 'en os de dragon',
    '13': 'en mithril noble',
    '14': 'en durium',
    '15': 'en bronze',
    '16': 'en sombracier rafiné',
};

gen_data['madeOf_mag'] = {
    '1': 'en laine',
    '2-3': 'en coton',
    '4-5': 'en lin',
    '6': 'en soie',
    '7': 'en rubicoton',
    '8': 'en chanvre',
    '9': 'en cuir souple',
    '10': 'en poils de spriggans',
    '11': 'en plumes',
    '12': 'en peaux de bête',
    '13': 'en fibres allagoises',
    '14': 'en soies belhadiennes',
    '15': 'en coton gelmorréen',
    '16': 'en lin nymien',
};

gen_data['weight_armor'] = [
    'léger(e)(s) et flexible(s) {materias_armor}',
    'sans particularité',
    'plus lourd(e)(s) que la normale {materias_armor}'
];

gen_data['weight_mag'] = [
    'très bien ouvragé(e)(s) {materias_mag}',
    'sans particularité',
    'assez grossier(e)(s) {materias_mag}'
];

gen_data['materias_armor'] = [
    'et serti(e)(s) de matérias renforçant {bonus_phy}',
    ' ',
    'mais serti(e)(s) de matérias réduisant {bonus_phy}'
];

gen_data['materias_mag'] = [
    'et serti(e)(s) de matérias renforçant {bonus_mag}',
    ' ',
    'mais serti(e)(s) de matérias réduisant {bonus_mag}'
];

gen_data['bonus_phy'] = {
    '1': 'la résistance éthérée au feu', 
    '2': 'la résistance éthérée à la glace',
    '3': 'la résistance éthérée à l\'eau', 
    '4': 'la résistance éthérée à la terre', 
    '5': 'la résistance éthérée au vent', 
    '6': 'la résistance éthérée à la foudre',
    '7': 'la résistance éthérée',
    '8': 'la puissance éthérée de feu', 
    '9': 'la puissance éthérée de glace',
    '10': 'la puissance éthérée de l\'eau', 
    '11': 'la puissance éthérée de la terre', 
    '12': 'la puissance éthérée du vent', 
    '13': 'la puissance éthérée de la foudre',
    '0': 'la puissance éthérée',
    '14': 'la vitesse d\'attaque physique',
    '14': 'la force',
    '15': 'la résistance physique',
    '16': 'la précision',
};

gen_data['bonus_mag'] = {
    '1': 'la résistance éthérée au feu', 
    '2': 'la résistance éthérée à la glace',
    '3': 'la résistance éthérée à l\'eau', 
    '4': 'la résistance éthérée à la terre', 
    '5': 'la résistance éthérée au vent', 
    '6': 'la résistance éthérée à la foudre',
    '7': 'la résistance éthérée',
    '8': 'la puissance éthérée de feu', 
    '9': 'la puissance éthérée de glace',
    '10': 'la puissance éthérée de l\'eau', 
    '11': 'la puissance éthérée de la terre', 
    '12': 'la puissance éthérée du vent', 
    '13': 'la puissance éthérée de la foudre',
    '0': 'la puissance éthérée',
    '14': 'la vitesse d\'incantation',
    '15': 'la précision des sorts'
};

// /armor ---------------------------------------

// /loot ----------------------------------------

// general functions ----------------------------

function generate_text (type) {
	var list; if (list = gen_data[type]) {
		var string; if (string = select_from(list)) {
			return expand_tokens(string);
		}
	}
	return '';
}

function generate_list (type, n_of) {
	var list = {};
	var i; for (i = 0; i < n_of; i++) {
	  list.push(generate_text(type));
	}
	return list;
}

function select_from (list) {
	if (list.constructor == Array) {
		return select_from_array(list);
	} else {
		return select_from_table(list);
	}
}

function select_from_array (list) {
	return list[Math.floor(Math.random() * list.length)];
}

function select_from_table (list) {
	var len; if (len = scale_table(list)) {
		var idx = Math.floor(Math.random() * len) + 1;
		var key; for (key in list) {
			var r = key_range(key);
			if (idx >= r[0] && idx <= r[1]) { return list[key]; }
		}
	}
	return '';
}

function scale_table (list) {
	var len = 0;
	var key; for (key in list) {
		var r = key_range(key);
		if (r[1] > len) { len = r[1]; }
		}
	return len;
}

function key_range (key) {
	var match; 
	if (match = /(\d+)-00/.exec(key)) {
		return [ parseInt(match[1]), 100 ];
	} else if (match = /(\d+)-(\d+)/.exec(key)) {
		return [ parseInt(match[1]), parseInt(match[2]) ];
	} else if (key == '00') {
		return [ 100, 100 ];
	} else {
		return [ parseInt(key), parseInt(key) ];
	}
}

function expand_tokens (string) {
	var match; while (match = /{(\w+)}/.exec(string)) {
		var token = match[1];
		var repl; 
		if (repl = generate_text(token)) {
			string = string.replace('{'+token+'}',repl);
		} else {
			string = string.replace('{'+token+'}',token);
		}
	}
	return string;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function pause (millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

// /general functions ---------------------------

// /generators ----------------------------------