const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config =require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database' +config.database);
});

//on error
mongoose.connection.on('error', (err)=>{
    console.log('Database Error: ' +err);
});
const app = express();

const users = require('./routes/users');
const contct = require('./routes/route');

const port =3000;
//const port = process.env.PORT||8080;

// cors middleware
app.use(cors());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

app.use('/api', contct);
//app.get('/contacts',route);
//Index route
app.get('/', (req, res)=>{
    res.send("Invalid End Point");
});

app.get('*',(req,res)=>{
    res.send(path.join(__dirname, 'public/index.html'));
});
//start server
app.listen(port, ()=>{
    console.log("server started at port:"+port);
});