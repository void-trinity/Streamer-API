const express = require('express');
const routes = require('./routes/api');

const port = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
  }
);


app.use(routes);


app.listen(port, () => {
    console.log(`App started on port ${port}`);
});