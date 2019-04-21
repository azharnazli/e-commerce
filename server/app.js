require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

const port = 3000


//mongoDB
const mongodb = process.env.NODE_ENV || 'dev'
const url  = 'mongodb://localhost/e-commerce_' + mongodb

mongoose.connect(url, {useNewUrlParser: true});


//routes
const indexRouter = require('./routes/');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(port, ()=> {
  console.log(`listening on port : ${port}`)
})

module.exports = app;
