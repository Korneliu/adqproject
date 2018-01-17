'use strict';
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
const{PORT} = require('./config');
console.log(`App is litening on port ${process.env.Port}`);

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/profile", (request, response) => {
  response.sendFile(__dirname + '/public/profile.html');
});













module.exports = app;