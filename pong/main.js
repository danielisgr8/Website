var pre = document.getElementsByTagName("pre")[0];
function Paddle() {
	this.size = 10;
	this.top = 19;
	this.bottom = 28;
	this.move = function(direction) {
		if(direction == "up") {
			if(this.top != 0) {
				for(var i = this.top; i <= this.bottom; i++) {
					if(i == this.top) {
						point("==", 0, i - 1);
					} else if(i == this.bottom) {
						point("==", 0, i - 1);
						point("  ", 0, i);
					} else {
						point("||", 0, i - 1);
					}
				}
				this.top--;
				this.bottom--;
			}
		} else if(direction == "down") {
			if(this.bottom != 47) {
				for(var i = this.top; i <= this.bottom; i++) {
					if(i == this.top) {
						point("==", 0, i + 1);
						point("  ", 0, i);
					} else if(i == this.bottom) {
						point("==", 0, i + 1);
					} else {
						point("||", 0, i + 1);
					}
				}
				this.top++;
				this.bottom++;
			}
		}
	}
}
var paddle1 = new Paddle();
function Ball() {
	this.x = 74;
	this.y = 23;
	this.slope = 0;
	this.xVelocity = -1;
	this.yVelocity = 1;
	this.moveInterval;
	var me = this;
	this.start = function() {
		this.moveInterval = window.setInterval(function() {
			if(me.y + me.yVelocity < 0 || me.y + me.yVelocity > 47) {
				me.yVelocity = -me.yVelocity;
				console.log("changed yVelocity");
			}
			if(me.y >= paddle1.top && me.y <= paddle1.bottom && me.x + me.xVelocity <= 1) {
				me.xVelocity = -me.xVelocity;
				console.log("changed xVelocity");
			} else if(me.x + me.xVelocity <= 1) {
				clearInterval(me.moveInterval);
			}
			point("O", me.x + me.xVelocity, me.y + me.yVelocity);
			if(me.x == 74 || me.x == 75) {
				point("|", me.x, me.y);
			} else {
				point(" ", me.x, me.y);
			}
			me.x += me.xVelocity;
			me.y += me.yVelocity;
		}, 50);
	}
}
var ball = new Ball();
document.onkeydown = function(e) {
	if(e.keyCode == 38) {
		paddle1.move("up");
	} else if(e.keyCode == 40) {
		paddle1.move("down");
	}
}
var start = document.getElementsByClassName("start")[0];
start.onclick = function(e) {
	ball.start();
}
function point(string, x, y) {
	coord = 157 + x + 155 * y
	pre.innerHTML = pre.innerHTML.replaceAt(coord, string);
}
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}