// Essentially a conveyor belt where the oldest element leaves to the left and the new element joins from the right
Array.prototype.forcePush = function(elem, maxLength) {
	var arr = this;
	if(arr.length >= maxLength) {
		arr = arr.slice(arr.length - maxLength + 1, arr.length);
		arr.push(elem);
	} else {
		arr.push(elem);
	}
	return arr;
}
var frictionInterval = false;
var div = document.getElementById("drag");
div.style.left = 0;
div.style.top = 0;
var img = document.createElement("img");
img.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
var xBefore, xAfter, yBefore, yAfter;
var xVelocity, yVelocity;
var vxHistory = [], vyHistory = []; // Becomes an array of the last five changes in thei respective directions. A more lenient instantaneous velocity.
var clientHeight, clientWidth;
var divLeft = div.style.left; // div.style.left
var divTop = div.style.top; // div.style.top

div.ondragstart = function(e) {
	e.dataTransfer.setDragImage(img, 0, 0);
	e.dataTransfer.setData("Text", "");
	div.style.backgroundColor = "red";
	if(frictionInterval) {
		window.clearInterval(frictionInterval);
		frictionInterval = false;
	}
	xAfter = null;
	yAfter = null;
	xBefore = e.screenX;
	yBefore = e.screenY;
	vxHistory = [];
	vyHistory = [];
}

// Updates coordinate and actually moves the box, making sure it doesn't go outside the client's boundaries.
div.ondrag = function(e) {
	xAfter = e.screenX;
	var dx = xAfter - xBefore;
	yAfter = e.screenY;
	var dy = yAfter - yBefore;
	// Movement of the div when dragged
	if(xBefore != xAfter && xAfter != 0) {
		divLeft = parseInt(div.style.left, 10);
		clientWidth = document.documentElement.clientWidth;
		// divLeft + dx is the amount the div WOULD move
		// If it would move outside the boundaries of the client, it will instead only go to the client's border
		// Otherwise, it will simply move as intended (divLeft + dx)
		if(divLeft + dx < 0) {
			div.style.left = "0px";
		} else if(divLeft + dx > clientWidth - 100) {
			div.style.left = clientWidth - 100 + "px";
		} else {
			div.style.left = divLeft + dx + "px";
		}
	}
	if(xAfter != 0) {
		vxHistory = vxHistory.forcePush(dx * 5, 5);
	}
	xBefore = xAfter;
	// divTop + dy is the amount the div WOULD move
	// If it would move outside the boundaries of the client, it will instead only go to the client's border
	// Otherwise, it will simply move as intended (divTop + dy)
	if(yBefore != yAfter && yAfter != 0) {
		divTop = parseInt(div.style.top, 10);
		clientHeight = document.documentElement.clientHeight;
		if(divTop + dy < 0) {
			div.style.top = "0px";
		} else if(divTop + dy > clientHeight - 100) {
			div.style.top = clientHeight - 100 + "px";
		} else {
			div.style.top = divTop + dy + "px";
		}
	}
	if(yAfter != 0) {
		vyHistory = vyHistory.forcePush(dy * 5, 5);
	}
	yBefore = yAfter;
}

div.ondragend = function(e) {
	div.style.backgroundColor = "blue";
	var xSum = 0;
	vxHistory.forEach(function(value) {
		xSum += value;
	});
	xVelocity = xSum / vxHistory.length;
	var ySum = 0;
	vyHistory.forEach(function(value) {
		ySum += value;
	});
	yVelocity = ySum / vyHistory.length;
	frictionInterval = window.setInterval(function() {
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
		divLeft = parseInt(div.style.left, 10);
		divTop = parseInt(div.style.top, 10);
		if(divLeft + xVelocity < 0) {
			div.style.left = "0px";
			xVelocity = -xVelocity;
		} else if(divLeft + xVelocity > clientWidth - 100) {
			div.style.left = clientWidth - 100 + "px";
			xVelocity = -xVelocity;
		}
		div.style.left = divLeft + xVelocity + "px";
		if(divTop + yVelocity < 0) {
			div.style.top = "0px";
			yVelocity = -yVelocity;
		} else if(divTop + yVelocity > clientHeight - 100) {
			div.style.top = clientHeight - 100 + "px";
			yVelocity = -yVelocity;
		}
		div.style.top = divTop + yVelocity + "px";
	}, 5);
}
document.onkeypress = function(e) {
	// charCode 32 is spacebar
	if(e.charCode == 32) {
		vxHistory = [];
		xVelocity = 0;
		vyHistory = [];
		yVelocity = 0;
		window.clearInterval(frictionInterval);
		frictionInterval = false;
	}
}
