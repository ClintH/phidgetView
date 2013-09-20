
function InterfaceKit(app) {
    this.app = app;
    var phidget = require('phidgetAPI').phidget;
    this.p = new phidget();
    this.io = GLOBAL.io;
    this.id = "PhidgetInterfaceKit";
    this.init();

}
module.exports = InterfaceKit;


InterfaceKit.prototype.log = function(m) {
    console.log("IK: " + m)

}

InterfaceKit.prototype.init = function() {
	var me = this;
	me.log("Init");
	var p = this.p;
	p.on('phidgetReady', function() {
		me.log("Ready");
		me.io.sockets.emit("ready", me.id);
	})
	p.on('changed', function(data) {
		if (data.type == "RawSensor") return;
		me.log("Change: " + JSON.stringify(data));
		me.io.sockets.emit("change", {id: me.id, data:data});
		//io.sockets.emit("change-" + id, data);
	})
	p.on('error', function(data) {
		me.log("Error: " + data);
		me.io.sockets.emit("error", {id: me.id, msg:data});
		me.io.sockets.emit("error-" + me.id, data);
	});
	p.on('log', function(data) {
		me.log("Log: " + data);
		me.io.sockets.emit("log", {id: me.id, msg:data});
		me.io.sockets.emit("log-" + me.id, data);
	})
	me.log("Connecting")
	p.connect({type:'PhidgetInterfaceKit'})
}



