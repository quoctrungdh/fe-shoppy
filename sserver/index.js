const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use('/', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
