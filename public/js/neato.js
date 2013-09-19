/*
* Simple Graph Drawing and Phidget connectivity
*
* Clint Heyer, September 2013.
* clhe@itu.dk
*
*/	
var socket = io.connect(); //'http://localhost');
var series = [];
var bufferSize = 512;

socket.on('change', function (data) {
	var d = data.data;
	var index = parseInt(d.key);
	var s = series[index];
	var buffer = s.buffer;
	buffer.shift();
	var val = parseInt(d.value);
	buffer.push(val);
	if (val > s.max) s.max = val;
	if (val < s.min) s.min = val;
	series[index].buffer = buffer;
});

 
$(document).ready(function () {
	for (var i=0;i<8; i++) {
		var buffer = new Array(bufferSize);
		for (var p=0;p<buffer.length;p++) {
			buffer[p] = -1;
		}

		series.push({
			index: i,
			buffer: new Array(bufferSize),
			min: 99999,
			max: 0
		});
	}

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
	(function animloop(){
	  requestAnimFrame(animloop);
	  
	 render();
	})();
});


function render() {
	var canvas = document.getElementById("chart5");
	var context = canvas.getContext("2d");
	var ourW = canvas.width;
	var ourH = canvas.height;
	var y = 0;
	var padding = 10;
	var seriesHeight = 100;
	context.fillStyle = "rgba(255,255,255,0.2)";
	context.fillRect(0,0,ourW,ourH);
		
	for (var i=0;i<series.length;i++) {
  		y += seriesHeight + padding;
		var s = series[i];
		var bufferCopy = s.buffer.slice();
	  	var scaleFactor = seriesHeight/(s.max-s.min);
	  	context.fillStyle = "black";
		var h = bufferCopy[bufferCopy.length-1] *scaleFactor;
		context.fillRect(0, y-h, padding, h);
		var x = padding;
		var avg = bufferCopy[bufferCopy.length-1];
		var counted = 1;
		context.fillStyle = "red";
		for (var p=bufferCopy.length;p>0;p--) {
			x+=2;
			if (Number.isNaN(bufferCopy[p])) continue;
			if (bufferCopy[p] === undefined) continue;
			if (bufferCopy[p] < 0) continue;
			avg += bufferCopy[p];
			counted++;
			var h = bufferCopy[p]*scaleFactor;
			context.fillRect(x, y-h, 1, h);				
		}
		x = padding;
		y += padding;
		avg = parseInt(avg/counted);
		context.fillStyle= "white";
		context.fillRect(x,y-padding,ourW, 12);
		context.fillStyle = "gray";
		context.fillText("last: " + bufferCopy[bufferCopy.length-1] +"\tavg: " + avg + "\t\tmax: " + s.max + "\tmin: " + s.min, x, y);
  		y += 12 + padding;
  } 
}

