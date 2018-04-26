var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConnection = require('./cmndbConnection');
var responceFile = require('../public/javascripts/responceFile');
// var sendMail = require('../public/javascripts/maillerFunction');


router.post('/addProject', function(req, res){
    var skein_id = req.body.skein_id;
    var assigned_by = req.body.assigned_by;
    var project_name = req.body.project_name;
    var project_logo = req.body.project_logo;
    responceFile.body = [];
    dbConnection.query("INSERT INTO projects (skein_id, assigned_by, project_name, project_logo) values ('"+skein_id+"','"+assigned_by+"','"+project_name+"','"+project_logo+"')", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "User "+skein_id+" task added successfully";
            res.send(responceFile);
          }
        
    });
});

router.post('/editProject', function(req, res){
    var id = req.body.id;
    var skein_id = req.body.skein_id;
    var assigned_by = req.body.assigned_by;
    var project_name = req.body.project_name;
    var project_logo = req.body.project_logo;

    dbConnection.query("UPDATE projects SET skein_id='"+skein_id+"',assigned_by='"+assigned_by+"',project_name='"+project_name+"',project_logo='"+project_logo+"' where id='"+id+"'", function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            responceFile.body = [];
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Task updated successfully";
            responceFile.body = [];
            res.send(responceFile);
          }
        
    });
});

router.post('/getProjectList', function(req, res){
    var query = (req.body.skein_id)?"SELECT * FROM projects WHERE skein_id='"+req.body.skein_id+"'":"SELECT * FROM projects";

    dbConnection.query(query, function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            responceFile.body = [];
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "";
            responceFile.body = result;
            res.send(responceFile);
          }
        
    });
});


router.post('/deleteProject', function(req, res){
    var query = "DELETE from projects where id='"+req.body.skein_id+"'";

    dbConnection.query(query, function (err, result, fields) {
        if (err){
            responceFile.status = 401;
            responceFile.message = "Database Error, Please try again";
            responceFile.body = [];
            res.send(responceFile);
        }else if(result){
            responceFile.status = 200;
            responceFile.message = "Project deleted successfully";
            responceFile.body = [];
            res.send(responceFile);
          }
        
    });
});




module.exports = router;