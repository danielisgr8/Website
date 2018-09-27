const repos = Array.from(document.getElementsByClassName("reposList_repo"));
repos.forEach((repo) => {
    repo.style.fontSize = getCSSProperty(repo, "font-size");
    console.log("did it");
    repo.onmouseenter = (e) => {
        var el = e.currentTarget;
        if (el.decreaseInterval) {
            clearInterval(el.decreaseInterval);
        }
        el.increaseInterval = setInterval(() => {
            const fontSize = parseInt(el.style.fontSize, 10);
            const newFontSize = fontSize + getFontSizeChange(fontSize);
            if (newFontSize >= 24) {
                clearInterval(el.increaseInterval);
                el.style.fontSize = "24px";
                el.increaseInterval = null;
            } else {
                el.style.fontSize = newFontSize + "px";
            }
        }, 50);
    };

    repo.onmouseleave = (e) => {
        var el = e.currentTarget;
        if (el.increaseInterval) {
            clearInterval(el.increaseInterval);
        }
        el.decreaseInterval = setInterval(() => {
            const fontSize = parseInt(el.style.fontSize, 10);
            const newFontSize = fontSize - getFontSizeChange(fontSize);
            if (newFontSize <= 16) {
                clearInterval(el.decreaseInterval);
                el.style.fontSize = "16px";
                el.decreaseInterval = null;
            } else {
                el.style.fontSize = newFontSize + "px";
            }
        }, 50);
    };
});

function getFontSizeChange(oldFontSize) {
	return (28 - oldFontSize) / 3;
}

function getCSSProperty(element, property) {
    return getComputedStyle(element).getPropertyValue(property);
}

// TODO: handle quick mouse over (increase a little after mouse leave, decrease after)