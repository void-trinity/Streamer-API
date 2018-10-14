const TweetData = require('./models/index');


const retrieveData = async (search, filter, sort, page) => {
    var result = await TweetData.paginate({}, { page: 2, limit: 10, sort: { created_at: -1 } })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = retrieveData;