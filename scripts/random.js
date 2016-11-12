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

//ランダム返信

controller.hears('(.*)', ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    var words = [
    'こんにちは',
    'こんばんは',
    'おはよう',
    '元気？',
    'お腹が空いたよ！',
    'そろそろ眠たくなってきたよ...',
    '私とのおしゃべりはどうかしら？'
    ];

    var word = words[Math.floor(Math.random() * words.length)];
    bot.reply(message, word);
});