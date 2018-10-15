const TweetData = require('./models/index');



const searchParams = (search) => {
    const { username, tweet, mentions, screen_name, urls  } = search;
    var query = {};
    if (username)
        query['user.name'] = new RegExp(`.*${username}.*`);
    if (tweet)
        query['text'] = new RegExp(`.*${tweet}.*`, 'i');
    if (mentions)
        query['entities.user_mentions.name'] = new RegExp(`.*${mentions}.*`, 'i');
    if (screen_name)
        query['user.screen_name'] = new RegExp(`.*${screen_name}.*`, 'i');
    if (urls)
        query['entities.urls'] = new RegExp(`.*${urls}.*`, 'i');
    return query;
};

const filterParams = (filter) => {
    const { date, quote_count, reply_count, retweet_count, favorite_count, lang } = filter;
    var query = {};
    if (date) {
        const { lte, gte, eq } = date;
        if (eq)
            query.created_at = eq;
        else if (lte && gte)
            query.created_at = { $gte: gte, $lte: lte };
        else if (lte)
            query.created_at = { $lte: lte };
        else if (gte)
            query.created_at = { $gte: gte };
    }

    if (quote_count) {
        const { lte, gte, eq } = quote_count;
        if (eq)
            query.quote_count = eq;
        else if (lte && gte)
            query.quote_count = { $gte: gte, $lte: lte };
        else if (lte)
            query.quote_count = { $lte: lte };
        else if (gte)
            query.quote_count = { $gte: gte };
    }

    if (reply_count) {
        const { lte, gte, eq } = reply_count;
        if (eq)
            query.reply_count = eq;
        else if (lte && gte)
            query.reply_count = { $gte: gte, $lte: lte };
        else if (lte)
            query.reply_count = { $lte: lte };
        else if (gte)
            query.reply_count = { $gte: gte };
    }

    if (retweet_count) {
        const { lte, gte, eq } = retweet_count;
        if (eq)
            query.retweet_count = eq;
        else if (lte && gte)
            query.retweet_count =  { $gte: gte, $lte: lte };
        else if (lte)
            query.retweet_count =  { $lte: lte };
        else if (gte)
            query.retweet_count =  { $gte: gte };
    }

    if (favorite_count) {
        const { lte, gte, eq } = favorite_count;
        if (eq)
            query.favorite_count = eq;
        else if (lte && gte)
            query.favorite_count = { $gte: gte, $lte: lte };
        else if (lte)
            query.favorite_count = { $lte: lte };
        else if (gte)
            query.favorite_count = { $gte: gte };
    }

    if (lang) {
        query.lang = new RegExp(`^${lang}$`, 'i');
    }

    return query;
};

const queryGenerator = (search, filter) => {
    var query = searchParams(search);
    var query2 = filterParams(filter);
    query = { ...query, ...query2 };
    return query;
}


const retrieveData = async (search = {}, filter = {}, sort = { created_at: -1 }, page = 1) => {
    var query = queryGenerator(search, filter);
    var result = await TweetData.paginate(query, { page, limit: 10, sort })
    .then((data) => {
        return { data, success: true };
    }).catch((data) => {
        return { data, success: false };
    });
    return result;
}

module.exports = retrieveData;