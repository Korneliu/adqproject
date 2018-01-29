const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: {type: String, required: true},
    answers: [{
        author: {
            firstName: String,
            lastName: String
        },
    content: {type: String, required: true},
    published_date: {type: String, required: true},
    typeOfAnswer: {type: String, required: true}
    }]
});

blogSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
  });
  
answerSchema.methods.serialize = function() {
    return {
        id: this._id,
        text: this.answers,
        author: this.authorName,
        content: this.content,
        published_date: this.published_date,
        typeOfAnswer: this.typeOfAnswer
    };
};

const Answers = mongoose.model('Answers', answerSchema);
module.exports = {Answers};