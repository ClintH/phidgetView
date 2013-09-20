var five = require("johnny-five");

function FirmataBoard(opts, manager) {
    this.sensors = [];
    this.manager = manager;
    this.io = GLOBAL.io;
    this.id = "Board";
    this.board = new five.Board({repl:false});
    this.board.repl = false;
    var me = this;
    this.board.on("ready", function() {
    	me.init();
    });

}
module.exports = FirmataBoard;

FirmataBoard.prototype.log = function(m) {
    console.log("Board: " + m)
}

FirmataBoard.prototype.init = function() {
	var me = this;
	me.log("Init");

	for (var i=0;i<8;i++) {
		var pin = "A" + i;
		sensor = new five.Sensor({
			pin: pin,
			freq: 100,
			board: me.board
		});
		me.sensors.push(sensor);
	}

	for (var i=0;i<me.sensors.length;i++) {
		var s = me.sensors[i];
		s.on("change", function() {
			//console.log(this.pin + " = " + this.value);
			io.sockets.emit("change", {
				data: {
					key: this.pin,
					value: this.value
				}
			})
		})
	}

}



