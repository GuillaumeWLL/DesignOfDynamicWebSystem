/*-------------set up -------------------*/

var express = require ( 'express' ) ; //add express to the project
var app = express() ; // creation of the app
var fs = require( 'fs' );
var path = require( 'path' );

app.use( require( './Controllers' ) ) ;
app.use( express.static( path.join( __dirname, 'dist' ) ) ) ;
app.get( '/home' , ( req, res ) => {
	res.sendFile( __dirname + '/dist/index.html' ) ;
} ) ;

app.listen(8080 , () => {
  console.log( "listening on port 8080...") ;
});
