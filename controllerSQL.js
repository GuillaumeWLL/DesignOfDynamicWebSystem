var mysql = require( 'mysql' ) ;
var config = require( './config' ) ;
var myConnection = require( 'express-myconnection' ) ;
var express = require( 'express' ) ;
var app = express() ;
var dbOptions = {
  host : config.database.host ,
  user : config.database.user ,
  password : config.database.password ,
  port : config.database.port ,
  database : config.database.database
}

app.use( myConnection( mysql , dbOptions , 'request' ) ) ;


/*--------------------FUNCTION TO QUERY THE DB // level by difficulty----------------*/

function getLevelByDifficulty( id_difficulty , callback )
{
  var rep ;
  mysqlConnection.query('SELECT COUNT(?) FROM Levels WHERE Difficulty_ID = ?', [ id_difficulty , id_difficulty ] , ( error , result )  => {
    if( error ) {
      module.exports.rep = error.message  ;
    }
    getTheCountResponse( result[0] ) ;
  });
}

/*--------------------FUNCTION TO GET ALL THE LEVEL IN THE DB----------------*/

function getAllLevel( )
{
  var rep ;
  mysqlConnection.query( 'SELECT COUNT(*) FROM Levels' , ( error , result ) => {
    if ( error ) {
      console.log( error.message ) ;
    }
    //getTheCountResponse( result[ 0 ] ) ;
    module.exports.rep = JSON.stringify( result[ 0 ] );
  }) ;
}

/*--------------------FUNCTION TO GET ALL LEVELS DONE BY ONE USER AND BY DIFFICULTY----------------*/

function getLevelDoneByUserDifficulty( user_ID , difficulty_ID )
{
  mysqlConnection.query( 'SELECT COUNT(?) FROM Historic WHERE User_ID = ? AND Difficulty_ID = ?' , [ user_ID , user_ID , difficulty_ID ] , ( error , result ) => {
    if ( error ) {
      console.log( error.message ) ;
    }
    else {
          console.log( getTheCountResponse( result[ 0 ] ) ) ;
    }
  }) ;
}

/*--------------------FUNCTION TO GET ALL LEVELS DONE BY ONE USER----------------*/

function getNbLevelDoneByUser( user_ID )
{
  mysqlConnection.query( 'SELECT COUNT(?) FROM Historic WHERE User_ID = ?' , [ user_ID , user_ID ] , ( error , result ) => {
    if ( error )
    {
      console.log( error.message ) ;
    }
    else {
      console.log( getTheCountResponse( result[ 0 ] ) ) ;
    }
  }) ;
}

/*--------------------FUNCTION TO ADD A LEVEL IN THE DB----------------*/

function addLevel( id , difficulty , name , description )
{
  mysqlConnection.query( 'INSERT INTO Levels ( Level_ID , Difficulty_ID , Level_Name , Level_Desc) VALUES ( ? , ? , ? , ? )' , [ id , difficulty , name , description ] , ( error , result ) => {
    if ( error )
    {
      console.log( error.message ) ;
    }
    else {
      console.log( result.affectedRows ) ;
    }
  } ) ;
}

/*--------------------FUNCTION TO CREATE A USER IN THE DB----------------*/

function createUser( name , mail , password , level )
{
  mysqlConnection.query( 'INSERT INTO Users (user_name , user_mail , user_psswd , user_level) VALUES (? , ? , ? , ?)' , [ name , mail , password , level ] , ( error , result ) => {
    if( error )
    {
      console.log( error.message ) ;
    }
    else {
      console.log( result.affectedRows ) ;
    }
  } ) ;
}

/*--------------------FUNCTION TO CHANGE USER'S STATUS (LOGIN / LOGOUT)----------------*/

function logIn ( user_id )
{
  mysqlConnection.query( 'UPDATE Users SET user_status = 1 WHERE user_id = ?' , [ user_id ] , ( err , result ) =>
  {
    if ( err )
    {
      console.log ( err.message ) ;
    }
    else
    {
      console.log ( result.affectedRows ) ;
    }
  } ) ;
}

function logOut ( user_id )
{
  mysqlConnection.query( 'UPDATE Users SET user_status = 0 WHERE user_id = ?' , [ user_id ] , ( err , result ) => {
    if ( err ) {
      console.log( err.message ) ;
    } else {
      if( result.affectedRows === 1 ) {
        console.log( "you are now logged out") ;
      }
    }
  }) ;
}

/*--------------------FUNCTION TO CHECK IF A USER IS IN THE DATABASE----------------*/

function isInTheDB( user_mail , user_password , callback )
{
  var checked ;
  mysqlConnection.query('SELECT * FROM Users WHERE user_mail = ? AND user_password = ?' , [ user_mail , user_password ] , ( err , result ) => {
    if ( err ){
      //console.log( err.message ) ;
      module.exports.checked = JSON.stringify( err.message ) ;
    }
    else {
      module.exports.checked = JSON.stringify( result[0] ) ;
      /*why not using res.json();?*/
    }
  })
  callback();
}


/*EXPORTATION OF THE FUNCTION DEFINED BEFORE*/
module.exports = {
  /*mysqlConnection : connection, //you can call the fucntion con() with the name mysqlConnectio() in the server.js file
  endOfConnection : endOfConnection, //function that ends the connection to the DB*/
  getLevelByDifficulty : getLevelByDifficulty,
  getAllLevel : getAllLevel,
  getLevelDoneByUserDifficulty : getLevelDoneByUserDifficulty,
  getNbLevelDoneByUser : getNbLevelDoneByUser,
  addLevel : addLevel,
  createUser : createUser,
  logIn : logIn ,
  logOut : logOut,
  isInTheDB : isInTheDB
}
