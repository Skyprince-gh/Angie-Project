var date = require('date-and-time');
var firebase = require('./fireStoreController');
var now = new Date();
var startTime = new Date();
var endTime = new Date();
startTime.setHours(9,0,0,0);
endTime.setHours(17,55,0,0);
var twelveAM = new Date();
var eight59AM = new Date
twelveAM.setHours(0,0,0,0);
eight59AM.setHours(8,59,59,0);


var schedule = function (req, data) {
var getStartTime = startTime.getTime();
var getEndTime = endTime.getTime();
var hello = true;
var time;

if( hello/*now.getTime() > getStartTime && now.getTime() < getEndTime*/ )
{
 var random = Math.random() * (getEndTime - getStartTime) + getStartTime
 var apptTime1 =  new Date(Math.round(random));
 var apptTime2 = date.addDays(apptTime1, 1);
 var time = date.addMinutes(apptTime2, 3);
} 
else if(now.getTime() > eight59AM.getTime() && now.getTime() < twelveAM.getTime()){
 var apptTime1 = date.addDays(now,1);
 var random = Math.random() * ( getEndTime - getStartTime ) + getStartTime;
 time = new Date(random);
}
else{
  var random = Math.random() * ( getEndTime - getStartTime ) + getStartTime;
  time = new Date(random);
}

 return time;
}


module.exports =
{
  schedule: schedule
}