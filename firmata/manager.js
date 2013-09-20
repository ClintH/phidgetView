
function FirmataManager(app) {
    this.app = app;
    var five = require("johnny-five");
    this.io = GLOBAL.io;
    this.boards = [];
    this.init();
}
module.exports = FirmataManager;


FirmataManager.prototype.discover = function(socket) {
    this.log("Discover:");
    this.log(this.p.data);
    socket.emit("onDiscover", this.boards);
};

FirmataManager.prototype.log = function(m) {
    console.log("Firmata: " + m)
}
FirmataManager.prototype.init = function() {
    this.log("Init");
    // TODO: Discovery/listing of serial ports?

    var FirmataBoard = require("./firmataBoard");
    this.boards.push(new FirmataBoard(this));
     
    
}