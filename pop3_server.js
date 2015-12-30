var markdown = require("node-markdown").Markdown;
var N3 = require("./n3").N3;
var MessageStore = require("./messagestore").MessageStore;

var SERVER_NAME = process.env.SERVER_NAME || "mail.domain.com";
var SHARED_SECRET = process.env.SHARED_SECRET || "secret";
var VALID_USER = process.env.USER || "joe";

// runs after the user is successfully authenticated
MessageStore.prototype.registerHook = function(){

    var curtime = new Date().toLocaleString(),
        message = "Tere ÕÜÄÖŠ!\n------------------\n\n"+
                  "Kell on praegu **"+curtime+"**\n"+
                  "\n"+
                  "Vaata ka:\n"+
                  "\n"+
                  "  * [Delfi](http://www.delfi.ee)\n" +
                  "  * [NETI](http://www.neti.ee)\n" +
                  "  * [EPL](http://www.epl.ee)\n" +
                  "\n"+
                  "*Koodiblokk*\n"+
                  "\n"+
                  "    for(var i=0;i<100;i++){\n"+
                  "        alert(i+5);\n"+
                  "    }\n"+
                  "\n\n"+
                  "Parimat,  \nKellamees";
    
    this.addMessage({
        toName:         "Andris Reinman",
        toAddress:      "andris.reinman@gmail.com",
        fromName:       "Ämblik Kämbu",
        fromAddress:    "amblik.kambu@node.ee",
        subject:        "Muti metroo on nüüd avatud!",
        text:           message,
        html:           markdown(message)
    });
};

function AuthStore(user, auth){
    var sharedSecret;
    if(user === VALID_USER){
        sharedSecret = SHARED_SECRET;
    }
    return auth(sharedSecret);
}

N3.startServer(1100, SERVER_NAME, AuthStore, MessageStore);
