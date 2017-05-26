import * as winston from 'winston'

 const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({level: "debug", timestamp: true}),
      // new (winston.transports.File)({ filename: 'somefile.log' })
    ]
  });

  
  export default logger