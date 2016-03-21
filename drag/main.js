function left() {
	return parseInt(img.style.left, 10);
}
var velocity = [];
var vInterval1, vInterval2, vInterval3, vInterval4;
var img = document.getElementsByTagName("img")[0];
img.draggable = false;
img.style.left = window.getComputedStyle(img).getPropertyValue("left");
img.onmousedown = function(e) {
	document.body.style.cursor = "-webkit-grabbing";
	var movements = [];
	var sum = 0;
	img.onmousemove = function(ev) {
		if(left() + ev.movementX > 0) {
			movements.push(ev.movementX);
			if(movements.length == 5) {
				for(var i = 0; i < movements.length; i++) {
					sum += movements[i];
				}
				img.style.left = left() + Math.floor(0.3 * sum) + "px";
				movements = [];
				sum = 0;
			}
			velocity = [];
		} else if(left() + ev.movementX < -1920) {
			movements.push(ev.movementX);
			if(movements.length == 5) {
				for(var i = 0; i < movements.length; i++) {
					sum += movements[i];
				}
				img.style.left = left() + Math.floor(0.3 * sum) + "px";
				movements = [];
				sum = 0;
			}
			velocity = [];
		} else {
			var leftI = left();
			img.style.left = left() + ev.movementX + "px";
			var leftF = left();
			if(leftF - leftI != 0) {
				velocity.push(leftF - leftI);
				if(velocity.length > 5) {
					velocity = velocity.slice(-5);
				}
			}
		}
	}
}
img.onmouseup = function(e) {
	document.body.style.cursor = "-webkit-grab";
	if(left() > 0) {
		var initialLeft = left();
		var interval = window.setInterval(function() {
			if(left() - 20 * (left() / initialLeft) <= 0) {
				img.style.left = 0 + "px";
				clearInterval(interval);
			} else {
				img.style.left = left() - 20 * (left() / initialLeft) + "px";
			}
		}, 10);
	} else if(left() < -1920) {
		var initialLeft = left();
		var interval = window.setInterval(function() {
			if(left() + 20 * ((left() + 1920) / (initialLeft + 1920)) >= -1920) {
				img.style.left = -1920 + "px";
				clearInterval(interval);
			} else {
				img.style.left = left() + 20 * ((left() + 1920) / (initialLeft + 1920)) + "px";
			}
		}, 10);
	}
	if(velocity.length == 5) {
		var sum = 0;
		for(var i = 0; i < velocity.length; i++) {
			sum += velocity[i];
		}
		var average = sum / 5;
		if(average <= -4) {
			vInterval1 = window.setInterval(function() {
				if(left() - 40 <= -1920) {
					img.style.left = -1920 + "px";
					clearInterval(vInterval1);
				} else {
					img.style.left = left() - 40 + "px";
				}
			}, 10);
		} else if(average < 0) {
			var initialLeft = left();
			vInterval2 = window.setInterval(function() {
				if(left() + 20 * (left() / initialLeft) >= 0) {
					img.style.left = 0 + "px";
					clearInterval(vInterval2);
				} else {
					img.style.left = left() + 20 * (left() / initialLeft) + "px";
				}
			}, 10);
		} else if(average >= 4) {
			vInterval3 = window.setInterval(function() {
				if(left() + 40 >= 0) {
					img.style.left = 0 + "px";
					clearInterval(vInterval3);
				} else {
					img.style.left = left() + 40 + "px";
				}
			}, 10);
		} /*else if(average > 0) {
			var initialLeft = left();
			vInterval4 = window.setInterval(function() {
				if(left() - 20 * (initialLeft / left()) <= -1920) {
					img.style.left = -1920 + "px";
					clearInterval(vInterval4);
				} else {
					img.style.left = left() - 20 * (initialLeft / left()) + "px";
				}
			}, 10);
		}*/
	}
	img.onmousemove = function(ev) {}
}