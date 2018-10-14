const express = require('express');
const bodyParser = require('body-parser');
const startStream = require('../stream/startStream');
const stopStream = require('../stream/stopStream');
const retrieveData = require('../db/retrieveData');


const router = express.Router();


//current stream variable
var currentStream;

router.post('/api/startstream', bodyParser.json(), (req, res) => {
    console.log(req.body);
    var keyword = req.body.keyword ? req.body.keyword: 'modi';
    currentStream = startStream(keyword);
    res.status(200).json({
        success: true,
        message: `Stream started for keyword: ${keyword}`
    });
});

router.get('/api/stopstream', bodyParser.json(), (req, res) => {
    var response;
    if(stopStream(currentStream)) {
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

router.post('/api/getstoreddata', bodyParser.json(), async (req, res) => {
    var { search, filter, sort, page } = req.body;
    var { data, success } = await retrieveData(search, filter, sort, page);
    res.status(200).json({ success, data });
})

module.exports = router;