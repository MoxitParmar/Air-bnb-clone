class ExpressError extends Error {
  constructor(statusCode, message) {
    // inharite the status code and message from the Error 
    //by that we dont allways have the same status and error that we define in the app.js
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
//require that export in app.js
