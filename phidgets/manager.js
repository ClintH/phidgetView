
function PhidgetManager(app) {
    this.app = app;
    var phidget = require('phidgetAPI').phidget;
    this.p = new phidget();
    this.init();
    this.io = GLOBAL.io;
}
module.exports = PhidgetManager;


PhidgetManager.prototype.discover = function(socket) {
    console.log("Discover:");
    console.dir(this.p.data);
    socket.emit("onDiscover", this.p.data);
};

PhidgetManager.prototype.log = function(m) {
    console.log("Manager: " + m)
}
PhidgetManager.prototype.init = function() {
    this.log("Init");
    var p = this.p;
    var me = this;

    p.on("log", 
        function(data){
            me.log("log: " + JSON.stringify(data));
        }
    );

    p.on("error", 
        function(data){
            me.log('Error: ' + JSON.stringify(data));
        }
    );

    /*
    * Detecting Phidget Attached for first time
    * Phidgets attached at the start of your program will
    * not fire added, they will simply be available in the p.data
    * 
    */
    p.on('added', 
        function(data){
            me.log("New phidget: " + JSON.stringify(data));
        }
    );

    /*
    * Detecting status change for both Re-Attach and Detach
    */
    p.on(
    'changed', 
        function(data){
            me.log('Phidget status changed: ' + JSON.stringify(data));

        }
    );

    /*
    * Detecting Phidget Attach
    */
    p.on(
        'attached', 
        function(data){
            me.log('Phidget re-attached: ' + JSON.stringify(data));
            me.io.sockets.emit("available", data)
        }
    );

    /*
    * Detecting Phidget Detach
    */
    p.on(
        'changed', 
        function(data){
         me.log('Phidget detached: '+ JSON.stringify(data));
         me.io.sockets.emit("unavailable", data);
    }
    );

    p.on(
        'phidgetReady',
        function(){
            me.log('Manager ready: ' + JSON.stringify(p.data));
            me.io.sockets.emit("currentlyAvailable", p.data);

            var InterfaceKit = require("./interfacekit");
            var ik = new InterfaceKit(this);
        }
    );
    
   // p.connect({rawLog:true, type:"PhidgetManager"});
     
    
}