var pre = document.getElementsByTagName("pre")[0];
pre.innerHTML = "";
var Game = {};
Game.width = 10;
Game.height = 10;
Game.map = [[]];
Game.createBoard = function() {
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
pre.onclick = function(e) {
	if(e.target !== e.currentTarget) {
		var clickedItem = e.target.className;
		document.getElementsByClassName(clickedItem)[0].style.backgroundColor = "red";
		document.getElementsByClassName(clickedItem)[1].style.backgroundColor = "red";
	}
	e.stopPropagation();
}
pre.oncontextmenu = function(e) {
	if(e.target !== e.currentTarget) {
		var clickedItem = e.target.className;
		document.getElementsByClassName(clickedItem)[0].style.backgroundColor = "blue";
		document.getElementsByClassName(clickedItem)[1].style.backgroundColor = "blue";
	}
	e.stopPropagation();
	return false;
}