var assert = require('chai').assert;
var winston = require('winston');
var mvrd = require('../index.js');

describe("GetPlateNumber", function() {
  this.timeout(15000);
  describe("#GetPlateNumber()", function() {
    var GetPlateNumberResp;
    before(function() {
      var client = new mvrd();
      return client.getData("FST918EH")
                   .then(function(resp) {
                     GetPlateNumberResp = resp;
                    }).catch(function(err){
                     GetPlateNumberResp = err;
                    });
    });

    it("GetPlateNumber response status should be success", function() {
      console.log(GetPlateNumberResp);
    });
  });

});
