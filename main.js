var liList = document.getElementsByTagName("li");
var i;
for(i = 0; i < liList.length; i++) {
	var li = liList[i];
	var a = document.createElement("a");
	if(i < document.querySelector("ul").childElementCount) {
		a.href = "/" + li.id;
	} else {
		a.href = "https://github.com/danielisgr8/danielisgr8.github.io/tree/master/" + li.id;
	}
	a.textContent = li.textContent;
	a.style.fontSize = "16px";
	li.textContent = "";
	li.className = "page";
	li.appendChild(a);

	a.onmouseenter = (e) => {
		var el = e.currentTarget;
		if(el.decreaseInterval) {
			clearInterval(el.decreaseInterval);
		}
		e.currentTarget.increaseInterval = setInterval(() => {
			const fontSize = parseInt(el.style.fontSize, 10);
			const newFontSize = fontSize + (28 - fontSize) / 4;
			if(newFontSize >= 24) {
				clearInterval(el.increaseInterval);
				el.style.fontSize = "24px";
				el.increaseInterval = null;
			} else {
				el.style.fontSize = newFontSize + "px";
			}
		}, 50);
	}

	a.onmouseleave = (e) => {
		var el = e.currentTarget;
		if(el.increaseInterval) {
			clearInterval(el.increaseInterval);
		}
		e.currentTarget.decreaseInterval = setInterval(() => {
			const fontSize = parseInt(el.style.fontSize, 10);
			const newFontSize = fontSize - (28 - fontSize) / 4;
			if(newFontSize <= 16) {
				clearInterval(el.decreaseInterval);
				el.style.fontSize = "16px";
				el.decreaseInterval = null;
			} else {
				el.style.fontSize = newFontSize + "px";
			}
		}, 50);
	}
}
