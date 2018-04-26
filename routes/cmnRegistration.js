var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./cmndbConnection');
var responceFile = require('../public/javascripts/responceFile');
var sendMail = require('../public/javascripts/maillerFunction');
var sendPush = require('../public/javascripts/pushFunction');


router.post('/empRegistration', function(req, res){
    var skeinID = req.body.skein_id;
    var isManager = req.body.ismanager;
    var fullName = req.body.fullname;
    var emailID = req.body.email;
    var mobileNo = req.body.mobile;
    var password = req.body.password;
    var empOptions = req.body.empOptions;
    var fcmTocken = req.body.fcmTocken;
    var devicePlatform = req.body.devicePlatform;
    var deviceUUID = req.body.deviceUUID;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("select * from skeinbook where skein_id ='"+skeinID+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(!result.length){
            dbConnection.query("INSERT INTO skeinbook (skein_id,ismanager,fullname,email,mobile,password,emp_status,emp_option,assignedBy,platform,device_id,fcm_tocken) values('"+skeinID+"',"+isManager+",'"+fullName+"','"+emailID+"',"+mobileNo+",'"+password+"',"+"'R',"+empOptions+",'','"+devicePlatform+"','"+deviceUUID+"','"+fcmTocken+"')", function (err, result, fields) {
            responceFile.status = 200;
            responceFile.message = "This User "+skeinID+" has successfully registered and please wait for HR confirmation";
            sendMail('skeintechtest@gmail.com', 'New Registration', fullName, skeinID);
            sendPush(fcmTocken);
            res.send(responceFile);
            });
          }
        else if(result.length > 0){
            responceFile.status = 400;
            responceFile.message = "This User "+skeinID+" has already registered in this portal";
            res.send(responceFile);
        }else{}
        
    });
});

router.post('/empDetailsUpdate', function(req, res){
    console.log();
    var id = req.body.id;
    var skeinID = req.body.skein_id;
    // var isManager = req.body.ismanager;
    var fullName = req.body.fullname;
    var emailID = req.body.email;
    var mobileNo = req.body.mobile;
    // var password = req.body.password;
    var empOptions = req.body.empOptions;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("UPDATE skeinbook SET fullname='"+fullName+"',email='"+emailID+"',mobile='"+mobileNo+"',emp_option="+empOptions+" where id='"+id+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Your ["+skeinID+"] profile has updated successfully";
            res.send(responceFile);

          }
        
    });
});

router.post('/getEmpDetails', function(req, res){
    // var skeinID = req.body.skein_id;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("SELECT skein_id,fullname FROM skeinbook ORDER BY skeinbook.fullname ASC", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else{
            // dbConnection.query("INSERT INTO skeinbook (skein_id,ismanager,fullname,email,mobile,password,emp_status,emp_option,assignedBy) values('"+skeinID+"',"+isManager+",'"+fullName+"','"+emailID+"',"+mobileNo+",'"+password+"',"+"'R',"+empOptions+",'')", function (err, result, fields) {
            responceFile.status = 200;
            responceFile.message = "";
            res.send(responceFile);
            // });
          }
        
    });
});

router.post('/getEmpDetailsALL', function(req, res){
    var skeinID = req.body.skein_id;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    var query = (req.body.skein_id)?"SELECT * FROM skeinbook WHERE skein_id='"+req.body.skein_id+"'":"SELECT * FROM skeinbook";

    dbConnection.query(query, function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            // dbConnection.query("INSERT INTO skeinbook (skein_id,ismanager,fullname,email,mobile,password,emp_status,emp_option,assignedBy) values('"+skeinID+"',"+isManager+",'"+fullName+"','"+emailID+"',"+mobileNo+",'"+password+"',"+"'R',"+empOptions+",'')", function (err, result, fields) {
            responceFile.status = 200;
            responceFile.message = "";
            responceFile.body = result;
            res.send(responceFile);
            // });
          }
        
    });
});

router.post('/updateEmpAvatar', function(req, res){
    var skeinID = req.body.skein_id;
    var photos = req.body.photos;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("UPDATE skeinbook SET photos='"+photos+"' where skein_id='"+skeinID+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Your [<b>"+skeinID+"</b>] profile picture has updated successfully";
            res.send(responceFile);
          }
        
    });
});

router.post('/getEmpAvatar', function(req, res){

    dbConnection.connect(function(err) {
    var skeinID = req.body.skein_id;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("Select photos from skeinbook where skein_id='"+skeinID+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "";
            responceFile.body = result;
            res.send(responceFile);
          }
        
    });});
});

router.post('/updateEmpStatus', function(req, res){
    var skeinID = req.body.skein_id;
    var emp_status = req.body.emp_status;
    responceFile.status = 0;
    responceFile.body = [];
    responceFile.message = '';

    dbConnection.query("UPDATE skeinbook SET emp_status='"+emp_status+"' where skein_id='"+skeinID+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Your [<b>"+skeinID+"</b>] profile picture has updated successfully";
            res.send(responceFile);
          }
        
    });
});


router.post('/add', function(req, res){
    var newItem = req.body.newItem;
    console.log(newItem);
  });

module.exports = router;