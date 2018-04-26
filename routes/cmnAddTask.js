var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./cmndbConnection');
var responceFile = require('../public/javascripts/responceFile');
// var sendMail = require('../public/javascripts/maillerFunction');


router.post('/empTaskAdd', function(req, res){
    var skeinID = req.body.skein_id;
    var projectname = req.body.projectname;
    var taskname = req.body.taskname;
    var timetaken = req.body.timetaken;
    var status = req.body.status;
    var date = req.body.date;
    var description = req.body.description;

    dbConnection.query("INSERT INTO addtask (skein_id,projectname,taskname,timetaken,status,date,description) values ('"+skeinID+"','"+projectname+"','"+taskname+"','"+timetaken+"','"+status+"','"+date+"','"+description+"')", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "User "+skeinID+" task added successfully";
            res.send(responceFile);
          }
        
    });
});

router.post('/empTaskUpdate', function(req, res){
    var task_id = req.body.task_id;
    var projectname = req.body.projectname;
    var taskname = req.body.taskname;
    var timetaken = req.body.timetaken;
    var status = req.body.status;
    var date = req.body.date;
    var description = req.body.description;

    dbConnection.query("UPDATE addtask SET projectname='"+projectname+"',taskname='"+taskname+"',timetaken='"+timetaken+"',status='"+status+"',date='"+date+"',description='"+description+"' where task_id='"+task_id+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Task updated successfully";
            res.send(responceFile);
          }
        
    });
});

router.post('/getEmpTaskList', function(req, res){
    var query = (req.body.skein_id)?"SELECT * FROM addtask WHERE skein_id='"+req.body.skein_id+"' ORDER BY addtask.date DESC":"SELECT * FROM addtask";

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