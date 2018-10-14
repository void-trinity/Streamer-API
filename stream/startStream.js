const Twit = require('twit');
const storeData = require('../db/storeData');
const config = require('../config');


const T = new Twit(config);


startStream = (keyword = 'apple') => {
    console.log('----------Inside startStream()------------');
    var currentStream = T.stream('statuses/filter', { track: [keyword] });
    currentStream.on('tweet', (tweet) => {
        storeData(tweet);
    });
    return currentStream;
}

module.exports = startStream;