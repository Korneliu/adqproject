const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
        text: {type: String, required: true},
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'answer'
        }
        ]
});


const Question = mongoose.model('question', questionSchema);
module.exports = {Question};