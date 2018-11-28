//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var md5 = require( 'md5' ) ;
var cors = require( 'cors' );
router.use(cors());

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( bodyParser.urlencoded( { 'extended' : 'true' } ) ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;

//---------------------------------GET RESPONSE---------------------------------

router.get( '/' , ( req , res ) => {
  req.getConnection( ( error , connection ) => {
    if( !error ) {
      connection.query( 'SELECT * FROM Users', ( error , result ) => {
        res.json( JSON.stringify( result ) ) ;
      } ) ;
    }
    else {
        res.json( JSON.stringify( error.message ) ) ;
    }
  } ) ;
} ) ;

//--------------POST RESPONSE - FIND IF THE USER IS IN THE DATABASE-------------

router.post( '/' , ( req , res  ) => { //when a post request fires
  req.getConnection( ( error , conn ) => { //connection to the database
    conn.query( 'SELECT user_id FROM Users WHERE user_name = ? AND user_password = ?' , [ req.body.username , md5( req.body.password ) ] , ( error , result ) => { // if we find the mail and the password in the databse then we log our user
      if( !error ) {
        conn.query( 'UPDATE Users SET user_status = 1 WHERE user_id = ?' , [ JSON.parse( JSON.stringify( result[ 0 ] ) ).user_id ] , ( error , resul ) => {
          res.json( JSON.stringify( resul ) ) ;
        }) //set the user status to 1
      }
      else {
        res.json( JSON.stringify( error.message ) ) ; //send the error message
      }
    } );
  } ) ;
} ) ;

module.exports = router ;
