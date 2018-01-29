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
app.get("/profile", (request, response) => {
  response.sendFile(__dirname + '/public/profile.html');
});

app.get("/question", (request, response) => {
  response.sendFile(__dirname + '/public/question.html');
});
app.get("/login", (request, response) => {
  response.sendFile(__dirname + '/public/login.html');
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

app.get('/answers/:id', (req, res) => {
  Answers
    .findById(req.params.id)
    .then(answer =>res.json(answer.serialize()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

app.post('/answers', jsonParser, (req, res) => {
	const requiredFields = ['text','author', 'content', 'firstName','lastName','published_date'];
	for (let i=0; i<requiredFields.length; i++) {
	const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Answers
	.create({
		text: req.body.text,
		content: req.body.content,
		author: {firstName:req.body.firstName,lastName:req.body.lastName},
		published_date: req.body.published_date
	})
	.then(
		Answers => res.status(201).json(Answers.serialize()))
	.catch(err=> {
		res.status(500).json({message: 'internal error'});
	});
});

app.delete('/answers/:id', (req, res) => {
	Answers
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({ message: 'succes'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'internal server error'});
		});
});

app.put('/answers/:id', jsonParser, (req, res) => {
	const requiredFields = ['text','author', 'content', 'firstName','lastName','published_date']; 
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body.id) {
		const message = `Request path id \`${req.params.id}\` and request 
		body id \`${req.body.id}\` must match `;
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating answer \`${req.params.id}\``);
	Answers.findByIdAndUpdate(req.params.id,
	  {
		id: req.params.id,
		text: req.body.text,
		author: {firstName:req.body.firstName,lastName:req.body.lastName},
		content: req.body.content,
		published_date: req.body.published_date
  	},
  	function(err) {
  	if(err)
  		return res.status(500).send(err)
  			res.status(204).end();
    }	
  ) 
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