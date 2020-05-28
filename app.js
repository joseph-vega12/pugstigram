if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//routes 
const indexRouter = require('./routes/index');
const pugPicturesRouter = require('./routes/pugs');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');// links to views folder

// ======================================================================================================================================================================
//mongoose configurations
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});


//notifies us if mongoose is connected or an error has occured
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('error', error => console.log("CONNECTED TO MONGOOSE"));
// ======================================================================================================================================================================

app.use('/', indexRouter);
app.use('/pugs', pugPicturesRouter);

app.listen(process.env.PORT || 3000, function(req, res){
    console.log('SERVER HAS STARTED!!!');
});