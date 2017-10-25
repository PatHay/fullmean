var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
    user: { type: String, required: true },
    answer: { type: String, required: true },
    desc: {type: String },
    like: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    _question: { type: Schema.Types.ObjectId, ref: 'Question' }, //ref must be set to string inside model
   })

var answer = mongoose.model('Answer', AnswerSchema);
// module.exports = answer;