const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');
const userRoute = require('./routes/consumer');
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
const UrlDB = process.env.My_Url_Db;
mongoose.connect(
  UrlDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use('/api/books', booksRoute);
app.use('/api/auth', userRoute);
module.exports = app;
