var mysql = require( 'mysql' ) ;
var express = require( 'express' ) ;
var app = express() ;
var mysqlConnection = mysql.createConnection( {
  host :'localhost' ,
  user : 'root' ,
  password : 'root' ,
  database : 'Website' ,
  port : '8889'
}) ;



/*--------------------FUNCTION TO CONNECT TO THE database----------------*/

function connection()
{
  mysqlConnection.connect( ( err ) => // we connect to the database
  {
    if ( err ) // if an error occurs we print the message error and close the Connection
    {
      console.log( 'Error login DB : ' + err.message ) ;
      endOfConnection() ;
      return ;
    }
    console.log( 'Connection established' ) ;
  }) ; //end of connect()
} ; //end of function connection()

/*--------------------FUNCTION TO DISCONNECT FROM THE DB----------------*/

 function endOfConnection( error )
{
  if(error)
  {
    console.log( error.message)
  }
  else {
    mysqlConnection.end( ( error ) =>
    {
      if( error ) {
        console.log( error.message ) ;
      }
      else {
        console.log( "switching off" ) ;
      }
    })  ;
  }
}
/*--------------------FUNCTION TO GET THE COUNT RESPONSE ----------------*/

function getTheCountResponse( stringLine ) // function to get just the number of the count function result
{
  var counts ;
 module.exports.counts = JSON.stringify( stringLine ).substr( 12 , 1 )  ; /*string the result, keep the 12th character of the string (number return by the function COUNT())*/
}

/*--------------------FUNCTION TO QUERY THE DB // level by difficulty----------------*/

function getLevelByDifficulty( id_difficulty )
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


connection() ;

/*EXPORTATION OF THE FUNCTION DEFINED BEFORE*/
module.exports = {
  mysqlConnection : connection, //you can call the fucntion con() with the name mysqlConnectio() in the server.js file
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
