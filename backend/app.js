const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const commentRoutes = require('./routes/commentRoutes');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/comments', commentRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error', err));

module.exports = app;
