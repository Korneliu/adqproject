/*const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	nickname: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
});
userSchema.methods.serialize = function() {
  return {
    nickname: this.nickname || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('user', userSchema);
module.exports = {User};
