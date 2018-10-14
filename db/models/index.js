const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


mongoose.Promise = global.Promise;
//mongoDB connection
mongoose.connect('mongodb://localhost:27017/TweetStream', { useNewUrlParser: true });

const schema = new mongoose.Schema ({
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
    }
});

schema.plugin(mongoosePaginate);

//mongo model
const TweetData = mongoose.model('TweetData', schema);

module.exports = TweetData;