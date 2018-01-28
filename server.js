'use strict';
const cors = require('cors');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {PORT, DATABASE_URL} = require('./config');
const {Answers} = require('./models');
const mongoose = require('mongoose');
const app = express();
app.use(express.static('public'));
const jsonParser = bodyParser.json();
mongoose.Promise = gLobal.Promise;


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/profile", (request, response) => {
  response.sendFile(__dirname + '/public/profile.html');
});

app.get("/question", (request, response) => {
  response.sendFile(__dirname + '/public/question.html');
});
app.get("/login", (request, response) => {
  response.sendFile(__dirname + '/public/login.html');
});


app.listen(PORT,()=>{console.log(`App is listening on port ${PORT}`);
});
module.exports = app;