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
	'Touché à la tête, {headPartLight}'
];
gen_data['head_mediumWound'] = [
	'Touché à la tête, {headPartMedium}'
];
gen_data['head_seriousWound'] = [
	'Touché à la tête, {headPartSerious}'
];

gen_data['headPartLight'] = [
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgLight}.',
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgLight}.',
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
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgMedium}.',
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgMedium}.',
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
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgSerious}.',
	'plus précisément l\'os du cr&acirc;ne en lui même. {craniumDmgSerious}.',
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
	'9-12': 'Perte de connaissance pendant plusieurs minutes. Légère perte de m&eacutes;moire pour quelques jours'
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
	'0-5': 'Les muscles sont entam&eacutes; de façon superficielle à de nombreux endroits, ce n\'est pas grave, mais c\'est plutôt douloureux',
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
	'1-5': 'Les muscles sont entam&eacutes; sévèrement à de nombreux endroits, ce n\'est pas grave, mais c\'est plutôt douloureux'
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
				case 'head_light':
					bot.sendMessage({
                        to: channelID,
                        message: generate_text('head_lightWound').toString()
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
