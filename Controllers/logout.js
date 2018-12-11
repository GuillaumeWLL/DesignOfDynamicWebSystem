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
      connection.query( 'UPDATE Users SET user_status = 0 WHERE user_id = ?', [ req.cookies.user_info ] , ( error , result ) =>
      {
        logger.info( "The user: " + req.cookies.user_info +" has been logged out");
	res.clearCookie( 'user_info' , { httpOnly : true , secure : true } ).status(200).end() ;
      } ) ;
    }
    else
    {
        res.status(400).json( JSON.stringify( error.message ) ) ;
        logger.error( "Error while logging out user " + req.cookies.user_info ) ;
    }
  } ) ;
} ) ;


module.exports = router ;
