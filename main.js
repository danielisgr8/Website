var liList = document.getElementsByTagName("li");
var i;
for(i = 0; i < document.querySelector("ul").childElementCount; i++) {
	var li = liList[i];
	var a = document.createElement("a");
	a.href = "/" + li.id;
	a.textContent = li.textContent;
	a.id = "a" + i;
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
			if(el.style.fontSize >= "24px") {
				clearInterval(el.increaseInterval);
				el.style.fontSize = "24px";
				el.increaseInterval = null;
			} else {
				el.style.fontSize = (parseInt(el.style.fontSize, 10) + 2) + "px";
			}
		}, 50);
	}

	a.onmouseleave = (e) => {
		var el = e.currentTarget;
		if(el.increaseInterval) {
			clearInterval(el.increaseInterval);
		}
		e.currentTarget.decreaseInterval = setInterval(() => {
			if(el.style.fontSize <= "16px") {
				clearInterval(el.decreaseInterval);
				el.style.fontSize = "16px";
				el.increaseInterval = null;
			} else {
				el.style.fontSize = (parseInt(el.style.fontSize, 10) - 2) + "px";
			}
		}, 50);
	}
}

for(i; i < liList.length; i++) {
	var li = liList[i];
	var a = document.createElement("a");
	a.href = "https://github.com/danielisgr8/danielisgr8.github.io/tree/master/" + li.id;
	a.textContent = li.textContent;
	a.id = "a" + i;
	a.style.fontSize = "16px";
	li.textContent = "";
	li.className = "page";
	li.appendChild(a);
}
