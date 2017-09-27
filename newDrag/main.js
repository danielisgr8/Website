const MAXARRLENGTH = 10;

const bg = document.getElementById("bg");

function add(arr, i) {
	if(arr.length == MAXARRLENGTH) {
		arr.shift();
	}
	arr.push(i);
}

function getStyleProperty(property) {
	return parseFloat(bg.style[property]);
}

function width() {
	return parseInt(getComputedStyle(bg).getPropertyValue("width"), 10);
}

function getOffset(leftVal) {
	if(leftVal > 0) {
		return leftVal;
	} else {
		return -width() / 2 - leftVal;
	}
}

bg.style.left = "0px";

let down = 0;
let xArr = [], yArr = [];
let xi, xf, origin;
let xInterval = null,
	nMoveInterval = null;
	transInterval = null,
	bounceInterval = null;

bg.onmousedown = (e) => {
	clearInterval(xInterval);
	clearInterval(transInterval);
	clearInterval(bounceInterval);

	down = 1;

	xArr = [];

	xi = e.clientX;
	origin = getStyleProperty("left");
}

// TODO: replace this with interval in mousedown so that zeroes can be tracked
bg.onmousemove = (e) => {
	if(down) {
		clearInterval(nMoveInterval);

		xf = e.clientX;
		xdif = xf - xi;

		let left = getStyleProperty("left");
		if(left <= 0 && left >= -width() / 2) {
			bg.style.left = (left + xdif) + "px";
			add(xArr, xdif);
		} else {
			let offset;
			if(left > 0) {
				offset = left;
			} else {
				offset = -width() / 2 - left;
			}
			bg.style.left = (left + 4 * xdif / offset) + "px";
		}

		xi = xf;

		nMoveInterval = setInterval(() => {
			add(xArr, 0);
		}, 100);
	}
}

bg.onmouseup = (e) => {
	down = 0;
	clearInterval(nMoveInterval);

	let left = getStyleProperty("left");
	if(left <= 0 && left >= -width() / 2) {
		let xvel = 0;
		for(let i = 0; i < xArr.length; i++) {
			xvel += xArr[i];
		}
		xvel /= xArr.length;

		if((origin >= -width() / 4 && left <= -width() / 4) ||
		   (xvel <= -20) ||
	       (origin <= -width() / 4 && left <= -width() / 4 && xvel < 20)) {
			xvel = xvel <= -20 ? xvel : -20;
		} else {
			xvel = xvel >= 20 ? xvel : 20;
		}

		transInterval = setInterval(() => {
			const newLeft = getStyleProperty("left") + xvel;

			if(xvel < 0 ? newLeft >= -width() / 2 : newLeft <= 0) {
				bg.style.left = newLeft + "px";
			} else {
				bg.style.left = xvel < 0 ? (-width() / 2) + "px" : "0px";
				clearInterval(transInterval);
			}
		}, 10);
	} else {
		let offset = getOffset(left), direction;
		if(left > 0) {
			direction = -1;
		} else {
			direction = 1;
		}

		bounceInterval = setInterval(() => {
			const newLeft = getStyleProperty("left") + direction * 10 * getOffset(getStyleProperty("left")) / offset;

			if(direction == -1 ? newLeft >= 1 : newLeft <= (-width() / 2) -1) {
				bg.style.left = newLeft + "px";
			} else {
				bg.style.left = direction == -1 ? "0px" : (-width() / 2) + "px";
				clearInterval(bounceInterval);
			}
		}, 10);
	}
}
