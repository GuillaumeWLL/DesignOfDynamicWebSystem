/*-------------set up -------------------*/

var express = require ( 'express' ) ; //add express to the project
var app = express() ; // creation of the app


app.use( require( './Controllers' ) ) ;


app.listen(8080 , () => {
  console.log( "listening on port 8080...") ;
})
