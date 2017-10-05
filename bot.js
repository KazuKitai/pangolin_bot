var nr = require('newrelic');
var express = require('express');
var app = express();
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const PORT = process.env.PORT || 3000;
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

// generators -----------------------------------

var gen_data = {};

// wounds ---------------------------------------

gen_data['head_lightWound'] = [
	'Touch&eacute; &agrave; la t&ecirc;te, {headPartLight}'
];
gen_data['head_mediumWound'] = [
	'Touch&eacute; &agrave; la t&ecirc;te, {headPartMedium}'
];
gen_data['head_seriousWound'] = [
	'Touch&eacute; &agrave; la t&ecirc;te, {headPartSerious}'
];

gen_data['headPartLight'] = [
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgLight}.',
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgLight}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgLight}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgLight}.'
];
gen_data['headPartMedium'] = [
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgMedium}.'
];
gen_data['headPartSerious'] = [
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment l\'os du cr&acirc;ne en lui m&ecirc;me. {craniumDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil gauche. {eyeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille gauche. {earDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment sur le nez. {noseDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la bouche. {mouthDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au cou. {neckDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oeil droit. {eyeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'oreille droite. {earDmgSerious}.'
];

gen_data['craniumDmgLight'] = {
	'0-5': 'Le cuir chevelu est bien entam&eacute; mais sinon &ccedil;a va',
	'6-8': 'Naus&eacute;es et vertiges pendant plusieurs minutes'
};	
gen_data['eyeDmgLight'] = {
	'0-5': 'L\'oeil est irrit&eacute;, rien de tr&egrave;s grave',
	'6-15': 'Un joli oeil au beurre noir'
};
gen_data['earDmgLight'] = {
	'0-5': 'Le lobe est tranch&eacute;, douloureux mais sans gravit&eacute;',
	'6-15': 'Un coup sur l\'oreille qui sonne un peu, mais rien de plus'
};
gen_data['noseDmgLight'] = {
	'0-5': 'Un coup sur le nez qui fait bien mal, &ccedil;a saigne un peu',
	'6-15': 'Un coup sur le nez qui fait mal et sonne un peu, mais rien de plus'
};
gen_data['mouthDmgLight'] = {
	'0-5': 'Les l&egrave;vres sont coup&eacute;es, &ccedil;a saigne un peu',
	'6-15' : 'Un bon coup dans les dents. Ca fait mal, mais c\'est tout'
};
gen_data['neckDmgLight'] = {
	'0-9': 'De belles entailles, mais aucune veine ou art&egrave;re de touch&eacute;e, ouf',
	'10': 'Un l&eacute:ger crac au niveau des cervicales ... Mais rien de grave, un simple d&eacute;but de torticoli'
};

gen_data['craniumDmgMedium'] = {
	'0-3': 'Une belle fracture du crane, sans danger si soign&eacute;e rapidement, mais une convalescence s\'impose',
	'4-9': 'Perte de connaissance pendant plusieurs minutes',
	'9-12': 'Perte de connaissance pendant plusieurs minutes. L&eacute;g&egrave;re perte de m&eacutes;moire pour quelques jours'
};	
gen_data['eyeDmgMedium'] = {
	'0-3': 'La paupi&egrave;re est coup&eacute;e, du sang coule dans l\'oeil emp&ecirc;chant de voir avec celui-ci',
	'4-5': 'Une l&eacute;g&egrave;re entaille sur la corn&eacute;e, il faudra soigner &ccedil;a avec attention. Tr&egrave;s douloureux'
};
gen_data['earDmgMedium'] = {
	'0-3': 'Certains os internes sont bris&eacute;s, c\'est tr&egrave;s douloureux et le personnage entendra moins bien pendant quelques temps',
	'4-8': 'Certains os internes sont bris&eacute;s, c\'est tr&egrave;s douloureux et le personnage aura de l&eacute;gers troubles de l\'&eacute;quilibre pendant quelques temps'
};
gen_data['noseDmgMedium'] = {
	'0-3': 'Le cartilage est en mille morceaux, c\'est tr&egrave;s douloureux',
	'4-8': 'Le nez est cass&eacute; et saigne abondament. Impossible de respirer avec'
};
gen_data['mouthDmgMedium'] = {
	'0-3': 'Une dent de cass&eacute;e ! Une',
	'4-8': 'Les l&egrave;vres sont coup&eacute;es, &ccedil;a saigne beaucoup'
};
gen_data['neckDmgMedium'] = [
	'Une petite luxation des cervicales, c\'est extr&ecirc;mement douloureux et il faudra qu\'un m&eacute;decin voit &ccedil;&, c\'est dangereux si mal soign&eacute;',
	'Une petite luxation des cervicales, c\'est extr&ecirc;mement douloureux et il faudra qu\'un m&eacute;decin voit &ccedil;&, c\'est dangereux si mal soign&eacute;',
];

gen_data['craniumDmgSerious'] = {
	'0-2': 'Le cerveau est touch&eacute;, c\'est extr&ecirc;mement grave',
	'3-8': 'Une jolie commotion c&eacute;r&eacute;brale, il va falloir se reposer',
	'9-13': 'Perte de connaissance pendant plusieurs minutes. Grosse perte de m&eacute;moire pour quelques semaines',
	'14': 'Le cerveau est trop endommag&eacute; pour esp&eacute;rer sauver le personnage'
};	
gen_data['eyeDmgSerious'] = {
	'0': 'L\'oeil est crev&eacute;',
	'1-5': 'Une belle entaille sur la corn&eacute;e, il faudra soigner &ccedil;a avec attention. Tr&egrave;s douloureux'
};
gen_data['earDmgSerious'] = {
	'0': 'L\'oreille est coup&eacute;e nette',
	'1-4': 'Les os internes sont bris&eacute;s, c\'est tr&egrave;s douloureux et impossible d\'entendre avec cette oreille d&eacute;sormais',
	'5': 'Les os internes sont bris&eacute;s, c\'est tr&egrave;s douloureux et impossible d\'entendre avec cette oreille d&eacute;sormais. De plus, le personnage a dor&eacute;navant un probl&egrave;me d\'&eacute;quilibre tant qu\'il n\'a pas &eacute;t&eacute; soign&eacute;'
};
gen_data['noseDmgSerious'] = {
	'0': 'Le nez est coup&eacute; net !',
	'1': 'La cloison nasale est d&eacute;plac&eacute;e, rendant la respiration difficile, et n&eacute;cessittant une intervention chirurgicale'
};
gen_data['mouthDmgSerious'] = {
	'0': 'Quatre dents volent en &eacute;clats, la douleur est intense',
	'1' : 'La machoire est d&eacute;boit&eacute;e, sans intervention d\'un m&eacutedecin, pas moyen de parler. C\'est tr&egrave;s douloureux'
};
gen_data['neckDmgSerious'] = {
	'0': 'Une magnifique luxation des cervicales, c\'est extr&ecirc;mement douloureux et il faudra qu\'un m&eacute;decin voit &ccedil;&, c\'est dangereux si mal soign&eacute;',
	'1': 'Une art&egrave;re a &eacute;t&eacute; touch&eacute;e, mort assur&eacute;e sans intervention m&eacute;dicale imm&eacute;diate'
};

gen_data['leftArm_lightWound'] = [
	'Touch&eacute; au bras gauche, {armPartLight}'
];
gen_data['leftArm_mediumWound'] = [
	'Touch&eacute; au bras gauche, {armPartMedium}'
];
gen_data['leftArm_seriousWound'] = [
	'Touch&eacute; au bras gauche, {armPartSerious}'
];

gen_data['rightArm_lightWound'] = [
	'Touch&eacute; au bras droit, {armPartLight}'
];
gen_data['rightArm_mediumWound'] = [
	'Touch&eacute; au bras droit, {armPartMedium}'
];
gen_data['rightArm_seriousWound'] = [
	'Touch&eacute; au bras droit, {armPartSerious}'
];

gen_data['armPartLight'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgLight}.'
];
gen_data['armPartMedium'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgMedium}.'
];
gen_data['armPartSerious'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la main. {handDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au poignet. {wristDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'avant-bras. {forearmDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au coude. {elbowDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le coude et l\'&eacute;paule. {armDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'&eacute;paule. {shoulderDmgSerious}.'
];

gen_data['handDmgLight'] = [
	'Une belle entaille, c\'est handicapant pour le combat mais sans s&eacute;quelle sur le court terme',
	'Une belle entaille, c\'est handicapant pour le combat mais sans s&eacute;quelle sur le court terme',
];
gen_data['wristDmgLight'] = {
	'0': 'Une l&eacute;g&egrave;re entaille, rien de bien m&eacute;chant',
	'1-5': 'Le poignet est foul&eacute;, c\'est pas tr&egrave;s grave mais &ccedil;a fait assez mal',
};
gen_data['forearmDmgLight'] = {
	'0-5': 'Des entailles/brulures &ccedil;a et l&agrave;, rien de grave',
	'6-10': 'Des poils roussis/ras&eacute;s, rien de plus'
};
gen_data['elbowDmgLight'] = {
	'0-5': 'Le nerf a &eacute;t&eacute; pinc&eacute;, c\'est surtout d&eacute;sagr&eacute;able et peu dangereux',
	'6-10': 'Rien de bien grave, des petites entailles'
};
gen_data['armDmgLight'] = {
	'0-5': 'Un beau bleu sur le c&ocirc;t&eacute; du bras, c\'est douloureux mais sans plus',
	'6-10': 'Trois fois rien, des petits bleus ou quelques &eacute;gratignures'
};
gen_data['shoulderDmgLight'] = {
	'1-5': 'Quelques brulures/coupures, mais rien de bien m&eacute;chant',
	'6-10': 'Un coup sur l\'&eacute;paule, &ccedil;a d&eacute;s&eacute;libre mais rien de plus'
};

gen_data['handDmgMedium'] = {
	'0-5': 'Deux doigts sont retourn&eacute;s, pas gravissime, mais tr&egrave;s douloureux',
	'6-9': 'Un doigt est retourn&eacute;, pas gravissime, mais tr&egrave;s douloureux'
};
gen_data['wristDmgMedium'] = {
	'0-5': 'Le poignet est foul&eacute;, c\'est pas tr&egrave;s grave mais &ccedil;a fait assez mal',
	'6-9': 'Une petite entorse, il faudra quelques semaines de gu&eacute;rison'
};
gen_data['forearmDmgMedium'] = {
	'0-5': 'Une profonde entaille entre le cubitus et le radius, plus de peur que de mal, enfin &ccedil;a fait drolement mal quand m&ecirc;me',
	'6-10': 'Le muscle de l\'avant-bras a &eacute;t&eacute; bien coup&eacute;, c\'est douloureux, et il faudra ne pas trop bouger pour que &ccedil;a gu&eacute;risse'
};
gen_data['elbowDmgMedium'] = {
	'0-5': 'Le nerf a &eacute;t&eacute; touch&eacute;, ce qui implique des difficult&eacute;s &agrave; utiliser le bras pendant quelques temps',
	'6-9': 'Un bel h&eacute;matome sur le coude, sans aucun doute un petit oed&egrave;me, il faut soigner &ccedil;a tr&egrave;s vite',
};
gen_data['armDmgMedium'] = [
	'Une profonde entaille a bien entam&eacute; le biceps, il faudra pas trop bouger pendant quelques jours et &ccedil;a saigne beaucoup',
	'Une profonde entaille a bien entam&eacute; le biceps, il faudra pas trop bouger pendant quelques jours et &ccedil;a saigne beaucoup'
];
gen_data['shoulderDmgMedium'] = [
	'Une profonde entaille au niveau des trap&egrave;zes, c\'est douloureux mais peu dangereux',
	'Une profonde entaille au niveau des trap&egrave;zes, c\'est douloureux mais peu dangereux',
];

gen_data['handDmgSerious'] = {
	'0': 'La plupart des os sont bris&eacute;s, la main est inutilisable pendant plusieurs semaines',
	'1-5': 'Quatre doigts sont retourn&eacute;s, tr&egrave;s douloureux et handicapant',
};
gen_data['wristDmgSerious'] = {
	'0-2': 'Le poignet est cass&eacute;, purement et simplement.',
	'2-4': 'Une belle entorse, il faudra plusieurs semaines de gu&eacute;rison',
	'5': 'Une entaille s&eacute;v&egrave;re au niveau des veines du poignet, c\'est dangereux sans prise en charge m&eacute;dicale rapide'
};
gen_data['forearmDmgSerious'] = [
	'L\'avant-bras est cass&eacute;, cubitus et radius &agrave; la fois',
	'L\'avant-bras est cass&eacute;, cubitus et radius &agrave; la fois',
];
gen_data['elbowDmgSerious'] = {
	'0': 'Le coude est cass&eacute;, bonjour la convalescence',
	'1-5': 'Un bel h&eacute;matome sur le coude, sans aucun doute un oed&egrave;me, il faut soigner &ccedil;a tr&egrave;s vite'
};
gen_data['armDmgSerious'] = [
	'L\'humerus est cass&eacute;, c\'est pas rien, &ccedil;a fait parti des os les plus solides du corps ... Bonjour la douleur',
	'L\'humerus est cass&eacute;, c\'est pas rien, &ccedil;a fait parti des os les plus solides du corps ... Bonjour la douleur',
];
gen_data['shoulderDmgSerious'] = {
	'0': 'L\'articulation est disloqu&eacute;e, non seulement &ccedil;a fait tr&egrave;s mal, mais en plus il faut un m&eacute;decin pour remettre tout &ccedil;a ..',
	'1-5': 'Une profonde entaille au niveau des trap&egrave;zes, c\'est douloureux mais peu dangereux',
	'6-9': 'Quelques brulures/coupures, mais rien de bien m&eacute;chant',
	'10': 'Un coup sur l\'&eacute;paule, &ccedil;a d&eacute;s&eacute;libre mais rien de plus'
};

gen_data['bodyBones_lightWound'] = [
	'Touch&eacute; au niveau des cotes et/ou du dos, {bodyBonesPartLight}'
];
gen_data['bodyBones_mediumWound'] = [
	'Touch&eacute; au niveau des cotes et/ou du dos, {bodyBonesPartMedium}'
];
gen_data['bodyBones_seriousWound'] = [
	'Touch&eacute; au niveau des cotes et/ou du dos, {bodyBonesPartSerious}'
];

gen_data['bodyBonesPartLight'] = [
	'plus pr&eacute;cis&eacute;ment en plein plexus. {plexusDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgLight}.',
	'plus pr&eacute;cis&eacute;ment sur le haut de la colonne. {upperSpineDmgLight}.',
	'plus pr&eacute;cis&eacute;ment sur le bas de la colonne. {lowerSpineDmgLight}.',
];
gen_data['bodyBonesPartMedium'] = [
	'plus pr&eacute;cis&eacute;ment en plein plexus. {plexusDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment sur le haut de la colonne. {upperSpineDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment sur le bas de la colonne. {lowerSpineDmgMedium}.',
];
gen_data['bodyBonesPartSerious'] = [
	'plus pr&eacute;cis&eacute;ment en plein plexus. {plexusDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes gauches. {leftRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des c&ocirc;tes flottantes droites. {rightRibCageDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate gauche. {leftColarDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'homoplate droite. {rightColarDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment sur le haut de la colonne. {upperSpineDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment sur le bas de la colonne. {lowerSpineDmgSerious}.',
];

gen_data['plexusDmgLight'] = {
	'0-5': 'Le souffle coup&eacute;, une belle entaille qui laissera une cicatrice, mais &ccedil;a va',
	'6-10': 'Quelques secondes pour reprendre son souffle, et &ccedil;a ira'
};
gen_data['leftRibCageDmgLight'] = {
	'0-5': 'Un tr&eacute;s bel h&eacute;matome sur le torse, c\'est tr&eacute;s douloureux',
	'6-10': 'Trois fois rien, &ccedil;a fera juste tr&egrave;s mal pendant quelques jours'
};
gen_data['rightRibCageDmgLight'] = {
	'0-5': 'Un tr&eacute;s bel h&eacute;matome sur le torse, c\'est tr&eacute;s douloureux',
	'6-10': 'Trois fois rien, &ccedil;a fera juste tr&egrave;s mal pendant quelques jours'
};
gen_data['leftColarDmgLight'] = [
	'Le coup a frol&eacute; la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand m&ecirc;me douloureux',
	'Le coup a frol&eacute; la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand m&ecirc;me douloureux',
];
gen_data['rightColarDmgLight'] = [
	'Le coup a frol&eacute; la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand m&ecirc;me douloureux',
	'Le coup a frol&eacute; la nuque pour s\'abattre sur l\'homoplate, rien de grave, mais c\'est quand m&ecirc;me douloureux',
];
gen_data['upperSpineDmgLight'] = [
	'Un bel h&eacute;matome, un peu en desous des homoplates, c\'est pas agr&eacute;able du tout',
	'Un bel h&eacute;matome, un peu en desous des homoplates, c\'est pas agr&eacute;able du tout',
];
gen_data['lowerSpineDmgLight'] = [
	'Un bel h&eacute;matome, au niveau des reins, c\'est pas agr&eacute;able du tout',
	'Un bel h&eacute;matome, au niveau des reins, c\'est pas agr&eacute;able du tout'
];

gen_data['plexusDmgMedium'] = [
	'Un bon coup qui coupe le souffle ! Les c&ocirc;tes autours sont f&eacute;l&eacute;es, la respiration sera douloureuse pendant quelques temps',
	'Un bon coup qui coupe le souffle ! Les c&ocirc;tes autours sont f&eacute;l&eacute;es, la respiration sera douloureuse pendant quelques temps'
];
gen_data['leftRibCageDmgMedium'] = {
	'0-3': 'Une cote cass&eacute;e, la respiration sera difficile pendant quelques temps',
	'4-10': 'Un tr&eacute;s gros h&eacute;matome sur le torse, c\'est tr&eacute;s douloureux',
	'11-12': 'Une cote est bris&eacute;e pr&egrave;s de la colonne, le poumon est compress&eacute, mais pas perfor&eacute;',
};
gen_data['rightRibCageDmgMedium'] = {
	'0-3': 'Une cote cass&eacute;e, la respiration sera difficile pendant quelques temps',
	'4-10': 'Un tr&eacute;s gros h&eacute;matome sur le torse, c\'est tr&eacute;s douloureux',
	'11-12': 'Une cote est bris&eacute;e pr&egrave;s de la colonne, le poumon est compress&eacute, mais pas perfor&eacute;',
};
gen_data['leftColarDmgMedium'] = [
	'La premi&egrave;re c&ocirc;te est bris&eacute;e  &#40;en partant du haut &#41;, une tr&egrave;s vive douleur s\'ensuit mais rien de grave',
	'La premi&egrave;re c&ocirc;te est bris&eacute;e  &#40;en partant du haut &#41;, une tr&egrave;s vive douleur s\'ensuit mais rien de grave',
];
gen_data['rightColarDmgMedium'] = [
	'La premi&egrave;re c&ocirc;te est bris&eacute;e  &#40;en partant du haut &#41;, une tr&egrave;s vive douleur s\'ensuit mais rien de grave',
	'La premi&egrave;re c&ocirc;te est bris&eacute;e  &#40;en partant du haut &#41;, une tr&egrave;s vive douleur s\'ensuit mais rien de grave',
];
gen_data['upperSpineDmgMedium'] = [
	'Un tr&egrave;s gros h&eacute;matome, un peu en desous des homoplates, c\'est pas agr&eacute;able du tout',
	'Un tr&egrave;s gros h&eacute;matome, un peu en desous des homoplates, c\'est pas agr&eacute;able du tout'
];
gen_data['lowerSpineDmgMedium'] = [
	'Un tr&egrave;s gros h&eacute;matome, au niveau des reins, c\'est pas agr&eacute;able du tout',
	'Un tr&egrave;s gros h&eacute;matome, au niveau des reins, c\'est pas agr&eacute;able du tout'
];

gen_data['plexusDmgSerious'] = {
	'0': 'Le plexus est litt&eacute;ralement cass&eacute;, d&eacute;j&agrave; c\'est affreusement douloureux, mais en plus la respiration du personnage est d&eacute;sormais difficile, le rendant incapable de combattre',
	'1-5': 'Un bon coup qui coupe le souffle ! Les c&ocirc;tes autours sont f&eacute;l&eacute;es, la respiration sera douloureuse pendant quelques temps'
};
gen_data['leftRibCageDmgSerious'] = {
	'0': 'Trois cotes cass&eacute;es, et un poumon perfor&eacute;, il faut soigner &ccedil;a tr&egrave;s vite',
	'1-2': 'Une cote cass&eacute;e a perc&eacute; une art&egrave;re proche du coeur, mort assur&eacute;e sans soin imm&eacute;diat',
	'3': 'Une cote cass&eacute;e a touch&eacute; le coeur, il n\'y a rien &agrave; faire, c\'est la mort assur&eacute;e'
};
gen_data['rightRibCageDmgSerious'] = {
	'0': 'Trois cotes cass&eacute;es, et un poumon perfor&eacute;, il faut soigner &ccedil;a tr&egrave;s vite',
	'1-2': 'Une cote est bris&eacute;e pr&egrave;s de la colonne, le poumon est perfor&eacute;'
};
gen_data['leftColarDmgSerious'] = {
	'0-3': 'La clavicule est cass&eacute;e, impossible d\'utiliser le bras sans souffrir',
	'4': 'La lame s\'enfonce depuis le creu entre l\'&eacute;paule et le cou jusqu\'&agrave; toucher une art&egrave;re coronaire, mort presque instantann&eacute;e'
};
gen_data['rightColarDmgSerious'] = [
	'La clavicule est cass&eacute;e, impossible d\'utiliser le bras sans souffrir',
	'La clavicule est cass&eacute;e, impossible d\'utiliser le bras sans souffrir'
];
gen_data['upperSpineDmgSerious'] = {
	'0': 'La colonne est bris&eacute;e entre les homoplates, une belle paralysie que voil&agrave;',
	'1-5': 'La colonne est fissur&eacute;e entre les homoplates, c\'est du genre tr&egrave;s douloureux, et tr&egrave;s dangereux si ce n\'est pas pris en charge au plus vite par un m&eacute;decin'
};
gen_data['lowerSpineDmgSerious'] = {
	'0': 'La colonne est bris&eacute;e au dessus du coxys, une belle paralysie que voil&agrave;',
	'1-5': 'La colonne est fissur&eacute;e au dessus du coxys, c\'est du genre tr&egrave;s douloureux, et tr&egrave;s dangereux si ce n\'est pas pris en charge au plus vite par un m&eacute;decin'
};

gen_data['bodyGuts_lightWound'] = [
	'Touch&eacute; au niveau des abdominaux, {bodyGutsPartLight}'
];
gen_data['bodyGuts_mediumWound'] = [
	'Touch&eacute; au niveau des abdominaux, {bodyGutsPartMedium}'
];
gen_data['bodyGuts_seriousWound'] = [
	'Touch&eacute; au niveau des abdominaux, {bodyGutsPartSerious}'
];

gen_data['bodyGutsPartLight'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; l\'estomac. {stomachDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au foie. {liverDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au pancreas. {pancreasDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'intestin gr&ecirc;le. {smallIntestineDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au gros intestin. {largeIntestineDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au rein droit. {rightKidneyDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au rein gauche. {leftKidneyDmgLight}.',
];
gen_data['bodyGutsPartMedium'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; l\'estomac. {stomachDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au foie. {liverDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au pancreas. {pancreasDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'intestin gr&ecirc;le. {smallIntestineDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au gros intestin. {largeIntestineDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au rein droit. {rightKidneyDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au rein gauche. {leftKidneyDmgMedium}.',
];
gen_data['bodyGutsPartSerious'] = [
	'plus pr&eacute;cis&eacute;ment &agrave; l\'estomac. {stomachDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au foie. {liverDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au pancreas. {pancreasDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; l\'intestin gr&ecirc;le. {smallIntestineDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au gros intestin. {largeIntestineDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment aux muscles abdominaux. {gutsMusclesDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au rein droit. {rightKidneyDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au rein gauche. {leftKidneyDmgSerious}.',
];

gen_data['stomachDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
];
gen_data['liverDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
];
gen_data['pancreasDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
];
gen_data['smallIntestineDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
];
gen_data['largeIntestineDmgLight'] = [
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble',
	'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
];
gen_data['gutsMusclesDmgLight'] = {
	'0-5': 'Une bonne partie des abdo est &eacute;corch&eacute;e / brul&eacute;e, rien de grave, mais qu\'est-ce que &ccedil;a fait mal',
	'6-10': 'Un bon coup dans le ventre, du genre de ceux qui font vomir ... Rien de grave donc, mais c\'est tout sauf agra&eacute;ble'
};
gen_data['rightKidneyDmgLight'] = [
	'Un bon coup dans le dos, suffisament fort pour faire tr&egrave;s mal, voir pour envoyer au sol quelques secondes',
	'Un bon coup dans le dos, suffisament fort pour faire tr&egrave;s mal, voir pour envoyer au sol quelques secondes'
];
gen_data['leftKidneyDmgLight'] = [
	'Un bon coup dans le dos, suffisament fort pour faire tr&egrave;s mal, voir pour envoyer au sol quelques secondes',
	'Un bon coup dans le dos, suffisament fort pour faire tr&egrave;s mal, voir pour envoyer au sol quelques secondes'
];

gen_data['stomachDmgMedium'] = {
	'0-5': 'La paroi de l\'estomac est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['liverDmgMedium'] = {
	'0-5': 'Du sang dans la bouche, et quelques naus&eacute;es, c\'est pas bon signe. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['pancreasDmgMedium'] = {
	'0-5': 'La paroi de l\'estomac est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['smallIntestineDmgMedium'] = {
	'0-5': 'La paroi de l\'intestin gr&ecirc;le est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['largeIntestineDmgMedium'] = {
	'0-5': 'La paroi du gros intestin est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['gutsMusclesDmgMedium'] = {
	'0-5': 'Les muscles sont entam&eacutes; de fa&ccedil;on superficielle &agrave; de nombreux endroits, ce n\'est pas grave, mais c\'est plut&ocirc;t douloureux',
	'6-9': 'Une majeure partie des abdo est &eacute;corch&eacute;e / brul&eacute;e, rien de grave, mais qu\'est-ce que &ccedil;a fait mal'
};
gen_data['rightKidneyDmgMedium'] = {
	'0-5': 'La paroi du rein est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};
gen_data['leftKidneyDmgMedium'] = {
	'0-5': 'La paroi du rein est entam&eacute;e, &agrave; plusieurs endroits. Si le personnage arr&ecirc;te de bouger et se fait soigner, tout ira bien',
	'6-9': 'Le coup &eacute;tait si violent que l\'organe s\'est d&eacute;cal&eacute; de quelques centim&egrave;tres ... Pas sp&eacute;cialement grave, mais plut&ocirc;t douloureux, et tout de m&ecirc;me &agrave; surveiller par la suite'
};

gen_data['stomachDmgSerious'] = [
	'L\'estomac est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e',
	'L\'estomac est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e'
];
gen_data['liverDmgSerious'] = [
	'Le foie est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, c\'est la mort assur&eacute;e',
	'Le foie est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, c\'est la mort assur&eacute;e'
];
gen_data['pancreasDmgSerious'] = [
	'Le pancreas lourdement abim&eacute;, c\'est extr&ecirc;mement douloureux ... Sans intervention m&eacute;dicale rapide, c\'est la mort assur&eacute;e',
	'Le pancreas lourdement abim&eacute;, c\'est extr&ecirc;mement douloureux ... Sans intervention m&eacute;dicale rapide, c\'est la mort assur&eacute;e'
];
gen_data['smallIntestineDmgSerious'] = [
	'L\'intestin gr&ecirc;le est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e',
	'L\'intestin gr&ecirc;le est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e'
];
gen_data['largeIntestineDmgSerious'] = [
	'Le gros intestin est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e',
	'Le gros intestin est perc&eacute;, son contenu se d&eacute;verse dans le corps ... Sans intervention m&eacute;dicale imm&eacute;diate, c\'est la mort assur&eacute;e'
];
gen_data['gutsMusclesDmgSerious'] = {
	'0': 'Les muscles abdominaux sont d&eacute;chir&eacute;s / tranch&eacute;s &agrave; plusieurs endroits, c\'est tr&egrave;s douloureux de bouger',
	'1-5': 'Les muscles sont entam&eacutes; s&eacute;v&egrave;rement &agrave; de nombreux endroits, ce n\'est pas grave, mais c\'est plut&ocirc;t douloureux'
};
gen_data['rightKidneyDmgSerious'] = [
	'Le rein est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, le personnage risque de perdre un rein, voir de mourir',
	'Le rein est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, le personnage risque de perdre un rein, voir de mourir'
];
gen_data['leftKidneyDmgSerious'] = [
	'Le rein est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, le personnage risque de perdre un rein, voir de mourir',
	'Le rein est gravement endommag&eacute; ... Sans intervention m&eacute;dicale rapide, le personnage risque de perdre un rein, voir de mourir'
];

gen_data['rightLeg_lightWound'] = [
	'Touch&eacute; &agrave; la jambe droite, {legPartLight}'
];
gen_data['rightLeg_mediumWound'] = [
	'Touch&eacute; &agrave; la jambe droite, {legPartMedium}'
];
gen_data['rightLeg_seriousWound'] = [
	'Touch&eacute; &agrave; la jambe droite, {legPartSerious}'
];

gen_data['leftLeg_lightWound'] = [
	'Touch&eacute; &agrave; la jambe gauche, {legPartLight}'
];
gen_data['leftLeg_mediumWound'] = [
	'Touch&eacute; &agrave; la jambe gauche, {legPartMedium}'
];
gen_data['leftLeg_seriousWound'] = [
	'Touch&eacute; &agrave; la jambe gauche, {legPartSerious}'
];

gen_data['legPartLight'] = [
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgLight}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgLight}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgLight}.'
];
gen_data['legPartMedium'] = [
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgMedium}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgMedium}.'
];
gen_data['legPartSerious'] = [
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au pied. {footDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment &agrave; la cheville. {ankleDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre la  cheville et le genou. {lowerLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au genou. {kneeDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment entre le genou et le bassin. {upperLegDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau du col du bassin. {hipJointDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgSerious}.',
	'plus pr&eacute;cis&eacute;ment au niveau des fesses. {bottomDmgSerious}.'
];

gen_data['footDmgLight'] = {
	'0-5': 'Le gros orteil est cass&eacute;, ce n\'est pas grave mais c\'est handicapant pour marcher, et douloureux',
	'6-9': 'Un bon bleu sur le pied, c\'est douloureux de marcher mais sans plus'
};
gen_data['ankleDmgLight'] = {
	'0-5': 'Un bon bleu sur la mall&eacuteole, mais sinon &ccedil;a va',
	'6-9': 'Rien de bien grave, une petite foulure, tout ira bien dans quelques jours'
};
gen_data['lowerLegDmgLight'] = {
	'0-5': 'Le muscle du mollet est d&eacute;chir&eacute;, ce n\'est pas grave mais c\'est tr&egrave;s douloureux de marcher pendant quelques jours',
	'6-9': 'Une belle entaille sur le mollet qui laissera probablement une cicatrice, mais rien de grave'
};
gen_data['kneeDmgLight'] = {
	'0-5': 'Un bon bleu sur le c&ocirc;t&eacute; du genou, mais sinon &ccedil;a va',
	'6-9': 'Rien de bien grave, &ccedil;a a tir&eacute; un peu sur les ligaments mais quelques jours de repos et &ccedil;a ira'
};
gen_data['upperLegDmgLight'] = {
	'0-5': 'Un sacr&eacute; bleu sur la cuisse. Ca fait mal mais sans plus',
	'6-9': 'Un coup sur la cuisse qui fait tomber par terre, mais rien de plus'
};
gen_data['hipJointDmgLight'] = [
	'Un beau bleu sur le c&ocirc;t&eacute; du bassin, mais &ccedil;a va',
	'Un beau bleu sur le c&ocirc;t&eacute; du bassin, mais &ccedil;a va'
];
gen_data['bottomDmgLight'] = [
	'Heureusement que c\'&eacute;tait sur les fesses, parce que &ccedil;a fait juste mal, ailleurs ce coup aurait peut-&ecirc;tre cass&eacute; quelque chose',
	'Heureusement que c\'&eacute;tait sur les fesses, parce que &ccedil;a fait juste mal, ailleurs ce coup aurait peut-&ecirc;tre cass&eacute; quelque chose'
];

gen_data['footDmgMedium'] = {
	'0-5': 'La plante du pied est tr&egrave;s endommag&eacute;e, c\'est difficile de marcher mais pas grave si bien soign&eacute;',
	'6-9': 'Et trois orteils de retourn&eacute;s, trois ... Le gros en fait parti, &ccedil;a fait tr&egrave;s mal'
};
gen_data['ankleDmgMedium'] = {
	'0-5': 'La mall&eacute;ole est cass&eacute;e, c\'est tr&egrave;s douloureux, et pas moyen de marcher tant que ce n\'est pas soign&eacute;',
	'6-9': 'Une petite entorse, sans trop de gravit&eacute;, c\'est loin d\'&ecirc;tre une partie de plaisir, mais &ccedil;a se soignera assez vite'
};
gen_data['lowerLegDmgMedium'] = {
	'0-5': 'Une fracture du tibia, mais le p&eacute;ron&eacute; tient bon lui, c\'est assez simple &agrave; soigner, il faudra juste &ecirc;tre patient',
	'6-9': 'Un magnifique h&eacute;matome d\'une dizaine de centim&egrave;tres de diam&egrave;tre sur le tibia, d\'exp&eacute;rience personnel, &ccedil;a fait tr&egrave;s mal'
};
gen_data['kneeDmgMedium'] = {
	'0-5': 'Le m&eacute;nisque est cass&eacute;e, c\'est tr&egrave;s douloureux, et pas moyen de marcher tant que ce n\'est pas soign&eacute;',
	'6-9': 'Une petite entorse, sans trop de gravit&eacute;, c\'est loin d\'&ecirc;tre une partie de plaisir, mais &ccedil;a se soignera assez vite'
};
gen_data['upperLegDmgMedium'] = {
	'0-5': 'Le f&eacute;mur est f&eacute;l&eacute; mais l&eacute;g&egrave;rement seulement, c\'est tr&egrave;s douloureux mais si le personnage cesse de bouger &ccedil;a ne s\'aggravera pas',
	'6-9': 'Une profonde entaille sur la cuisse, de quoi arborer une belle cicatrice quand vous irez vous baigner quoi, si on arr&ecirc;te le saignement ce n\'est pas grave du tout'
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
	'0': 'L\'os du pied est compl&egrave;tement broy&eacute; sous la force du coup, &ccedil;a va &ecirc;tre dur de marcher pendant quelques temps ..',
	'1': 'Le petit orteil s\'est fait arrach&eacute ! C\'est tr&egrave;s douloureux, et plut&ocirc;t moche, mais c\'est absolument pas grave et ne sera pas handicapant dans le futur'
};
gen_data['ankleDmgSerious'] = {
	'0': 'Une belle entorse, &ccedil;a gonfle, c\'est tout bleu ... &ccedil;a fait horriblement mal, et bien sur, impossible de marcher',
	'1': 'La cheville est compl&egrave;tement cass&eacute;e, formant un angle pas tr&egrave;s naturel, si ce n\'est pas correctement soign&eacute; le personnage risque de ne plus jamais marcher correctement'
};
gen_data['lowerLegDmgSerious'] = {
	'0': 'Double fracture : tibia et p&eacute;ron&eacute;. C\'est tr&egrave;s douloureux, et la gu&eacute;rison prendra du temps',
	'1': 'Une superbe double fracture (tibia et p&eacute;ron&eacute;) ouverte. Ca pisse le sang, la douleur suffirait &agrave; faire s\'&eacute;vanouir n\'importe qui, et la gu&eacute;rison sera longue'
};
gen_data['kneeDmgSerious'] = {
	'0': 'Une belle entorse, &ccedil;a gonfle, c\'est tout bleu ... &ccedil;a fait horriblement mal, et bien sur, impossible de marcher',
	'1': 'Le genou est compl&egrave;tement cass&eacute;, formant un angle pas tr&egrave;s naturel, si ce n\'est pas correctement soign&eacute; le personnage risque de ne plus jamais marcher correctement'
};
gen_data['upperLegDmgSerious'] = {
	'0': 'Et hop, un f&eacute;mur cass&eacute;. Niveau douleur, on est loin au dessus du seuil tol&eacute;ble pour un humain, et puis bonne chance pour la convalescence ..',
	'1': 'Oh mince, l\'art&eagrave:re f&eacute;morale a &eacute;t&eacute; sectionn&eacute;e. C\'est trop dommage, sans soins imm&eacutediats, le personnage est mort'
};
gen_data['hipJointDmgSerious'] = [
	'Le bassin est bris&eacute;, litt&eacute;ralement. Bon, la gu&eacute;rison sera longue ... Bon courage ! Ah oui, au fait, le personnage est hors combat, naturellement',
	'Le bassin est bris&eacute;, litt&eacute;ralement. Bon, la gu&eacute;rison sera longue ... Bon courage ! Ah oui, au fait, le personnage est hors combat, naturellement'
];
gen_data['bottomDmgSerious'] = [
	'Quoi de pire qu\'une blessure qui emp&ecirc;che de s\'assoir ? Une blessure qui emp&ecirc;che de s\'assoir et qui oblige votre m&eacute;decin &agrave; contempler votre fondement. Vous l\'aurez compris, c\'est une magnifique entaille sur la fesse, du genre plut&ocirc;t profonde',
	'Quoi de pire qu\'une blessure qui emp&ecirc;che de s\'assoir ? Une blessure qui emp&ecirc;che de s\'assoir et qui oblige votre m&eacute;decin &agrave; contempler votre fondement. Vous l\'aurez compris, c\'est une magnifique entaille sur la fesse, du genre plut&ocirc;t profonde'
];

// /wounds --------------------------------------

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

// /genenral functions --------------------------

// /generators ----------------------------------

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
        if (user === 'RPBot') {
            if ( Math.floor(Math.random() * 2) === 0 ) {
                bot.sendMessage({
                    to: channelID,
                    message: 'Il me vole mon travail !'
                });
            } else {
		bot.sendMessage({
		    to: channelID,
		    message: 'Bordel que j\'aimerai savoir faire ça ... Mais mon dev est nul!'
		});
	    }
        }
		
        // It will listen for messages that will start with `§`
        if (message.substring(0, 1) == '§') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
        
            args = args.splice(1);
            switch(cmd) {
		// §help
		case 'help':
			if (user === 'Platypus Cordula') {
				bot.sendMessage({
					to: channelID,
					message: 'Demande au machin rouesque qui vit avec toi.'
				});
			} else {
				bot.sendMessage({
					to: channelID,
					message: 'T\'as cru que j\'allais t\'aider ? Lol.'
				});
			}
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
                        message: '<:NANIII:364403601533173783>'
                    });
                break;
				case 'head_ligth':
					bot.sendMessage({
                        to: channelID,
                        message: generate_text('head_lightWound').toString();
                    });
				break;
            }
        }
		
        if (message.toLowerCase().includes('omae wa mo shindeiru')) {
            bot.sendMessage({
                to: channelID,
                message: '<:NANIII:364403601533173783>'
            });
        }

	if (message.toLowerCase() === 'hey, le bot ?' 
		|| message.toLowerCase() === 'hey, le bot?') {
		if (user === 'Le Zu' 
			|| user === 'Le Pangolin de la Vérité') {
			bot.sendMessage({
			    to: channelID,
			    message: 'Oui maitre ?'
			});
		} else if (user === 'Platypus Cordula') {
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
		|| message.toLowerCase() === 'attaque !') {
		if (user === 'Le Zu' 
			|| user === 'Le Pangolin de la Vérité'
			|| user === 'Platypus Cordula') {
			bot.sendMessage({
			    to: channelID,
			    message: '*saute sur tout le monde* <:gnap:363685809729044480>'
			});
		} else {
			bot.sendMessage({
			    to: channelID,
			    message: 'T\'as cru que la vie c\'était un kiwi ?'
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

        if (message.toLowerCase().includes('gnap') || message.includes('<:gnap:363685809729044480>')) {
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
		
	if (message.toLowerCase() === 'alors') {
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
