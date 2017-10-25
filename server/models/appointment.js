var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    complaint: { type: String, required: true },
    // answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}], //ref must be set to string inside model
   })

var question = mongoose.model('Appointment', AppointmentSchema);
// module.exports = question;