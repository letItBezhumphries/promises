/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));
var crypto = Promise.promisifyAll(require('crypto'));


// (1) Asyncronous HTTP request
var getGitHubProfileAsync = function(profile, callback) {
  var options = {
    url: `https://api.github.com/users/${profile}`,
    headers: { 'User-Agent': 'request' },
    json: true // will JSON.parse(body) for us
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(err, response, body) {
      console.log('BODY', body);
      if (err) { 
        return reject(err, null); 
      } else { 
        resolve(callback(null, body));
      }
    });
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfileAsync); // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) {
      callback(err, null); 
    } else {
      callback(null, buffer.toString('hex'));
    }    
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) {
      callback(err, null); 
    } else {
      var funnyFile = file.split('\n')
        .map(function(line) {
          return line + ' lol';
        })
        .join('\n');
      callback(null, funnyFile);
    }
  });
};

var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny); // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};