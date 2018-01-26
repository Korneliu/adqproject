'use strict';
const express = require('express');
const app = express();
app.use(express.static('public'));
const{PORT} = require('./config');


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