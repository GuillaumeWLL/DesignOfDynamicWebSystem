//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var md5 = require( 'md5' ) ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( bodyParser.urlencoded( { 'extended' : 'true' } ) ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;


//------------------POST RESPONSE - ADDING A USER IN THE DATABASE---------------

router.post( '/' , ( req , res ) => { //trying to create a new user
  req.getConnection( ( error , connection ) => { //create a new user in the database
      connection.query( 'INSERT INTO Users (user_name , user_mail , user_password , user_level) VALUES (? , ? , ? , ?)' , [ req.body.name , req.body.mail , md5( req.body.password ) , req.body.level ] , ( error , result ) => {
        if( !error ) {
          res.json( result.affectedRows ) ;
        }
        else {
          res.json( error.message ) ;
        }
      } ) ;
  } ) ;
} ) ;

module.exports = router ;
