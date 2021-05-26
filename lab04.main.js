// Update this constant with your ServiceNow credentials
const request = require('request');

const options = {
  url: 'https://dev104206.service-now.com/',
  username: 'admin',
  password: 'T0hGmqeqIY9C',
  serviceNowTable: 'change_request',
method : ''
};
// Import built-in Node.js package path.
const path = require('path');

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js.
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));
//console.log("service methodddddddddddddddd");
//console.log(ServiceNowConnector);

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 */
function mainOnObject() {
  // Instantiate an object from class ServiceNowConnector.
  const connector = new ServiceNowConnector(options);
  // Test the object's get and post methods.
  // You must write the arguments for get and post.
   console.log("main classsssss");
   console.log(connector);
  connector.get(connector.callback);
  connector.post(connector, connector.callOptions);
 //console.log(connector);

}

// Call mainOnObject to run it.
mainOnObject();