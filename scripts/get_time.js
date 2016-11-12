if(!process.env.token) {
	console.log('トークンが設定されていません');
	process.exit(1);
}

var Botkit = require('../lib/Botkit.js');
var controller = Botkit.slackbot({
	debug: true
});

var bot = controller.spawn({
	token: process.env.token
}).startRTM();


//サンプルプログラム
controller.hears('何時', ['direct_message', 'direct_mention', 'mention'], function(bot,message) {
	var datetime = new Date();
	var hour = datetime.getHours();
	var minute = datetime.getMinutes();
	var second = datetime.getSeconds();

	var time = '現在の時刻は' + hour + '時' + minute + '分' + second + '秒' + 'です。';
	bot.reply(message, time);
});

