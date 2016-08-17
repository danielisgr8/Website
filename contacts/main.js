var first = new Date(2016, 6, 5);
var ul = document.getElementsByTagName("ul")[0];
function addDates() {
	for(var i = 0; i < 10; i++) {
		var next = first;
		next.setDate(next.getDate() + 14);
		ul.innerHTML += "<li>" + next.toDateString() + "</li>";
		if(i == 9) {
			first = next;
		}
	}
}
addDates();
var more = document.getElementsByTagName("button")[0];
more.onclick = function(e) {
	addDates();
}
ul.onmouseover = function(e) {
	if(e.target != e.currentTarget) {
		var li = e.target;
		li.innerHTML += " X";
		li.onmouseleave = function(e) {
			li.innerHTML = li.innerHTML.slice(0, li.innerHTML.length - 2);
		}
	}
	e.stopPropagation();
}
ul.onclick = function(e) {
	if(e.target != e.currentTarget) {
		ul.removeChild(e.target);
	}
	e.stopPropagation();
}