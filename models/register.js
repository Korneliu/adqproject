const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
	nickname: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},

  });


const Register = mongoose.model('register', registerSchema);
module.exports = {Register};
