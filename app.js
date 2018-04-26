var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 8989;

//set view engin part
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser for json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser());

//Task Routes
var routescmnAddTask = require('./routes/cmnAddTask');
app.use(routescmnAddTask);

//Authendication Routes
var routescmnAuth = require('./routes/cmnAuth');
app.use(routescmnAuth);

//Leave Routes
var routescmnLeave = require('./routes/cmnLeave');
app.use(routescmnLeave);

//Managers Routes
var routescmnMngrRoutes = require('./routes/cmnMngrRoutes');
app.use(routescmnMngrRoutes);

//Project Routes
var routescmnProject = require('./routes/cmnProject');
app.use(routescmnProject);

//User Details Routes
var routescmnRegistration = require('./routes/cmnRegistration');
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