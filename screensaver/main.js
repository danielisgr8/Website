var interval, friction, frictionInterval = false;
var div = document.getElementById("drag");
div.draggable = true;
div.style.left = 0;
div.style.top = 0;
var img = document.createElement("img");
img.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
var xBefore, xAfter, yBefore, yAfter;
var xVelocity, vxBefore, vxAfter, yVelocity, vyBefore, vyAfter;
div.ondragstart = function(e) {
	e.dataTransfer.setDragImage(img, 0, 0);
	div.style.backgroundColor = "red";
	xBefore = e.screenX;
	yBefore = e.screenY;
	vxBefore = e.screenX;
	vyBefore = e.screenY;
	interval = window.setInterval(function() {
		if(typeof xAfter != "undefined" && typeof yAfter != "udnefined") {
			friction();
		}
	}, 10);
	function friction() {
		xVelocity = vxAfter - vxBefore;
		vxBefore = vxAfter;
		yVelocity = vyAfter - vyBefore;
		vyBefore = vyAfter;
	}
	if(frictionInterval) {
		window.clearInterval(frictionInterval);
		frictionInterval = false;
	}
}
div.ondrag = function(e) {
	xAfter = e.screenX;
	yAfter = e.screenY;
	vxAfter = e.screenX;
	vyAfter = e.screenY;
	if(xBefore != xAfter && xAfter != 0) {
		var xDif = xAfter - xBefore;
		if(parseInt(div.style.left, 10) + xDif < 0) {
			div.style.left = "0px";
		} else if(parseInt(div.style.left, 10) + xDif > document.documentElement.clientWidth - 100) {
			div.style.left = document.documentElement.clientWidth - 100 + "px";
		} else {
			div.style.left = parseInt(div.style.left, 10) + xDif + "px";
		}
		xBefore = xAfter;
	}
	if(yBefore != yAfter && yAfter != 0) {
		var yDif = yAfter - yBefore;
		if(parseInt(div.style.top, 10) + yDif < 0) {
			div.style.top = "0px";
		} else if(parseInt(div.style.top, 10) + yDif > document.documentElement.clientHeight - 100) {
			div.style.top = document.documentElement.clientHeight - 100 + "px";
		} else {
			div.style.top = parseInt(div.style.top, 10) + yDif + "px";
		}
		yBefore = yAfter;
	}
}
div.ondragend = function(e) {
	div.style.backgroundColor = "blue";
	window.clearInterval(interval);
	frictionInterval = window.setInterval(function() {
		if(parseInt(div.style.left, 10) + xVelocity < 0 || parseInt(div.style.left, 10) + xVelocity > document.documentElement.clientWidth - 100) {
			xVelocity = -xVelocity;
		}
		div.style.left = parseInt(div.style.left, 10) + xVelocity + "px";
		if(parseInt(div.style.top, 10) + yVelocity < 0 || parseInt(div.style.top, 10) + yVelocity > document.documentElement.clientHeight - 100) {
			yVelocity = -yVelocity;
		}
		div.style.top = parseInt(div.style.top, 10) + yVelocity + "px";
	}, 10);
}
document.onkeypress = function(e) {
	if(e.charCode == 32) {
		xVelocity = 0;
		yVelocity = 0;
		window.clearInterval(frictionInterval);
		frictionInterval = false;
	}
}