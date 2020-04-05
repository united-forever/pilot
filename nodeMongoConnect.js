// This is just a demo file to see if I was able to make a connection to the db, and if data was being posted.

var express = require('express'),
mongoose = require('mongoose'),
body_parser = require('body-parser');

var app = express();

// Mongoose Connection
const URI = "mongodb+srv://yash_verma:*******@jspsych-eymdu.mongodb.net/test_db?retryWrites=true&w=majority"
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
    
    // Defining schema
    var emptySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type:String
    }
});

module.exports = mongoose.model("Entry", emptySchema);

// Middleware
    app.use(body_parser.json());

// Creating a model instance
    var entryInstance = mongoose.model("Entry");

// Post request
    app.post("/blah", async(req,res) => {
        try {
            const newRecord = new entryInstance();
            newRecord.name = req.body.name;
            newRecord.place = req.body.place;
            await newRecord.save();
            
        } catch (error) {
            console.log('An error is messing up!')
        }
    })

// Starting the server
    var server = app.listen(process.env.PORT || 1040, function(){
        console.log("Listening on port %d", server.address().port);
    });
    
