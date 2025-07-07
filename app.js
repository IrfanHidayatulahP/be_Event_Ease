// app.js
require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/eo/dashboardRoutes');
const eventRoutes = require('./routes/eo/eventRoutes');
const profileRoutes = require('./routes/eo/profileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    const start = Date.now();
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body));
    }

    res.on('finish', () => {
        console.log(`Response: ${res.statusCode} (${req.method} ${req.originalUrl} (${Date.now() - start}ms))`);
    });
    next();
});

// Routes
app.use('/api', authRoutes, eventRoutes, profileRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API EventEase is running',
    })
});

// Sinkronisasi DB & start server
db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });