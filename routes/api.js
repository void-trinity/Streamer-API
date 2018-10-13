const express = require('express');
const config = require('./config');

const bodyParser = require('body-parser');

const router = express.Router();

const Twit = require('twit');
var T = new Twit(config);

var currentStream = {};

startStream = (keyword = 'apple') => {
    console.log('----------Inside startStream()------------');
    currentStream = T.stream('statuses/filter', { track: [keyword] });
    currentStream.on('tweet', (tweet) => {
        console.log(JSON.stringify(tweet));
    });
}

stopStream = () => {
    console.log('------------Inside stopStream()-----------');
    currentStream.stop();
    currentStream.on('reconnect', () => {
        currentStream.stop();
    });
}

router.post('/api/startstream', bodyParser.json(), (req, res) => {
    console.log(req.body);
    var keyword = req.body.keyword ? req.body.keyword: 'modi';
    startStream(keyword);
    res.status(200).json({
        success: true,
        message: `Stream started for keyword: ${keyword}`
    });
});

router.get('/api/stopstream', bodyParser.json(), (req, res) => {
    stopStream();
    res.status(200).json({
        success: true,
        message: `Stream Stopped`
    });
});

module.exports = router;