const TweetData = require('./models/index');


const retrieveData = async (search, filter, sort, page) => {
    var result = await TweetData.find().sort({ date: 'asc' })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = retrieveData;