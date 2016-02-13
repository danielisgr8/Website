var drawers = [], intervalRunning = false;
var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var ctx = canvas.getContext("2d");
function drawer(lineX, lineY) {
	this.lineX = lineX;
	this.lineY = lineY;
	this.drawing = true;
}
canvas.onclick = function(e) {
	drawers[drawers.length] = new drawer(e.clientX, e.clientY);
	if(!intervalRunning) {
		draw();
	}
}
function draw() {
	ctx.beginPath();
	var interval = window.setInterval(function() {
		intervalRunning = true;
		var running = [];
		for(var i = 0; i < drawers.length; i++) {
			if(drawers[i].drawing) {
				running.push(drawers[i]);
			}
		}
		for(var i = 0; i < running.length; i++) {
			ctx.moveTo(running[i].lineX, running[i].lineY);
			// move right by random amount
			var add = 50 * Math.random();
			ctx.lineTo(running[i].lineX + add, running[i].lineY);
			running[i].lineX += add;
			// randomly move up or down by random amount
			if(Math.random() < .5) {
				var add = 25 * Math.random();
				ctx.lineTo(running[i].lineX, running[i].lineY + add);
				running[i].lineY += add;
			} else {
				var add = 25 * Math.random();
				ctx.lineTo(running[i].lineX, running[i].lineY - add);
				running[i].lineY -= add;
			}
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			if(running[i].lineX >= document.body.clientWidth) {
				running[i].drawing = false;
			}
		}
		if(running.length == 0) {
			window.clearInterval(interval);
			intervalRunning = false;
		}
	}, 50);
}