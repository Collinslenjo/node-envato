const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const request = require('request');

const config = require('./config.js');

// Init App
const app = express();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

//Load view Engine
app.engine('ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Load styles
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/myst', express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

//Home route
app.get('/', function(req,res){
	res.render('index',{messages: req.flash('messages') });
});
// Api service
app.get('/api', function(req,res){
	res.render('api');
});
/*
 * Run All the validation JSON.parse and JSON.parse to envato and get results back
*/
app.post('/search',function(req,res){
	var dog = req.body.search;
	var options = {
	  url: 'https://api.envato.com/v1/discovery/search/search/item?term='+dog+'&site=themeforest.net',
	  headers: {
	    'Authorization': 'Bearer xxxxxxxxxx'
	  }
	};
	function callback(err, body){
	    var obj = JSON.parse(body.body);
		res.json(obj.matches);
  	}
  request(options, callback);
});

//start Server
app.listen(3000,function () {
	console.log("Local Development server started on **localhost:3000**");
});

module.exports = app;
