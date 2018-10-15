const TweetData = require('./models/index');


const retrieveData = async (search = {}, filter, sort = { created_at: -1 }, page = 1) => {
    const { user, tweet } = search;
    var query;
    if(user && tweet)
        query = {
            text: new RegExp(`.*${tweet}.*`, 'i'),
            $or: [
                { 'user.name': new RegExp(`^${user}$`, 'i') },
                { 'user.screen_name': new RegExp(`^${user}$`, 'i') }
            ]
        };
    else if (user)
        query = {
            $or: [
                { 'user.name': new RegExp(`^${user}$`, 'i') },
                { 'user.screen_name': new RegExp(`^${user}$`, 'i') }
            ]
        };
    else if (tweet)
        query = { text: new RegExp(`.*${tweet}.*`, 'i') };
    else
        query = {};
    var result = await TweetData.paginate(query, { page, limit: 10, sort })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = retrieveData;