const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    path = require("path"),
    methodOverride = require("method-override"),
    flash = require('connect-flash'),
    port=process.env.PORT||5000,
    session =require('express-session'),
    cookieParser =require('cookie-parser'),
    dotenv=require('dotenv');

// Require Routes
var userRoutes =require('./routes/user');
var inviteRoutes =require('./routes/invite');


//App Config
app.use(cookieParser('secret'));
app.use(require("express-session")({
    secret: "This is a marketing panel",
    resave: false,
    saveUninitialized: false

}));
app.use(flash());


//App other config


// app.use(express.cookieParser('keyboard cat'));
// app.use(express.session({ cookie: { maxAge: 60000 }}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 });

// For deployment

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    // app.get('*', (req,res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // });
}

//---------------
//Mongo Config
//---------------
//Mongo URI
dotenv.config();
// const mongoURI = "mongodb://localhost/stickman_game_project";
const mongoURI = "mongodb+srv://"+process.env.MLAB_USER+":"+process.env.MLAB_PASS+"@cluster0-ki0wo.mongodb.net/gamebuddy_7?retryWrites=true&w=majority";
//Mongo connection
mongoose
    .connect(mongoURI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true    
    })
    .then(() => console.log('MongoDB Connected....'))
    .catch(err => console.log(err));        

// @HOME ROUTE
app.get('/',(req,res)=>{
    res.render('index');
})






app.use('/',userRoutes);
app.use('/',inviteRoutes);

app.listen(port,()=>{
    console.log("server started at "+port);
});