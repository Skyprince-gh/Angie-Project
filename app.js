var express = require('express');
var app = express();
var Controller = require('./assets/scripts/controller.js')



//set view engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('./'));

//access controller script
Controller(app);


app.listen(3310, function(){
    console.clear();
    console.log("setting view engine: view engine - ejs\nsetting static files",'\nyou are now connected to port 3310');
})