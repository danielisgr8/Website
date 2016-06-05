var input = document.getElementsByTagName("input")[0];
var p = document.getElementsByTagName("p")[0];
input.oninput = function(e) {
	p.innerHTML = input.value;
}
/*
"12"
if 1 < 2, subract 1 from 2
*/