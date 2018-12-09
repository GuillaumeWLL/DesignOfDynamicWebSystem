var { createLogger, format , transports } = require( 'winston' ) ;
var path = require( 'path' ) ;
var fs = require( 'fs' ) ;

const logDir = 'log';

if(!fs.existsSync(logDir)){ // create a log folder if it doesn't exist
  fs.mkdirSync(logDir);
}
const filename = path.join(logDir , 'logs.log' ); // add logs in the logs.log filen

var logger = createLogger({
  format: format.combine(
    format.label({ label: path.basename( module.parent.filename ) }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
  ),
  transports: [
    new transports.File({ filename,
    format: format.combine(
      format.printf(
        info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      )
    )
  })
  ]
});

module.exports = logger
