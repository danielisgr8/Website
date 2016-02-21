function gcs(element, property, parse) {
	var propertyValue = window.getComputedStyle(element).getPropertyValue(property);
	if(parse) {
		return parseInt(propertyValue, 10);
	} else {
		return propertyValue;
	}
}
var div = document.getElementById("imageHolder");
div.style.marginTop = .5 * document.body.clientHeight - .5 * (gcs(div, "height", true) + 2 * gcs(div, "border-width", true)) + "px";
div.style.marginBottom = .5 * document.body.clientHeight - .5 * (gcs(div, "height", true) + 2 * gcs(div, "border-width", true)) + "px";
var sites = document.getElementsByClassName("siteHolder");
for(var i = 0; i < sites.length; i++) {
	sites[i].onclick = function(e) {
		var id = this.id;
		if(id == "cellGame") {
			location.href = "danielisgr8.github.io/cellGame";
		} else if(id == "screensaver") {
			location.href = "danielisgr8.github.io/screensaver";
		} else if(id == "click") {
			location.href = "danielisgr8.github.io/click";
		}
	}
}