const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Init App
const app = express();

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Load view Engine
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'html');

//Load styles
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/myst', express.static(path.join(__dirname,'public')));

//Home route
app.get('/', function(req,res){
	res.render('index.html');
});
// Api service
app.get('/api', function(req,res){
	res.render('api.html');
});


/*
 * Run All the validation Stuff and post to envato and get results back
*/
app.post('/search',function(req,res){
	console.log(req.body);
	//res.end(blander);
});

//start Server
app.listen(3000,function (argument) {
	console.log("Local Development server started on **localhost:3000**");
})
