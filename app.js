// --- LOADING MODULES
var express = require('express'),
mongoose = require('mongoose'),
body_parser = require('body-parser');

// --- INSTANTIATE THE APP
var app = express();

// --- MONGOOSE SETUP
mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }); 
var test = mongoose.connection;
test.on('error', console.error.bind(console, 'connection error'));
test.once('open', function callback() {
    console.log('database opened');
});

var emptySchema = new mongoose.Schema({}, { strict: false });
var Entry = mongoose.model('Entry', emptySchema);


// --- STATIC MIDDLEWARE 
app.use('/jspsych-6.0.5', express.static(__dirname + "/jspsych-6.0.5"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/img', express.static(__dirname + "/img"));

// --- BODY PARSING MIDDLEWARE
app.use(body_parser.json()); // to support JSON-encoded bodies

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/experiment', function(request, response) {
    response.render('experiment_pilot.html');
});

app.post('/experiment-data', function(request, response){
    Entry.create({
        "data":request.body
    });    
    response.end();
})
// --- START THE SERVER 
var server = app.listen(process.env.PORT, function(){
    console.log("Listening on port %d", server.address().port);
});