var interval, friction;
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
}
div.ondrag = function(e) {
	xAfter = e.screenX;
	yAfter = e.screenY;
	vxAfter = e.screenX;
	vyAfter = e.screenY;
	if(xBefore != xAfter && xAfter != 0) {
		var xDif = xAfter - xBefore;
		div.style.left = parseInt(div.style.left, 10) + xDif + "px";
		xBefore = xAfter;
	}
	if(yBefore != yAfter && yAfter != 0) {
		var yDif = yAfter - yBefore;
		div.style.top = parseInt(div.style.top, 10) + yDif + "px";
		yBefore = yAfter;
	}
}
div.ondragend = function(e) {
	div.style.backgroundColor = "blue";
	window.clearInterval(interval);
	var frictionInterval = window.setInterval(function() {
		if(parseInt(div.style.left, 10) + xVelocity < 0 || parseInt(div.style.left, 10) + xVelocity > document.documentElement.clientWidth - 100) {
			xVelocity = -xVelocity;
		}
		div.style.left = parseInt(div.style.left, 10) + xVelocity + "px";
		if(parseInt(div.style.top, 10) + yVelocity < 0 || parseInt(div.style.top, 10) + yVelocity > document.documentElement.clientHeight - 100) {
			yVelocity = -yVelocity;
		}
		div.style.top = parseInt(div.style.top, 10) + yVelocity + "px";
	}, 10);
	// interval
	// if velocity isn't 0
	// change position by velocity
	// subtract velocity by accelartion due to friction
}