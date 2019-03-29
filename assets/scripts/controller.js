//setting up body-parser
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var firebase = require('./fireStoreController');
var appScheduler = require('./appScheduler');
var $  = require("JQuery");
//const ejslint = require('ejs-lint');
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
    
    app.get('/panel', function(req,res){

        firebase.database.collection('Patients').orderBy("time", "desc").get().then(snapshot =>{
            var arr = [];
        
            snapshot.docs.forEach(doc =>{
               arr.push({data: doc.data(), id: doc.id})
    
            })
            res.render('panel', {patientList: arr});
            console.log(arr);
            //res.render('panel');
        });
        
        
    });

    app.post('/staffLogin', urlEncodedParser, function(req,res){
        firebase.database.collection("Users").where('name' , '==' , req.body.name).get().then(snapshot=>{
            
            console.log('name: ' + req.body.name, 'password: ' + req.body.password, 'id: ' + req.body.id);

            snapshot.docs.forEach(doc =>{
                console.log(doc.id + "\n");

               if(doc.data().password === req.body.password && doc.data().id == req.body.id) {
                res.redirect("/panel")
               } 
               else{
                   console.log("Page Was Not Loaded")
               }
            })
        })
    })

    app.post('/post', urlEncodedParser, function (req, res) {       
        var time = appScheduler.schedule();
        mailController(req.body.email, time);
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