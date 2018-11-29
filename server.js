/*-------------set up -------------------*/

var express = require ( 'express' ) ; //add express to the project
var app = express() ; // creation of the app
var https = require( 'https' ) ;
var fs = require( 'fs' ) ;
const httpsOptions = {
  key: fs.readFileSync( './Certificates.pem' ),
  cert: fs.readFileSync( './Certificates.pem' )
}
var server = https.createServer( httpsOptions , app );
app.use( require( './Controllers' ) ) ;


server.listen(8080 , () => {
  console.log( "listening on port 8080...") ;
})