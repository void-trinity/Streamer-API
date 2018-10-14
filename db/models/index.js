const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoDB connection
mongoose.connect('mongodb://localhost:27017/TweetStream', { useNewUrlParser: true });

//mongo model
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

module.exports = TweetData;