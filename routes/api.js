const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const Twit = require('twit');



var T = new Twit(config);



var currentStream;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TweetStream', { useNewUrlParser: true });


var TweetData = mongoose.model('TweetData', {
    created_at: {
        type: Date,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    quote_count: {
        type: Number
    },
    reply_count: {
        type: Number
    },
    retweet_count: {
        type: Number
    },
    favorite_count: {
        type: Number
    },
});

startStream = (keyword = 'apple') => {
    console.log('----------Inside startStream()------------');
    currentStream = T.stream('statuses/filter', { track: [keyword] });
    currentStream.on('tweet', (tweet) => {
        //console.log(JSON.stringify(tweet));
        var { created_at, id, text, user, quote_count, reply_count, retweet_count,favorite_count } = tweet;
        var data = new TweetData({
            created_at,
            id,
            text,
            user,
            quote_count,
            reply_count,
            retweet_count,
            favorite_count
        });
        //console.log(JSON.stringify(data));
        data.save().then(() => console.log('saved data')).catch((error) => console.log('Error: ', error));
    });
}

stopStream = () => {
    console.log('------------Inside stopStream()-----------');
    if(currentStream ) {
        currentStream.stop();
        currentStream.on('reconnect', () => {
            currentStream.stop();
        });
        return true;
    } else {
        return false;
    }
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
    var response;
    if(stopStream()) {
        response = {
            success: true,
            message: 'Stream Stopped'
        }
    } else {
        response = {
            success: false,
            message: 'No stream found'
        }
    }
    res.status(200).json(response);
});

module.exports = router;