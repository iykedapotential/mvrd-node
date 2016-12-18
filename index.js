'use strict';

var Request = require('./src/mvrd.request.js');
var q  = require('q');
var cheerio = require('cheerio');
var _ = require('lodash');

module.exports =  function(){

    this.getData = function(platenumber) {
        var deferred = q.defer();
        var baseUrl = 'http://www.lsmvaapvs.org';
        var relativeUrl = '/search.php?vpn='+ platenumber;
        var mvrd = new Request(baseUrl).makeGetRequest(relativeUrl);
        mvrd.then(function(html){
            var $ = cheerio.load(html);
            var title, value;
            var result = [];
            var index = [];
            $('table > tbody > tr').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                value = data.children().last().text();
                index.push(title);
                result.push(value);
            });
            var json = {};
            for(var n in result){
                var key = _.camelCase(index[n].trim());
                json[key] = result[n];
            }
            deferred.resolve(json);
        }).catch(function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
}