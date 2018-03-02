'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {PORT, DATABASE_URL} = require('./config');
const {Answers} = require('./models/answers.js');
const {Question} = require('./models/questions.js');
const {User} = require('./users/models.js');
const mongoose = require('mongoose');
const app = express();
app.use(express.static('public'));
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const passport = require('passport');


mongoose.Promise = global.Promise;

const {router: userRouter} = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


app.use('/api/users', userRouter);
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});



app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});
app.get("/profile", (request, response) => {
  response.sendFile(__dirname + '/public/profile.html');
});

app.get("/myAnswer", (request, response) => {
  response.sendFile(__dirname + '/public/myAnswer.html');
});

app.get("/login", (request, response) => {
  response.sendFile(__dirname + '/public/login.html');
});
app.get("/register", (request, response) => {
	response.sendFile(__dirname + '/public/register.html');
});

app.get('/answers', jwtAuth, (req, res) => {

	Answers
	.find({
		'author.firstName': req.user.firstName,
		'author.lastName': req.user.lastName
	})
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

app.post('/answers', jsonParser, jwtAuth, (req, res) => {
	const requiredFields = ['content', 'typeOfAnswer', 'id'];
	for (let i=0; i<requiredFields.length; i++) {
	const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	console.log('The logged in user: ', req.user);
	Answers
	.create({
		content: req.body.content,
		author: {firstName: req.user.firstName,lastName:req.user.lastName},
		published_date: Date.now(),
		typeOfAnswer: req.body.typeOfAnswer
	})
	.then(
		answer => {
			Question
					.findById(req.body.id)
					.populate('answers')
					.exec()
			.then(
				question=>{
					question.answers.push(answer);
					question.save()
					.then(question=>res.status(200).json(question))
					.catch(err=>console.log(err))
				}
			)
		})
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
			const message = `Missing \`${field}\` in request body`;
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
  		return res.status(500).send(err);
  			res.status(204).end();
    }	
  ) 
});

app.get('/question', (req, res) => {
	Question
	.find()
	.limit(10)
	.then(
		questions => res.json(questions))
	.catch(err=> {
		res.status(500).json({message: 'internal error'});
	})
});

app.get('/question/:id', (req, res) => {
  Question
    .findById(req.params.id)
		.populate('answers')
    .then(
			question =>res.json(question))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});
		
app.post('/question', jsonParser, (req, res) => {
	const requiredFields = ['text'];
	for (let i=0; i<requiredFields.length; i++) {
	const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	Question
	.create({
		text: req.body.text,
	})
	.then(
		question => res.status(201).json(question))
	.catch(err=> {
		res.status(500).json({message: 'internal error'});
	})
});

app.delete('/question/:id', (req, res) => {
	Question
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({ message: 'succes'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'internal server error'});
		});
});

app.put('/question/:id', jsonParser, (req, res) => {
	const requiredFields = ['text']; 
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
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
	Question.findByIdAndUpdate(req.params.id,
	  {
		id: req.params.id,
		text: req.body.text,
  	},
  	function(err) {
  	if(err)
  		return res.status(500).send(err);
  			res.status(204).end();
    }	
  ) 
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});


let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {}, err => {
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
}
module.exports = {app, runServer, closeServer};
