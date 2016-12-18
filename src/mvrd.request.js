var q = require('q');
var request = require('request');
var logger = require('winston');

/*
* This class is responsible for wrapping the http request
* library
* @constructor
* @param {String} baseUrl.
* e.g RequestBuilder("https://mvrd.herokuapp.com/api/plates/FST918EH)
*/
var RequestBuilder = function(baseUrl) {
  var serverBaseUrl = baseUrl;
  var formData = {};
  var headers = {};
  var queryParams = {};

  /*
  * This method adds the header key, value
  * for the request to be made
  * @param {String} name.
  * @param {String} value.
  *
  */
  this.addHeader = function(name, value) {
    headers[name] = value;
    return this;
  }

  /*
  * Post data
  */
  this.addData = function(name, value) {
    formData[name] = value;
    return this;
  }

  this.addQueryParam = function(name, value) {
    queryParams[name] = value;
    return this;
  }

  this.addAccessToken = function(token) {
    return this.addHeader("Authorization", "Bearer "+token);
  }

  this.addCookie = function(cookie) {
    return this.addHeader("Set-Cookie", cookie);
  }

  /*
  * This method is responsible for building post request and sending it to a server
  * @param {String} path.
  */
  this.makePostRequest = function(path) {
    var deferred = Q.defer();
    logger.info("serverBaseUrl is: "+ serverBaseUrl);
    logger.info("Endpoint path is: "+ path);
    request({
      url: serverBaseUrl+path,
      headers: headers,
      method: "POST",
      form: formData
    }, function(error, response, body){
      if(error){
        //TODO: Error checking and validation will happen here
        logger.error(error);
        deferred.reject();
      }else {
        //TODO: statusCode response and response status error checks will happen at this level
        deferred.resolve({response: response, body: body});
      }
    });
    return deferred.promise;
  }

  /*
  * This method is responsible for building get request and sending it to a server
  */
  this.makeGetRequest = function(path) {
    var deferred = q.defer();
    request({
      url: serverBaseUrl+path,
      headers: headers,
      method: "GET",
      qs: queryParams
    }, function(error, response, body){
      if(error){
        //TODO: Error checking and validation will happen here
        logger.error(error);
        deferred.reject(body);
      }else {
        //TODO: statusCode response and response status error checks will happen at this level
        deferred.resolve(body);
      }
    });
    return deferred.promise;
  },

  this.getPlateNumberData = function(platenumber) {
      return this.makeGetRequest(platenumber);
  }
}

module.exports = RequestBuilder;