if(!process.env.token) {
    console.log('トークンが設定されていません');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');
var CronJob = require('cron').CronJob;
var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM(function(err, bot, playload) {
    if (err) {
        throw new Err('Could not connect to Slack.');
    }

    new CronJob({
        cronTime: '* * * * *',
        onTick: function() {
            bot.say({
                channel: 'general',
                text: '@hear: 頑張ってますか？',
                username: 'kirakira-bot',
                icon_url: 'https://avatars.slack-edge.com/2016-09-17/80800077655_e9776f26db60dd61c7f5_48.png'
            }, function(err) {
                if (err) {
                    console.log('エラーが発生しました');
                }
            });
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
});