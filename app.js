const express = require('express'),
 mongoose = require('mongoose'), 
 app = express(),
 bodyParser = require('body-parser'), 
 Book = require('./models/bookModel'),
 //pass in Book to our book Router
 bookRouter = require('./routes/bookRouter')(Book);

let mongoConnectionString;

if(process.env.ENV == 'Test'){
    mongoConnectionString = 'mongodb://tester:pass@ds151393.mlab.com:51393/book_api_test';
}else{
    mongoConnectionString = 'mongodb://tester:pass@ds141613.mlab.com:41613/book_api';
}

console.log(mongoConnectionString);

//connect to instance of mLab mongoDb
mongoose.connect(mongoConnectionString,  { useNewUrlParser: true }, err=>{
    if(!err){
        console.log("connected to mongoDb");
    }
});

const port = process.env.PORT || 3000;
//use the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', bookRouter);

app.listen(port, function(){
    console.log('gulp is running app.js on port: '+ port);
});

module.exports = app;