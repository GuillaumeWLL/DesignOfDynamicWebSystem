//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var cors = require( 'cors' );
var cookieParser = require( 'cookie-parser' ) ;
var logger = require( '../logs' ) ;
var md5 = require( 'md5' );

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;
router.use(cors());
router.use( cookieParser() );

//-----------------------------GET METHOD---------------------------------------

router.get( '/' , ( req , res ) => //get the progression for a given user
{
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'Select * from Users where User_id = ?' , [ req.cookies.user_info ] , ( err , result ) =>
      {
        if( !err )
        {
          res.status(200).json( JSON.stringify( result[ 0 ] ) ) ;
          logger.info( "Access to user " + req.cookies.user_info +" historic" ) ;
        }
        else
        {
          res.status(401).json( JSON.stringify( err.message ) ) ;
          logger.error( "error while getting historic for user: "+req.cookies.user_info ) ;
        }
      } ) ;
    }
    else
    {
      res.stauts(500).json( JSON.stringify( error.message ) ) ;
      logger.error("error while connecting to the database");
    }
  } ) ;
} ) ;
//-----------------------------PUT METHOD--------------------------------------

router.put( '/edit' , ( req , res ) =>
{ //changes in the database
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'UPDATE Users SET user_name = ? , user_mail = ? , user_password = ? , user_level = ? WHERE user_id = ?', [ req.body.username , req.body.mail , req.body.password , req.body.level , req.body.id ] , ( error , result ) => {
        res.status(200).json( JSON.stringify( result ) ) ;
        logger.info( "updating data for user "+ req.cookies.user_info ) ;
      } ) ;
    }
    else
    {
        res.status(400).json( JSON.stringify( error.message ) ) ;
        logger.error("can't access the database for updating user "+req.cookies.user_info+" data")
    }
  } ) ;
} );

module.exports = router ;
