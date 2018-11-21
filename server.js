/*-------------set up -------------------*/

var express = require ( 'express' ) ; //add express to the project
var morgan = require ( 'morgan' ) ; // log requests to the console
var bodyParser = require ( 'body-parser' ) ; // pull information from HTML Post
var methodOverride = require( 'method-override' ) ; // simulate DELETE and PUT
var connect = require( './SQLFunctions' ) ;

var app = express() ; // creation of the app

/*-----------configuration -------------*/

app.use( express.static(__dirname + '/public' )) ; //set the static files location /public/img
app.use( morgan( 'dev' ) ) ; // log every request to the console
app.use( bodyParser.urlencoded( { 'extended' : 'true' } ) ) ; //parse application /x-www-form-urlencoded
app.use( bodyParser.json() ) ; //parse application/json
app.use( bodyParser.json( { type : 'application/vnd.api+json' } ) ) ; //parse application /vnd.api+json as json
app.use( methodOverride() ) ;


/*--------------------HOME---------------------------------------*/

app.get( '/home' , function( req , res ) {
  connect.isInTheDB( "guillaume@mail.fr" , "passwd" , connect.getAllLevel ) ;
  res.status(200).send( "hello "+JSON.parse( connect.checked ).user_name+" number of level of difficulty 1 : "+connect.rep) ;
}) ;

/*-------------------------------LOGIN - GET---------------------------------------*/

app.get( '/login' , ( req , res ) => {
  res.setHeader( 'Content-Type' , 'text/plain'/*'text/html'*/ ) ; // change to the login page
  res.send( "bon courage pour te loggin" ) ;
  /*res.render(login.html)*/
} ) ;


/*-------------------------------LOGIN - POST ---------------------------------------*/

 app.post( '/login' , ( req , res ) => {
   //res.send("bonjour");
   let mpd = req.body.password ; // receive password from the post request
   connect.isInTheDB( mail , mpd ) ; // check if the user is in the database , if yes then we log in
   /*if (connect.checked !== "") {
     connect.logIn( JSON.parse( connect.checked ).user_id ) ;
   }*/
   res.setHeader( 'Content-Type' , 'text/plain' ) ;
   res.send( "bonjour "+req.body.mail+req.body.password /* , mpd , JSON.stringify( connect.checked )*/ ) ;
 } ) ;

/*-------------------------------PROFILE---------------------------------------------*/

  app.get( '/profile/:user_name' , ( req , res ) => {

  })

/*-------------------------------SIGNIN - GET---------------------------------------------*/

  app.get( '/signin' , ( req , res ) => {

  } ) ;

/*-------------------------------SIGNIN - POST ---------------------------------------------*/

 app.post( '/signin' , ( req , res ) => { 

 } ) ;

/*--------------------listen start app with node server.js-----------------*/

app.listen(8080 , () => {
  console.log( "App listening on port 8080" ) ;
} ) ;
//connect.endOfConnection();
