if(!process.env.token) {
	console.log('トークンが設定されていません');
	process.exit(1);
}

var Botkit = require('../lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
	debug: true
});

var bot = controller.spawn({
	token: process.env.token
}).startRTM();


//サンプルプログラム
controller.hears('おはよう', ['direct_message', 'direct_mention', 'mention'], function(bot,message) {
	bot.reply(message, 'おはようございます！今日も1日頑張りましょう。');
});

controller.hears('こんにちは', 'ambient', function(bot,message) {
	bot.reply(message, 'こんにちは！そろそろお腹が空きませんか？');
});

controller.hears('こんばんは', ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot,message) {
	bot.reply(message, 'こんばんは、もうすぐ寝る時間ですね。');
});