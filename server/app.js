require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();


//mongoDB
const mongodb = process.env.NODE_ENV || 'dev'
const url  = 'mongodb://localhost:27017/e-commerce_' + mongodb

mongoose.connect(url, {useNewUrlParser: true});


//routes
const indexRouter = require('./routes/');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

module.exports = app;
