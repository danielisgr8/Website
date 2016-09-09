var div = document.createElement("div");
for(var i = 0; i < 10; i++) {
	var newDiv = div.cloneNode();
	newDiv.id = "div" + i;
	newDiv.style.cursor = "url(cursors/cursor" + i + ".png), auto";
	document.body.appendChild(newDiv);
}
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "test.png";
img.onload = function(e) {
	ctx.drawImage(img, 0, 0);
	console.log(ctx.getImageData(0, 0, 200, 200));
}