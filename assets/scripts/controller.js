//setting up body-parser
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var firebase = require('./fireStoreController');
var appScheduler = require('./appScheduler');
var $ = require("JQuery");
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

    app.get('/panel', function (req, res) {

        firebase.database.collection('Patients').orderBy("time", "desc").get().then(snapshot => {
            var arr = [];

            snapshot.docs.forEach(doc => {
                arr.push({ data: doc.data(), id: doc.id })

            })
            res.render('panel', { patientList: arr });
            //console.log(arr);
            //res.render('panel');
            //USE AJAX REQUESTS INSTEAD
        });


    });

    //checks the completed and cancelled document to update the UI on the front-end.
    app.get('/completed-and-cancelled', function (req, res) {
        var document = "kjUmJi1rklR072iARSGe";
        firebase.database.collection('completed-and-cancelled').doc(document).get().then(doc => {
            var activityDoc;
            activityDoc = doc.data(); //assign to variable.
            console.log(activityDoc); //log
            res.send(activityDoc); //send to front-end
        })
    })


    app.post('/checkAppointmentStatus', urlEncodedParser, function (req, res) {
        console.log('appointment status: ', req.body.id);
        console.log('appointment status: ', req.body.status);
        var document = "kjUmJi1rklR072iARSGe";

        //if the appointment is confirmed
        if (req.body.status === "Check In") {
            firebase.database.collection('completed-and-cancelled').doc(document).get().then(doc => {
                console.log(doc.data())
                var cancelled; //store number of cancelled appointments
                var confirmed; //store number of confirmed appointments

                cancelled = doc.data().cancelled;
                confirmed = doc.data().complete;

                //log to console.
                console.log('cancelled: ', cancelled);
                console.log('confirmed: ', confirmed);

                confirmed += 1;

                console.log('confirmed: ', confirmed); //log

                firebase.database.collection('completed-and-cancelled').doc(document).update({
                    complete: confirmed
                })

            });


            firebase.database.collection('Patients').doc(req.body.id).update({
                checked: true
            })
            
            res.send('checked');

            firebase.database.collection('Patients').doc(req.body.id).delete()
        }

        //if the user cancels the appointment
        else if (req.body.status === "Cancel") {
            var document = "kjUmJi1rklR072iARSGe";

            firebase.database.collection('completed-and-cancelled').doc(document).get().then(doc => {
                console.log(doc.data())
                var cancelled; //store number of cancelled appointments
                var confirmed; //store number of confirmed appointments

                cancelled = doc.data().cancelled;
                confirmed = doc.data().complete;

                //log to console.
                console.log('cancelled: ', cancelled);
                console.log('confirmed: ', confirmed);

                cancelled += 1;

                console.log('confirmed: ', cancelled); //log

                firebase.database.collection('completed-and-cancelled').doc(document).update({
                    cancelled: cancelled
                })

                firebase.database.collection('Patients').doc(req.body.id).update({
                    cancelled: true
                })
                res.send('cancelled');

                firebase.database.collection('Patients').doc(req.body.id).delete()

            })
        }


    })

    app.post('/staffLogin', urlEncodedParser, function (req, res) {
        firebase.database.collection("Users").where('name', '==', req.body.name).get().then(snapshot => {

            //console.log('name: ' + req.body.name, 'password: ' + req.body.password, 'id: ' + req.body.id);

            snapshot.docs.forEach(doc => {
                //console.log(doc.id + "\n");

                if (doc.data().password === req.body.password && doc.data().id == req.body.id) {
                    res.redirect("/panel")
                }
                else {
                    //console.log("Page Was Not Loaded")
                }
            })
        })
    })

    app.post('/post', urlEncodedParser, function (req, res) {
        var time = appScheduler.schedule();
        mailController(req.body.email, time);
        //console.log('The Calculated time is: '+ time);
        firebase.database.collection('Patients').add({
            name: req.body.name,
            id: req.body.id,
            email: req.body.email,
            time: time,
            symptoms: req.body.symptoms,
            gender: req.body.gender,
            checked: false,
            cancelled: false,

        })


        res.render('success', { name: req.body.name, email: req.body.email });
    });
}

module.exports = controller;