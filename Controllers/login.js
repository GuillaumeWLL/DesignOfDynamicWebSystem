//----------------------------REQUIREMENTS--------------------------------------

var express = require( 'express' ) ;
var mysql = require( 'mysql' ) ;
var myConnection = require( 'express-myconnection' ) ;
var config = require( '../config' ) ;
var bodyParser = require ( 'body-parser' ) ;
var router = express.Router() ;
var md5 = require( 'md5' ) ;
var cors = require( 'cors' );
var cookieParser = require( 'cookie-parser' ) ;
var winston = require( 'winston' ) ;

//---------------------------USE MIDDLEWARE-------------------------------------

router.use( bodyParser.urlencoded( { extended : true } ) ) ;
router.use( bodyParser.json() ) ;
router.use( myConnection( mysql , config.database , 'request') ) ;
router.use( cors() );
router.use( cookieParser() );
var logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.printf( info => {
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                  })
                ),
                transports: [ new winston.transports.File( { filename: 'errors.log' } ) ]
})

//---------------------------------GET RESPONSE---------------------------------

router.get( '/' , ( req , res ) =>
{
  req.getConnection( ( error , connection ) =>
  {
    if( !error )
    {
      connection.query( 'SELECT * FROM Users', ( error , result ) =>
      {
        logger.log( 'error' , 'good connection' ) ;
        /*if( JSON.stringify( req.cookies ).length > 1 )
        {
          res.status( 200 ).json( req.cookies ) ;
        }
        else
        {
          res.status( 200 ).send( 'pas de cookie trouvé' ) ;
        }
        */try
        {
            res.cookie( 'user_info' , JSON.parse(JSON.stringify(result [0])).user_id ).status(200).send("everything is ok");
        }
        catch ( e )
        {
          /*if (e instanceof ErrorSyntax)
          {
            res.status(400).send( "trouble incomming" ) ;
          }*/
        }
      } ) ;
    }
    else
    {
        res.status(200).json( JSON.stringify( error.message ) ) ;
    }
  } ) ;
} ) ;

//--------------POST RESPONSE - FIND IF THE USER IS IN THE DATABASE-------------

router.post( '/' , ( req , res  ) => //when a post request fires
{
  req.getConnection( ( error , conn ) => //connection to the database
  {
    conn.query( 'SELECT * FROM Users WHERE user_name = ? AND user_password = ?' , [ req.body.username , /*md5(*/ req.body.password /*)*/ ] , ( error , result ) =>
    { // if we find the username and the password in the databse then we log our user
      if( result.length !== 0 ) //if we get something from the DB
      {
        if( JSON.stringify( req.cookies ) === '{}' ) //if there is no cookie ==> we create one
        {
          try
          {
            conn.query( 'UPDATE Users SET user_status = 1 WHERE user_id = ?' , [ JSON.parse( JSON.stringify( result[ 0 ] ) ).user_id ] , ( error , resul ) =>
            {//set the status to 1
                  res.cookie( 'user_info' , JSON.parse(JSON.stringify(result [0])).user_id ).status(202).send("everything is ok"); //create a cookie with user id
            } );
          } catch ( e )
          {
            if( e instanceof SyntaxError)
            {
              res.satus(400).send( "trouble incomming" ) ;
            }
          }
        }
        else//otherwise we tell that a cookie already exists
        {
          res.stauts(200).send("cookie déjà émis");
        }
      }
      else
      {
      //  res.json( JSON.stringify( error.message ) ) ; //send the error message
        res.status(400).send( "You are not in the database, please sign in" );
      }
    } );
  } ) ;
} ) ;

module.exports = router ;
