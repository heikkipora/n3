var N3 = require("./n3").N3;
var MessageStore = require("./messagestore").MessageStore;
var yaml = require('js-yaml');
var fs = require('fs');

var SERVER_NAME = process.env.SERVER_NAME || "mail.domain.com";
var APOP_SECRET = process.env.APOP_SECRET || "secret";
var APOP_USER = process.env.APOP_USER || "joe";
var MESSAGES_PATH = process.env.MESSAGES_PATH || (__dirname + "/messages");

var MESSAGES = [];
var files = fs.readdirSync(MESSAGES_PATH);
files.forEach(function(fileName) {
  MESSAGES.push(yaml.safeLoad(fs.readFileSync(MESSAGES_PATH + "/" + fileName, 'utf8')));
});
console.log("Found " + MESSAGES.length + " messages in " + MESSAGES_PATH);

MessageStore.prototype.registerHook = function(){
  var self = this;
  MESSAGES.forEach(function(message) {
    self.addMessage(message);
  });
};

function AuthStore(user, auth){
    var sharedSecret;
    if(user === APOP_USER){
        sharedSecret = APOP_SECRET;
    }
    return auth(sharedSecret);
}

N3.startServer(1100, SERVER_NAME, AuthStore, MessageStore);
