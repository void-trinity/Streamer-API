const Json2csvParser = require('json2csv').Parser;
const retrieveData = require('../db/retrieveData');

const csvGenerator = async (search = {}, filter = {}, sort = { created_at: -1 }, page = 1) => {
    const result = await retrieveData(search, filter, sort, page, limit = -1);
    if (result.success) {
        const fields = [
            'created_at',
            'id',
            {
                label: 'username',
                value: 'user.name'
            },
            {
                label: 'user screen name',
                value: 'user.screen_name'
            },
            'text',
            'quote_count',
            'reply_count',
            'retweet_count',
            'favorite_count',
            'lang'
        ];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(result.data.docs);
        return { csv, success: true };
    } else {
        return { success: false };
    }
}

module.exports = csvGenerator;