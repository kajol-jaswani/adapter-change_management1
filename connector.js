const request = require('request');
//const main = require('ServiceNowAdapter');
const validResponseRegex = /(2\d\d)/;


/**
 * The ServiceNowConnector class.
 *
 * @summary ServiceNow Change Request Connector
 * @description This class contains properties and methods to execute the
 *   ServiceNow Change Request product's APIs.
 */
class ServiceNowConnector {

  /**
   * @memberof ServiceNowConnector
   * @constructs
   * @description Copies the options parameter to a public property for use
   *   by class methods.
   *
   * @param {object} options - API instance options.
   * @param {string} options.url - Your ServiceNow Developer instance's URL.
   * @param {string} options.username - Username to your ServiceNow instance.
   * @param {string} options.password - Your ServiceNow user's password.
   * @param {string} options.serviceNowTable - The table target of the ServiceNow table API.
    * @param {string} options.method - The table target of the ServiceNow table API.
   */
  constructor(options) {
    this.options = options;
  }




 constructUri(serviceNowTable, query = null) {
   let uri = `https://dev92842.service-now.com/api/now/table/${serviceNowTable}`;
  if (query) {

     // console.log(uri);
    uri = uri + '?' + query;
    //console.log("hiii uri in constructUri is"+uri);
  }
  return uri;
}
  /**
   * @callback iapCallback
   * @description A [callback function]{@link
   *   https://developer.mozilla.org/en-US/docs/Glossary/Callback_function}
   *   is a function passed into another function as an argument, which is
   *   then invoked inside the outer function to complete some kind of
   *   routine or action.
   *
   * @param {*} responseData - When no errors are caught, return data as a
   *   single argument to callback function.
   * @param {error} [errorMessage] - If an error is caught, return error
   *   message in optional second argument to callback function.
   */


 sendRequest(callOptions, callback) {
  // Initialize return arguments for callback
 // let url = options.url;
 
  let uri;
 // console.log("in service Table  check");
 // console.log(callOptions.options);
  if (callOptions.query)

  uri = this.constructUri(callOptions.serviceNowTable, callOptions.query);
  else

 uri = this.constructUri(callOptions.options.serviceNowTable);
  /**
   * You must build the requestOptions object.
   * This is not a simple copy/paste of the requestOptions object
   * from the previous lab. There should be no
   * hardcoded values.
   */
  // console.log("urlllllllllllllllllllllllllllllllllll");
  // console.log(uri);
   
 let requestOptions = {};
  request(uri, (error, response, body) => {
   this. processRequestResults(error, response, body, (processedResults, processedError) => callback(processedResults, processedError));
  });
}

 isHibernating(response) {
  return response.body.includes('Instance Hibernating page')
  && response.body.includes('<html>')
  && response.statusCode === 200;
}

 processRequestResults(error, response, body, callback) {
  


 console.error('error:', error); // Print the error if one occurred
 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 console.log('body:',response);
}

post(callOptions, callback) {
console.log("in post"+callOptions);
   
  callOptions.method = 'POST';
  this.sendRequest(callOptions, (results, error) => callback(results, error));
}

  /**
   * @memberof ServiceNowConnector
   * @method get
   * @summary Calls ServiceNow GET API
   * @description Call the ServiceNow GET API. Sets the API call's method and query,
   *   then calls this.sendRequest(). In a production environment, this method
   *   should have a parameter for passing limit, sort, and filter options.
   *   We are ignoring that for this course and hardcoding a limit of one.
   *
   * @param {iapCallback} callback - Callback a function.
   * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
   *   Will be HTML text if hibernating instance.
   * @param {error} callback.error - The error property of callback.
   */
  get(callback) {
    let getCallOptions = { ...this.options };
    getCallOptions.method = 'GET';
    getCallOptions.query = 'sysparm_limit=1';
    this.sendRequest(getCallOptions, (results, error) => callback(results, error));
  }

}

module.exports = ServiceNowConnector;