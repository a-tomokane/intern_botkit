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

bot.say({
	channel: 'general',
	text: '@channel Hello World!',
	username: 'kirakira-bot'
});