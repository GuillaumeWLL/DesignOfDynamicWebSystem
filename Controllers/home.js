/*//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var fs = require('fs');
var cors = require( 'cors' );
var path = require( 'path' ) ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.json() ) ;
router.use( bodyParser.urlencoded( { 'extended' : 'true' } ) ) ;
router.use( cors() );
router.use( express.static( 'home/guiwal-8/2018-project-pjg/PJG-front-end/src' ) ) ;

//-----------------------------GET METHOD---------------------------------------

router.get( '/' , ( req , res ) => {
  res.status(200).sendFile( 'index.html' ) ;
} );


module.exports = router ;
*/
