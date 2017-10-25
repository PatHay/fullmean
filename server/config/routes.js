var appointments = require('../controllers/appointments.js');
// var questions = require('../controllers/questions.js');

const path = require('path');

module.exports = function (app) {

    //QUESTIONS MODEL ROUTES

    app.get('/appointments', (req,res,next)=>{
        console.log("get route working");
        appointments.index(req, res);
    })

    app.post('/appointments', (req, res, next)=>{
        console.log("create route working and posted to db");
        console.log(req.body);
        appointments.new(req, res);
    });


    app.delete('/appointments/:id', (req, res, next)=> {
        console.log("delete route working");
        console.log(req.params.id);
        appointments.remove(req, res);
    });

    // app.put('/questions/:id', (req, res, next)=> {
    //     console.log("update route working");
    //     console.log(req);
    //     questions.update(req, res);
    // });


    // BELOW ARE THE ANSWER MODELS ROUTES 

    // app.post('/question/:id/new_answer', (req, res, next)=>{
    //     console.log("Answer route working");
    //     // console.log(req);
    //     answers.new(req, res);
    // });

    // app.get('/question/:id', (req, res, next)=>{
    //     console.log("Answer Get Route");
    //     // console.log(req);
    //     answers.showAll(req, res);
    // });

    // app.put('/question/:id', (req, res, next)=>{
    //     console.log("Answer Put Route");
    //     answers.update(req, res);
    // });

    app.get('*', function(req, res){
        res.sendFile('index.html', { root: './../public/dist' });
    });
};