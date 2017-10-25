var mongoose = require('mongoose');


var Appointment = mongoose.model('Appointment');
// var Answer = mongoose.model('Answer');
var path = require('path');

module.exports = {
    index: function(req, res){
        Appointment.find({}, function(err, appointments){
            if (err){
                console.log(`This is the error: ${err}`);
            }
            else{
                res.json({'appointments': appointments});
            }
        })
    },
    new: function(req, res){
        var appointment = new Appointment({
            user: req.body.user, 
            date: req.body.date, 
            time: req.body.time, 
            complaint: req.body.complaint
        });
        appointment.save(function (err) {
            if (err) {
                console.log('something went wrong in add appointment');
                let errors = [];
                for (var key in err.errors){
                    errors.push(err.errors[key].message);
                }
                res.json({message: "Error", error: errors});
            } else {
                res.json({message:  "Success!", appointment: appointment});
            }
        });
    },

    remove: function(req, res){
        Appointment.remove({_id: req.params.id}, function(err){
            // console.log(req.route)
            if(err){
                console.log("Did not delete record!");
                console.log(req.params.id);
            } else {
                console.log("Successfully deleted record!");
                res.json({message:  "Success!"});
            }
        })
    },

    // update: function(req, res){
    //     Question.update({_id: req.params.id},
    //          {text: req.body, created_at: Date.now()},
    //         function(err){
    //         if(err){
    //             console.log("Did not edit record");
    //             console.log(err);
    //             console.log(req.body);
    //         } else {

    //             console.log("Successfully edited record!");
    //             res.json({message: "Successful edit!"});
    //         }
    //     })
    // }
}