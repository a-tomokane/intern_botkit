if (!process.env.token) {
    conosole.log('トークンが設定されていません');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');
var request = require('request');

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

//雑談APIキー設定（基本はソース内に書かない）
var api_key = process.env.DOCOMO_API_KEY;

var context = '';
var mode = 'dialog';
var place = '横浜';

controller.hears('', ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    var api_url = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=' + api_key;
    var options = {
        url: api_url,
        json: {
            utt: message.text,
            place: place,
            context: context,
            mode: mode
        }
    }

    //リクエスト
    request.post(options, function(error, response, body) {
        context = body.context;
        mode = body.mode;

        bot.reply(message, body.utt);
    })
});