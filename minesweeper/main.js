var pre = document.getElementsByTagName("pre")[0];
pre.innerHTML = "";
var Game = {};
Game.width = 10;
Game.height = 10;
Game.createBoard = function() {
	for(var i = 0; i < Game.width; i++) {
		pre.innerHTML += " ___";
	}
	pre.innerHTML += "\n";
	for(var i = 0; i < Game.height; i++) {
		for(var j = 0; j < Game.width; j++) {
			pre.innerHTML += "|<span>   </span>";
		}
		pre.innerHTML += "|\n";
		for(var j = 0; j < Game.width; j++) {
			pre.innerHTML += "|<span>___</span>";
		}
		pre.innerHTML += "|\n";
	}
}
var heightInput = document.getElementsByTagName("input")[0];
var widthInput = document.getElementsByTagName("input")[1];
var submit = document.getElementsByClassName("submit")[0];
submit.onclick = function(e) {
	Game.height = heightInput.value;
	Game.width = widthInput.value;
	pre.innerHTML = "";
	Game.createBoard();
}
