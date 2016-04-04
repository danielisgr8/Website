var vi = 5, vf = 5, x = 0, a = 0;
var box = document.getElementsByClassName("box")[0];
box.style.left = 500 + "px";
function getLeft() {
	return parseInt(box.style.left, 10);
}
var interval = window.setInterval(function() {
	vf = vi + a;
	box.style.left = x + vf * .5 + "px";
	x = getLeft();
	a = -(x - 500) * .001;
	vi = vf;
}, 10);