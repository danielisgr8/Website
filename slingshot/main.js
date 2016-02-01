function pi(variable) {
	if(isNaN(parseInt(variable, 10))) {
		return 0;
	} else {
		return parseInt(variable, 10);
	}
}
function style(element, property) {
	return window.getComputedStyle(element).getPropertyValue(property);
}
var div = document.getElementById("drag");
div.draggable = true;
var line, lineHolder = document.getElementById("lineHolder");
line = document.createElement("div");
line.id = "line";
line.style.width = "20px";
line.style.height = "20px";
div.style.width = "100px";
div.style.height = "100px";
div.style.left = "500px";
div.style.top = "500px";
var xBefore, xAfter, xOrigin, yBefore, yAfter, yOrigin;
var img = document.createElement("img");
img.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
div.ondragstart = function(e) {
	e.dataTransfer.setDragImage(img, 0, 0);
	div.style.backgroundColor = "red";
	xBefore = e.screenX;
	xOrigin = e.screenX;
	yBefore = e.screenY;
	yOrigin = e.screenY;
	lineHolder.style.left = div.style.left;
	lineHolder.style.top = div.style.top;
	line.style.display = "none";
	lineHolder.appendChild(line);
}
div.ondrag = function(e) {
	line.style.display = "block";
	xAfter = e.screenX;
	yAfter = e.screenY;
	if(xBefore != xAfter && xAfter != 0) {
		var xDif = xAfter - xBefore;
		if(xAfter < xOrigin) {
			// width + left = 60
			if(pi(style(line, "width")) + pi(style(line, "left")) != 60) {
				line.style.width = "20px";
				line.style.left = "40px";
			} else {
			line.style.width = pi(style(line, "width")) - xDif + "px";
			line.style.left = pi(style(line, "left")) + xDif + "px";
			}
		} else if(xAfter > xOrigin) {
			line.style.left = "40px";
			line.style.width = pi(style(line, "width")) + xDif + "px";
		} else if(xAfter == xOrigin) {
			line.style.width = "20px";
			line.style.left = "40px";
		}
		xBefore = xAfter;
	}
	// height should not change, angle should
	if(yBefore != yAfter && yAfter != 0) {
		var yDif = yAfter - yBefore;
		yBefore = yAfter;
	}
	if(typeof yDif != "undefined" && typeof xDif != "undefined") {
		var angle = Math.atan(yDif / xDif);
		line.style.transform = "rotate(" + pi(style(line, "transform")) + angle + "rad)"; // almost always 45 degrees
	}

}
div.ondragend = function(e) {
	div.style.backgroundColor = "blue";
	// lineHolder.removeChild(line);
	line.style.width = "20px";
	line.style.left = "40px";
	// line.style.transform = "rotate(0rad)";
}