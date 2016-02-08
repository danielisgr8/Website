var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, 250)
var lineX = 0, lineY = 250;
var i = 0;
window.setInterval(function() {
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
	i++;
	if(i >= 100 || lineX >= 1800) {
		window.clearInterval(interval);
		lineX = 0;
		lineY = 250;
	}
}, 50);