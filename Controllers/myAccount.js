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
      connection.query( 'Select *  from Users where User_id = ?' , [ req.cookies.user_info ] , ( err , result ) =>
      {
        if( !err )
        {
          res.status(200).json(  result[ 0 ]  ) ;
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
      res.status(500).json( JSON.stringify( error.message ) ) ;
      logger.error("error while connecting to the database");
    }
  } ) ;
} ) ;

//-----------------------------GET PROGRESSION--------------------------------
var nb;
var lvl;
var prog;
router.get('/progression' , ( req , res ) => 
{
 req.getConnection( ( error , connection ) => 
 {
  connection.query( 'Select Count(User_ID) as nb from Historic where User_ID = ? ' ,  [ req.cookies.user_info] , ( err , result ) => 
  {
   nb = JSON.parse( JSON.stringify( result[0] ) ).nb ;
  });
  connection.query( 'Select Count(Level_ID) as lvl from Levels where Difficulty_ID = 1' , ( err , resu ) => 
  {
   lvl  = JSON.parse( JSON.stringify( resu[0] ) ).lvl ;
   prog = nb/lvl ;
   res.status(200).json(prog);
   connection.query( 'Update Users Set user_progression = ? Where user_id = ?' , [ prog , req.cookies.user_info ] , ( error , resuu ) => 
   {});
  });
 });
});

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

//----------------------------POST REQUEST PITURE UPDATE-------------------------
router.post( '/avatar' , ( req , res ) =>
{
 req.getConnection( ( error , connection ) =>
 {
  if (!error)
  {
   connection.query( 'Update User set user_pic = ? where user_id = ?' , [ req.body.avatar , req.cookies.user_info ] , ( err , resu ) => 
   {
    res.status(200).json( JSON.stringify( resu[0] ) ) ;
    logger.info("adding a picture for user "+ req.cookies.user_info );
   } );
  }
  else
  {
   res.status(401).json( JSON.stringify( error.message ) );
  }
 } );
} ) ;


module.exports = router ;
