const TweetData = require('./models/index');


storeData = (tweet) => {
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
    data.save().then(() => true).catch((error) => console.log('Error: ', error));
}

module.exports = storeData;