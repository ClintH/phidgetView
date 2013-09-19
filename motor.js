console.log("motor.js");

var motor = new phidget();
motor.on('phidgetReady', function() {
	console.log("Motor ready");
	io.sockets.emit("ready", "motor");
})

motor.connect({type:'PhidgetStepper'})