//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var cors = require( 'cors' );
var cookieParser = require( 'cookie-parser' ) ;
var logger = require( '../logs') ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;
router.use(cors());
router.use( cookieParser() );

//---------------------------------GET RESPONSE---------------------------------
router.post( '/' , ( req , res ) =>
{
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'UPDATE Users SET user_status = 0 WHERE user_name = ?', [ req.body.name ] , ( error , result ) =>
      {
        res.status(202).json( JSON.stringify( result ) ) ;
        res.clearCookie( 'user_info' ) ;
        logger.info( "The user: " + req.body.name +" has been logged out");
      } ) ;
    }
    else
    {
        res.json( JSON.stringify( error.message ) ) ;
        logger.error( "Error while logging out user " + req.body.name ) ;
    }
  } ) ;
} ) ;


module.exports = router ;
