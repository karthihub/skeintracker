var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./cmndbConnection');
var sendPush = require('../public/javascripts/pushFunction');
var responceFile = require('../public/javascripts/responceFile');
var sendMail = require('../public/javascripts/maillerFunction');

router.post('/useAuthendication', function(req, res){

      let enteredUserName = req.body.skein_id;
      let enteredPassword = req.body.password;
      responceFile.status = 0;
      responceFile.body = [];
      responceFile.message = '';


          dbConnection.query("SELECT * FROM skeinbook where skein_id='"+enteredUserName+"'", function (err, result, fields) {
            if (err) {
              responceFile.status = 401;
              responceFile.message = "Database Error, Please try again"+ err;
            }
            else if(!result.length){
              responceFile.status = 401;
              responceFile.message = "This user ID "+enteredUserName+" is not Registered";
            }else if(enteredPassword != result[0].password || enteredUserName != result[0].skein_id){
              responceFile.status = 401;
              responceFile.message = "Please enter valid Password";
            }
            else if(result[0].emp_status != 'R'){
              responceFile.status = 401;
              responceFile.message = "Your account is not Activated. Please contact ADMIN department";
            }
            else if(result[0].emp_status != 'HO'){
              responceFile.status = 401;
              responceFile.message = "Your account is Hold. Please contact ADMIN department";
            }
            else if(result[0].emp_status == 'A'){
              responceFile.status = 200;
              responceFile.message = "Login Successfully";
              responceFile.body = result;
            }
            res.send(responceFile);
          });

        // sendPush('f9uyUywc8qw:APA91bE0xDA6M13pfYWwreU9WPiTWDl3uzRU0n2sJxbSBZ1PeRe2pKfu56DsegHQGoPmEWPWM8vcH3pAFW_c-DKrPSYGBgeR4gkdeJkWi2tY-Iujlkmx_cowO1D7zqYATZYu1RyXgGZL');

});

router.post('/generateOtp', function(req, res){

  let otpGenerate = Math.floor(100000 + Math.random() * 900000);
  let enteredUserName = req.body.skein_id;
  let enteredEmail = req.body.email;

    dbConnection.query("SELECT * FROM skeinbook where skein_id='"+enteredUserName+"' && email='"+enteredEmail+"' ", function (err, result, fields) {
              
      if (err) {
        responceFile.status = 401;
        responceFile.message = "Database Error, Please try again";
        res.send(responceFile);
      }
      else if(!result.length){
        responceFile.status = 401;
        responceFile.message = "The entered Skein ID or E-mail is not Registered";
        res.send(responceFile);
      }
      else if (result){

        let tomail   = enteredEmail;
        let subject  = "Change Password";
        let fullname = result[0].fullname;
        let html= "<html>"
                +"<body>"
                +"<p>Dear "+fullname+",</p>"
                +"<p> Your OTP to reset the password is <b>"+otpGenerate+"</b></p>"
                +"<p></p>"
                +"<p>Regards,</p>"
                +"<p>The Team,</p>"
                +"<p><b>Skein Tracker</b></p>"
                +"</body>"
                +"</html>"

        dbConnection.query("UPDATE skeinbook SET otp='"+otpGenerate+"' where skein_id='"+enteredUserName+"'", function (err, result, fields) {
          if (err) {
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
          }
          else {
            sendMail(tomail, subject, fullname, html);
            responceFile.status = 200;
            responceFile.message = "Six-digit OTP has sent to entered E-mail ID";
            res.send(responceFile);
          }
        });
      }
      
    });
 
});


router.post('/useForgotPass', function(req, res){
  
  let enteredUserName = req.body.skein_id;
  let enteredOTP = req.body.otp;
  let enteredPassword = req.body.password;

    dbConnection.query("SELECT * FROM skeinbook where otp='"+enteredOTP+"'", function (err, result, fields) {
      if (err) {
        responceFile.status = 401;
        responceFile.message = "Database Error, Please try again";
        res.send(responceFile);
      }
      else if(!result.length){
        responceFile.status = 401;
        responceFile.message = "Please enter Valid OTP";
        res.send(responceFile);
      }
      else{
        dbConnection.query("UPDATE skeinbook SET password='"+enteredPassword+"' where skein_id='"+enteredUserName+"' && otp='"+enteredOTP+"' " , function (err, result, fields) {
          if (err) {
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
          }else{
            responceFile.status = 200;
            responceFile.message = "Password has successfully updated, Please login";
            res.send(responceFile);
          }
        });
      }
      
    });
 
});

module.exports = router;