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

function Cart(oldCart) {
      oldCart = oldCart ? oldCart : {};
    
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    
      this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    
       this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
        this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

app.get("/",(request, response) =>{    
    function getProducts(){
    var ref = firebaseApp.database().ref('products');
    return ref.once('value').then(snap => snap.val());   
}
  getProducts().then(products => {
      console.log("home products",facts);
     response.render('home-new',{products})       
       return null;    
    }).catch(error => {
              console.log('error', error);
            });   
});


const appFour = express();
appFour.use(bodyParser.urlencoded({extended: true}));
appFour.use(bodyParser.json());
appFour.engine('hbs', engines.handlebars);
appFour.set('views','./views');
appFour.set('view engine', 'hbs');

appFour.get('/contact_us', (request,response) =>{
    response.render('contactUs.hbs');
});

const appFive = express();
appFive.use(bodyParser.urlencoded({extended: true}));
appFive.use(bodyParser.json());
appFive.engine('hbs', engines.handlebars);
appFive.set('views','./views');
appFive.set('view engine', 'hbs');

appFive.get("/about_us", (req,res) =>{
    res.render("aboutUs.hbs");
});


const appSeven = express();
appSeven.use(bodyParser.urlencoded({extended: true}));
appSeven.use(bodyParser.json());
appSeven.engine('hbs', engines.handlebars);
appSeven.set('views','./views');
appSeven.set('view engine', 'hbs');

appSeven.get("/auth/login",(req,res) => {
    console.log("step 1, login url");
    res.render("login.hbs", {error: null});
});

appSeven.post("/auth/loginPost",(req,res)=>{   
                var email=req.body.email ;
    var password =req.body.password ;
    console.log("step 2, login/auth url");
    firebaseApp_web.auth().signInWithEmailAndPassword(email, password).then((user)=>{
        console.log("user 2:",user);
        console.log("the person is signed in");
        
      req.session.user = JSON.stringify(user);
      req.session.count = 0;
      console.log("req.session.user in loginPost: ",req.session.user);
      console.log("is mail verified",user.user.emailVerified);
      if(user.user.emailVerified === false){
         var err= "Email address is not verified. Check mail box.";
          res.render("login.hbs", {error:err});
      }
      else {
          res.redirect("/auth/auth-shopping-cart");
      }
        return  null;
    }).catch(function(error) {
  var errorCode = error.code; var errorMessage = error.message;
  console.log("errorCode: ",errorCode); console.log("errorMessage: ",errorMessage);
  var err;
  if(errorCode === "auth/user-not-found") err = "Please Sign Up";
  if(errorCode === "auth/invalid-password") err = "Password must be at least six characters."; 
  if(errorCode === "auth/wrong-password") err = "The password is wrong";
  if(errorCode === "auth/invalid-email") err= "Invalid Email";
  res.render("login.hbs", {error: err} ); 
});
return res.locals.session = req.session;
})

exports.app = functions.https.onRequest(app);
exports.appFour = functions.https.onRequest(appFour);
