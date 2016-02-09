var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, document.body.clientHeight / 2)
var lineX = 0, lineY = document.body.clientHeight / 2;
var interval = window.setInterval(function() {
	// move right by random amount
	var add = 50 * Math.random();
	ctx.lineTo(lineX + add, lineY);
	lineX += add;
	// randomly move up or down by random amount
	if(Math.random() < .5) {
		var add = 25 * Math.random();
		ctx.lineTo(lineX, lineY + add);
		lineY += add;
	} else {
		var add = 25 * Math.random();
		ctx.lineTo(lineX, lineY - add);
		lineY -= add;
	}
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(lineX, lineY);
	if(lineX >= document.body.clientWidth) {
		window.clearInterval(interval);
		lineX = 0;
		lineY = document.body.clientHeight / 2;
	}
}, 50);