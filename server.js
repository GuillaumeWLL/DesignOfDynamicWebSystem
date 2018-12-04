/*-------------set up -------------------*/
var express = require ( 'express' ) ; //add express to the project
var app = express() ; // creation of the app
var fs = require( 'fs' );
var path = require( 'path' );
var https = require( 'https' );
const httpsOptions = {
			key: fs.readFileSync( './Certificates.pem' ),
			cert: fs.readFileSync( './Certificates.pem' )
}
var server = https.createServer( httpsOptions, app );
app.use( require( './Controllers' ) ) ;
app.use( express.static( path.join( __dirname, 'dist' ) ) ) ;
app.get( '/home' , ( req, res ) => {
	res.sendFile( __dirname + '/dist/index.html' ) ;
} ) ;

server.listen(8080 , () => {
  console.log( "listening on port 8080...") ;
});
