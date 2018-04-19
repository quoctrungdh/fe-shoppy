const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use('/', routes);
app.listen(12346, () => console.log('Example app listening on port 12346!'));
