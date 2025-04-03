const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api'); 
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use('/api', apiRoutes)

app.use((err))