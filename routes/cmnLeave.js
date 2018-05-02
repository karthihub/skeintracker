var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./cmndbConnection');
var responceFile = require('../public/javascripts/responceFile');
// var sendMail = require('../public/javascripts/maillerFunction');


router.post('/empApplyLeave', function(req, res){
    var skeinID = req.body.skein_id;
    var fullname = req.body.fullname;
    var leavetype = req.body.leavetype;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var fromsession = req.body.fromsession;
    var tosession = req.body.tosession;
    var reason = req.body.reason;
    var color = req.body.color;        

    dbConnection.query("INSERT INTO applyleave (skein_id,fullname,leavetype,fromdate,todate,fromsession,tosession,reason,color) values ('"+skeinID+"','"+fullname+"','"+leavetype+"','"+fromdate+"','"+todate+"','"+fromsession+"','"+tosession+"','"+reason+"','"+color+"')", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "User "+skeinID+" Leave applied successfully, Please wait for HR confirmation";
            res.send(responceFile);
          }
        
    });
});

router.post('/empLeaveUpdate', function(req, res){
    var id = req.body.id;
    var skeinID = req.body.skein_id;
    var fullname = req.body.fullname;
    var leavetype = req.body.leavetype;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var fromsession = req.body.fromsession;
    var tosession = req.body.tosession;
    var reason = req.body.reason;
    var color = req.body.color;  

    dbConnection.query("UPDATE applyleave SET skein_id='"+skein_id+"',fullname='"+fullname+"',leavetype='"+leavetype+"',fromdate='"+fromdate+"',todate='"+todate+"',fromsession='"+fromsession+"',tosession='"+tosession+"',reason='"+reason+"',color='"+color+"' where id='"+id+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Your ["+skein_id+"] Leave updated successfully";
            res.send(responceFile);
          }
        
    });
});

router.post('/getEmpLeaveList', function(req, res){
    var query = (!req.body.skein_id)?"SELECT * FROM applyleave WHERE skein_id='"+req.body.skein_id+"' ORDER BY applyleave.id ASC":"SELECT * FROM applyleave";

    dbConnection.query(query, function (err, result, fields) {
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
        
    });
});




module.exports = router;