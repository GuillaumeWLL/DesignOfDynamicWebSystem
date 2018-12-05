//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var cors = require( 'cors' );
var cookieParser = require( 'cookie-parser' ) ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;
router.use(cors());
router.use( cookieParser() );

//-----------------------------GET METHOD---------------------------------------

router.get( '/' , ( req , res ) =>
{
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'Select count(*) from Historic where User_id = ?' , [ req.cookies.user_info ] , ( err , result ) =>
      {
        if( !err )
        {
          res.json( JSON.stringify( result ) ) ;
        }
        else
        {
          res.json( JSON.stringify( err.message ) ) ;
        }
      } ) ;
    }
    else
    {
      res.json( JSON.stringify( error.message ) ) ;
    }
  } ) ;
} ) ;
//-----------------------------POST METHOD--------------------------------------

router.put( '/edit' , ( req , res ) =>
{ //changes in the database
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'UPDATE Users SET user_name = ? , user_mail = ? , user_password = ? , user_level = ? WHERE user_id = ?', [ req.body.username , req.body.mail , req.body.password , req.body.level , req.body.id ] , ( error , result ) => {
        res.json( JSON.stringify( result ) ) ;
      } ) ;
    }
    else
    {
        res.json( JSON.stringify( error.message ) ) ;
    }
  } ) ;
} );

module.exports = router ;
