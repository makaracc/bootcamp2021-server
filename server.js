require('dotenv').config()
var createError = require('http-errors');
var express = require("express")
var cors = require("cors")
var path = require('path')
var app = express()
var calculatorRouter = require('./routes/calculatorRoute');
// var userRoute = require('./routes/userRoute')
var awsUserRoute = require('./routes/awsUserRoute')
var timelineRoute = require('./routes/timelineRoute')
app.use(express.static(__dirname+'/build'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
var MongoConnect = require('./mongoConnect')
app.use('/calculator', calculatorRouter);
app.use('/user', awsUserRoute);
app.use('/posts', timelineRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.sendFile((__dirname+'/404.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/build', 'index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port);
})