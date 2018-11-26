var express = require( 'express' ) ;
var router = express.Router() ;


router.use( '/login' , require( './login' ) ) ; //can send a post  request
router.use( '/signin' , require( './signin') ) ; // send a post request
router.use( '/home' , require ( './home' ) ) ; // get the source of the page
router.use( '/MyAccount' , require ( './myAccount' ) ) ; //get the user's account page and put modification
router.use ( '/play' , require( './play' ) ) ; //get the page where you can play
router.use( '/logout' , require ( './logout' ) ) ; // send a post request 


module.exports = router ;
