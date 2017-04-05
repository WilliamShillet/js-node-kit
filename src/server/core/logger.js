import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import winston from 'winston';
import moment from 'moment';

let instance = null;
//module service with singleton pattern
export default class loggerService{
  get timeStamp(){ return this._timeStamp}

  constructor(){
    if (!instance)
    {

      //Setup Logger
       // to test whether we have singleton or not
      this._timeStamp = this.time;
      let time = ()=>{ return moment().format('YYYY-MM-DD h:mm:ss a')}
      //set up custom token for req:id and log with Morgan
      morgan.token('id', function getId (req) {
               return req.id
         })
      //Make Morgan Write to a file
      var logDirectory = path.join(__dirname, 'log')

      // ensure log directory exists
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

       // create a rotating write stream this keep our log files from getting to big
       var accessLogStream = rfs('request.log', {
        interval: '1d', // rotate daily
       path: logDirectory
      })

      //set up winston
      //add consol level for error only
      //set up winston
      //add consol level for error only
      let winlogger = new winston.Logger({
          transports: [
              new winston.transports.File({
                  level: 'error',
                  filename: 'app.log',
                  handleExceptions: true,
                  json: true,
                  maxsize: 5242880, //5MB
                  maxFiles: 5,
                  colorize: false,
                  timestamp: true,
                  prettyprint:true
              }),
              new winston.transports.Console({
                  level: 'debug',
                  handleExceptions: true,
                  json: false,
                  colorize: true
              })
          ],
          exitOnError: false
      });


      let logger ={
        timeStamp: this._timeStamp,
        time: time,
        log:(message,category = 'info')=>{ winlogger.log(category,message)},
        dev: morgan(':id :method :status :url :response-time[3]',{stream: accessLogStream})
      }

      instance = logger;
    }

    return instance;
  }


}
