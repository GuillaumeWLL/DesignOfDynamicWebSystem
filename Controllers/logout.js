//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var cors = require( 'cors' );
router.use(cors());

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;

//---------------------------------GET RESPONSE---------------------------------
router.post( '/' , ( req , res ) => {
  req.getConnection( ( error , connection ) => {
    if( !error ) {
      connection.query( 'UPDATE Users SET user_status = 0 WHERE user_name = ?', [ req.body.username ] , ( error , result ) => {
        res.json( JSON.stringify( result ) ) ;
      } ) ;
    }
    else {
        res.json( JSON.stringify( error.message ) ) ;
    }
  } ) ;
} ) ;


module.exports = router ;
