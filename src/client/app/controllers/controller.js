/* eslint-disable no-unused-vars */
/** @todo add Controllers.HomeController = HomeController
*   This class will be where the Home Controller goes
*/
import moment from 'moment';


/** this var is so that we have a Singleton Controller class */
let instance = null;
export default class HomeController
{
  get timeStamp() {return this._timeStamp; }
  constructor(movieCollection){
  if(!instance){
           // to test whether we have singleton or not
           this._timeStamp = moment().format('YYYY-MM-DD h:mm:ss a');
           //@todo: change this to a log statment;
           console.log(`A movie controller was created at ${this.timeStamp}`);
     }


     return instance;

}


}
