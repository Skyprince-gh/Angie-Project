//setting up body-parser
var bodyParser = require('body-parser');
var restart = require('restart');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var firebase = require('./fireStoreController');
var appScheduler = require('./appScheduler');

//requiring mail controller
var mailController = require('./mailController');



//controller functions
var controller = function (app) {
    
    app.get('/', function (req, res) {
        res.render('home');
    });
    app.get('/staffLogin', function (req, res) {
        res.render('staffLogin');
    });
    
    app.get('/Panel', function(req,res){
        res.render('panel');
    })
    app.post('/post', urlEncodedParser, function (req, res) {       
        var time = appScheduler.schedule();
        console.log('The Calculated time is: '+ time);
        firebase.database.collection('Patients').add({
            name: req.body.name,
            id: req.body.id,
            email: req.body.email,
            time: time,
            symptoms: req.body.symptoms,
            gender: req.body.gender,

        })
        res.render('success', { name: req.body.name, email: req.body.email });          
        });
    }

module.exports = controller;