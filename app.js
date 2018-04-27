var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// var https = require("https");
// fs = require("fs");
var port = process.env.port || 8989;

// const options = {
//   key : fs.readFileSync("private.key"),
//   cert: fs.readFileSync("certificate.crt"),
//   requestCert: false,
//   rejectUnauthorized: false
// };

var app = express();

//set view engin part
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser for json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//Task Routes
var routescmnAddTask = require('./routes/cmnAddTask');
// app.use('/empTaskAdd',routescmnAddTask);
// app.use('/empTaskUpdate',routescmnAddTask);
// app.use('/getEmpTaskList',routescmnAddTask);
app.use(routescmnAddTask);

//Authendication Routes
var routescmnAuth = require('./routes/cmnAuth');
// app.use('/useAuthendication',routescmnAuth);
// app.use('/useForgotPass',routescmnAuth);
app.use(routescmnAuth);

//Leave Routes
var routescmnLeave = require('./routes/cmnLeave');
// app.use('/empApplyLeave',routescmnLeave);
// app.use('/empLeaveUpdate',routescmnLeave);
// app.use('/getEmpLeaveList',routescmnLeave);
app.use(routescmnLeave);

//Managers Routes
var routescmnMngrRoutes = require('./routes/cmnMngrRoutes');
// app.use('/empRemoveByAssignee',routescmnMngrRoutes);
app.use(routescmnMngrRoutes);

//Project Routes
var routescmnProject = require('./routes/cmnProject');
// app.use('/addProject',routescmnProject);
// app.use('/empTaskUpdate',routescmnProject);
// app.use('/getProjectList',routescmnProject);
app.use(routescmnProject);

//User Details Routes
var routescmnRegistration = require('./routes/cmnRegistration');
// app.use('/empRegistration',routescmnRegistration);
// app.use('/empDetailsUpdate',routescmnRegistration);
// app.use('/getEmpDetails',routescmnRegistration);
// app.use('/updateEmpAvatar',routescmnRegistration);
// app.use('/updateEmpStatus',routescmnRegistration);
app.use(routescmnRegistration);

//Notifications Routes
var routescmnNotifications = require('./routes/cmnNotification');
app.use(routescmnNotifications);

// app.get('*', function(req, res){
//   res.send(405, 'Menthod not allowed');
// })

app.listen(port, function(){
  console.log('App ready with PORT : ', port);
})

// var server = https.createServer(options, app).listen(port, function(){
//   console.log('App ready with PORT : ', port);
// });