console.log("interfacekit.js");
var id = "ik";
var io = GLOBAL.io;

var p = new phidget();

var log = function(m) {
	console.log(id + ": " + m)

}
p.on('phidgetReady', function() {
	log("Ready");
	io.sockets.emit("ready", id);
})
p.on('changed', function(data) {
	if (data.type == "RawSensor") return;
	//log("Change: " + JSON.stringify(data));
	io.sockets.emit("change", {id: id, data:data});
	//io.sockets.emit("change-" + id, data);
})
p.on('error', function(data) {
	log("Error: " + data);
	io.sockets.emit("error", {id: id, msg:data});
	io.sockets.emit("error-" + id, data);

});
p.on('log', function(data) {
	log("Log: " + data);
	io.sockets.emit("log", {id: id, msg:data});
	io.sockets.emit("log-" + id, data);

})
p.connect({type:'PhidgetInterfaceKit'})