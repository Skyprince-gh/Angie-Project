const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2'); 


const mailController = function(email, time){
    console.log("\nemail: " + email, '\ntime: ' + time);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        type: 'OAuth2',
        user: 'akwaahenkan@gmail.com',
        clientId: '21758738074-hib2ou681mc36i5sqslb9rh75bbvle9d.apps.googleusercontent.com',
        clientSecret: '8vflA7n5axaRooXTmGb2GsJJ',
        refreshToken: '1/E4XvsMAkd0g6aJIDGrEYkgQ19p6kq0p2u0l7cn8DmjX_LhXBcmn_K7ozdTapJJe7',
        accessToken: 'ya29.GlvZBpFZtBVuBY_mgi3jGGklm294HpnTDPh251fv592ej6T7pbyX7lf1iOATDsy7KG6AK7q2RBuwatCs2S5_O_qmrlNJsr-GvMk3D3TK40mt4QLD3hbgMxDz27WH',
    }
});


  
  // setup email data with unicode symbols
  let mailOptions = {
      from: 'akwaahenkan@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Appointment Time", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Please Note the your appointment is schcheduled for ${time}</p>
      <p> Be there 10 minutes ealier, so we can validate and check you in easily` // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info){
        if(err){
            console.log("Error email not sent\n\n", err);
        }else{
            console.log('Email sent');
        }
    });

 
}
  
  
module.exports = mailController;
  
  