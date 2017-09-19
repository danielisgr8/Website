var pre = document.getElementsByTagName("pre")[0];
pre.innerHTML = "";

var Game = {};
Game.state = 0; // 0 = not generated, not started, 1 = generated, not started, 2 = generated, started
Game.firstClick = true;
Game.width;
Game.height;

var regex = /x\d+y\d+/;
var regexX = /x\d+/;
var regexY = /y\d+/;

Game.createBoard = function() {
	Game.state = 1;
	var add = "";
	for(var i = 0; i < Game.width; i++) {
		add += " ___";
	}
	add += "\n";
	for(var i = 0; i < Game.height; i++) {
		for(var j = 0; j < Game.width; j++) {
			add += "|<span class=\"x" + j + "y" + i + "\">   </span>";
		}
		add += "|\n";
		for(var j = 0; j < Game.width; j++) {
			add += "|<span class=\"x" + j + "y" + i + "\">___</span>";
		}
		add += "|\n";
	}
	pre.innerHTML += add;
}

Game.start = function() {
	if(Game.state == 1) {
		Game.state = 2;
		Game.firstClick = true;
		for(var i = 0; i < Game.width; i++) {
			for(var j = 0; j < Game.height; j++) {
				var random = Math.random();
				var element = document.getElementsByClassName("x" + i + "y" + j);
				if(random < .25) {
					element[0].className += " m";
					element[0].innerHTML = "   ";
					element[1].className += " m";
				} else {
					element[0].className += " b";
					element[0].innerHTML = "   ";
					element[1].className += " b";
				}
			}
		}
	}
}

Game.getArea = function(start) {
	if(Game.state == 2) {
		var searching = true;
		var type;
		if(start.className.includes("m")) {
			type = "m";
		} else {
			type = "b";
		}
		var startX = parseInt(regexX.exec(start.className)[0].slice(1), 10);
		var startY = parseInt(regexY.exec(start.className)[0].slice(1), 10);
		var start = document.getElementsByClassName("x" + startX + "y" + startY)[0];
		var area = [start];
		var outer = [start];
		while(searching) {
			var length = outer.length;
			for(var foo = 0; foo < length; foo++) {
				var x = parseInt(regexX.exec(outer[foo].className)[0].slice(1), 10);
				var y = parseInt(regexY.exec(outer[foo].className)[0].slice(1), 10);
				var coordsX = [-1, 1, 0, 0];
				var coordsY = [0, 0, -1, 1];
				for(var i = 0; i < coordsX.length; i++) {
					if(x + coordsX[i] >= 0 && x + coordsX[i] < Game.width && y + coordsY[i] >= 0 && y + coordsY[i] < Game.height) {
						var element = document.getElementsByClassName("x" + (x + coordsX[i]) + "y"  + (y + coordsY[i]))[0];
						if(element.className.includes(type) && !area.includes(element)) {
							area.push(element);
							outer.push(element);
						}
					}
				}
			}
			if(outer.length == length) {
				searching = false;
			} else {
				outer.slice(length);
			}
		}
		return area.length;
	}
}

Game.getMineCount = function(element) {
	if(Game.state == 2 && element.className.includes("b")) {
		var mineCount = 0;
		var x = parseInt(regexX.exec(element.className)[0].slice(1), 10);
		var y = parseInt(regexY.exec(element.className)[0].slice(1), 10);
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				if(x + i >= 0 && x + i < Game.width && y + j >= 0 && y + j < Game.height) {
					if(document.getElementsByClassName("x" + (x + i) + "y"  + (y + j))[0].className.includes("m")) {
						mineCount++;
					}
				}
			}
		}
		return mineCount;
	}
}

var heightInput = document.getElementsByTagName("input")[0];
var widthInput = document.getElementsByTagName("input")[1];
var submit = document.getElementsByClassName("submit")[0];
var start = document.getElementsByClassName("start")[0];

submit.onclick = function(e) {
	Game.height = heightInput.value;
	Game.width = widthInput.value;
	pre.innerHTML = "";
	Game.createBoard();
}

start.onclick = function(e) {
	Game.start();
}

pre.onclick = function(e) {
	if(e.target !== e.currentTarget) {
		var clickedItem = e.target;
		if(Game.firstClick) {
			if(clickedItem.className.includes("m")) {
				clickedItem.className = clickedItem.className.replace("m", "b");
			}
			var finalArea = 5 + 10 * Math.random();
			var changes = 0;
			var startX = parseInt(regexX.exec(clickedItem.className)[0].slice(1), 10);
			var startY = parseInt(regexY.exec(clickedItem.className)[0].slice(1), 10);
			var start = document.getElementsByClassName("x" + startX + "y" + startY)[0];
			var area = [start];
			while(changes < Math.floor(finalArea)) {
				var chosen = area[Math.floor(area.length * Math.random())];
				var x = parseInt(regexX.exec(chosen.className)[0].slice(1), 10);
				var y = parseInt(regexY.exec(chosen.className)[0].slice(1), 10);
				var coordsX = [-1, 1, 0, 0];
				var coordsY = [0, 0, -1, 1];
				for(var i = 0; i < coordsX.length; i++) {
					if(x + coordsX[i] >= 0 && x + coordsX[i] < Game.width && y + coordsY[i] >= 0 && y + coordsY[i] < Game.height) {
						var element = document.getElementsByClassName("x" + (x + coordsX[i]) + "y"  + (y + coordsY[i]))[0];
						if(!area.includes(element)) {
							if(element.className.includes("m")) {
								element.className = element.className.replace("m", "b");
							}
							area.push(element);
							changes++;
							i = coordsX.length;
						}
					}
				}
			}
			for(var i = 0; i < area.length; i++) {
				document.getElementsByClassName(area[i].className)[0].innerHTML = " " + Game.getMineCount(area[i]) + " ";
			}
			Game.firstClick = false;
		}
		if(clickedItem.className.includes("b")) {
			document.getElementsByClassName(clickedItem.className)[0].innerHTML = " " + Game.getMineCount(clickedItem) + " ";
		} else {
			pre.innerHTML = "GAME OVER";
		}
	}
	e.stopPropagation();
}

pre.oncontextmenu = function(e) {
	if(e.target !== e.currentTarget) {
		var clickedItem = e.target;
		document.getElementsByClassName(clickedItem.className)[0].innerHTML = " F ";
	}
	e.stopPropagation();
	return false;
}

/* on click:
make clicked element blank (not a mine)
create area variable that is random (within a range)
var changes = 0;
while(changes < area):
choose random outer element (first iteration it will always be element originally clicked) and move it in a direction (unless that moves it to an already affected element) and make that blank (similar to area finding function)
changes++
*/
