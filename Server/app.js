const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api'); 
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db')
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use('/api', apiRoutes)

app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status.json({error : 'Something went wrong'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    console.log('Connecting to DB...')
    connectDB();
});