// --- LOADING MODULES
var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

// --- INSTANTIATE THE APP
var app = express();

// --- MONGOOSE SETUP
const URI = "mongodb+srv://yash_verma:*********@jspsych-eymdu.mongodb.net/test?retryWrites=true&w=majority"
const connectDB = async () => {
    try{
    await mongoose.connect(URI,{
         useNewUrlParser: true ,
         useUnifiedTopology: true });
    console.log('Mongodb is connected');

    }catch (e) {
        console.error(e);
        console.log('oops!!');
    } 
    };
    
    connectDB().catch(console.error);

var emptySchema = new mongoose.Schema({}, { strict: false });
var Entry = mongoose.model("Entry", emptySchema);


// --- STATIC MIDDLEWARE 
app.use('/jspsych-6.0.5', express.static(__dirname + "/jspsych-6.0.5"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/img', express.static(__dirname + "/img"));

// --- BODY PARSING MIDDLEWARE
app.use(bodyParser.json()); // to support JSON-encoded bodies

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/experiment', function(request, response) {
    response.render('test.html');
});

app.post("/experiment-data", (req, res) => {
    var myData = new Entry(req.body);
    myData.save()
      .then(item => {
        res.send("saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

  app.get('/finish', function(request, response) {
    response.render('finish.html');
});

// --- START THE SERVER 
var server = app.listen(process.env.PORT || 7777, function(){
    console.log("Listening on port %d", server.address().port);
});
