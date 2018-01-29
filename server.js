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
//mongoose.Promise = gLobal.Promise;


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/answers', (req, res) => {
	Answers
	.find()
	.limit(20)
	.then(answers => {
		res.json(answers.map(answer => answer.serialize()));
	})
	.catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
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


let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
module.exports = {app, runServer, closeServer};