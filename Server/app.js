const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api'); 
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Connecting to DB...');
    connectDB();
});
// Graceful shutdown for SIGINT and SIGTERM
const shutdown = async (signal) => {
    console.log(`${signal} received. Closing server and database connection...`);
    server.close(() => {
        console.log('Server closed.');
    });

    try {
        const mongoose = require('mongoose'); // Assuming you're using Mongoose
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing database connection:', err);
        process.exit(1);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));