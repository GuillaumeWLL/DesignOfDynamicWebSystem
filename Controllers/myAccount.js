//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;


//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( bodyParser.urlencoded( { 'extended' : 'true' } ) ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;

//-----------------------------GET METHOD---------------------------------------

router.get( '/' , ( req , res ) => {
  res.send("coucou") ;
} ) ;

module.exports = router ; 
