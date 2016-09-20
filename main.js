var liList = document.getElementsByTagName("li");
for(var i = 0; i < liList.length; i++) {
	var li = liList[i];
	var a = document.createElement("a");
	a.href = "/" + li.id;
	a.textContent = li.textContent;
	li.textContent = "";
	li.appendChild(a);
}
