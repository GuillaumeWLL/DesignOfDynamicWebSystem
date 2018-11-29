//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var cors = require( 'cors' );



//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use(cors());

//-----------------------------GET METHOD---------------------------------------

router.get( '/' , ( req , res ) => {
  res.send( "You know I feeling like home" ) ;
})


module.exports = router ;
