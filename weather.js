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

var api_url = "http://weather.livedoor.com/forecast/webservice/json/v1";
var city_id = "140010"; //横浜

controller.hears('天気',['direct_mention', 'direct_message', 'mention'], function (bot, message) {
    var url = api_url + "?city=" + city_id;
    var reply_mss = "天気予報の取得に失敗しました。";

    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var json = JSON.parse(body);
            var telop = json['forecasts'][0]['telop'];
            var reply_mss = "今日の横浜の天気は" + telop + "です。";
        }
        bot.reply(message, reply_mss);
    });
    
});
