const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const session = require("express-session");
 const FirebaseStore = require('connect-session-firebase')(session);
const app = express();
var firebase_web = require("firebase");

var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('hbs', engines.handlebars);
app.set('views','./views');
app.set('view engine', 'hbs');
app.enable('view cache');
var handlebars = require('handlebars');

var cookieParser = require("cookie-parser");
appSeven.use(session({
      store: new FirebaseStore({
        database: firebaseApp.database()
      }),
      name: '__session',
      secret: 'mysupersecret',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge : 10*60*1000 },
      secure: true
    }));
appSeven.use(cookieParser('mysupersecret'));

app.get("/",(request, response) =>{    
res.send("hello");     
});

exports.app = functions.https.onRequest(app);
