//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var md5 = require( 'md5' ) ;
var cors = require( 'cors' );
var cookieParser = require( 'cookie-parser' ) ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;
router.use( cors() );
router.use( cookieParser() );

//--------------POST RESPONSE - FIND IF THE USER IS IN THE DATABASE-------------

router.post( '/' , ( req , res  ) => //when a post request fires
{
  req.getConnection( ( error , conn ) => //connection to the database
  {
    conn.query( 'SELECT * FROM Users WHERE user_name = ? AND user_password = ?' , [ req.body.username , md5( req.body.password ) ] , ( error , result ) =>
    { // if we find the username and the password in the databse then we log our user
      if( result.length !== 0 ) //if we get something from the DB
      {
        if( JSON.stringify( req.cookies ) === '{}' ) //if there is no cookie ==> we create one
        {
          conn.query( 'UPDATE Users SET user_status = 1 WHERE user_id = ?' , [ JSON.parse( JSON.stringify( result[ 0 ] ) ).user_id ] , ( error , resul ) =>
          { // set the status to 1
          } );
		res.cookie( 'user_info' , JSON.parse( JSON.stringify( result[0] ) ).user_id ) ;
		res.status(200).json(result);
        }
        else //otherwise we tell that a cookie already exists
        {
          console.log("cookie déjà émis");
        }
      }
      else
      {
      	res.json( JSON.stringify( error.message ) ) ; //send the error message
      }
    } );
  } ) ;
} ) ;

module.exports = router ;
