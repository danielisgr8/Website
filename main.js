var liList = document.getElementsByTagName("li");
for(var i = 0; i < liList.length; i++) {
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

function increase(id) {
	var li = document.getElementById(id);
}
