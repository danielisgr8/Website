var pre = document.getElementsByTagName("pre")[0];
var Game = {};
Game.state = 0;
Game.initial = pre.innerHTML;
var botInterval;
function Paddle(id) {
	if(id == 1) {
		this.offset = 0;
	} else if(id == 2) {
		this.offset = 148;
	}
	this.size = 10;
	this.top = 19;
	this.bottom = 28;
	this.move = function(direction) {
		if(direction == "up") {
			if(this.top != 0) {
				for(var i = this.top; i <= this.bottom; i++) {
					if(i == this.top) {
						point("==", 0 + this.offset, i - 1);
					} else if(i == this.bottom) {
						point("==", 0 + this.offset, i - 1);
						point("  ", 0 + this.offset, i);
					} else {
						point("||", 0 + this.offset, i - 1);
					}
				}
				this.top--;
				this.bottom--;
			}
		} else if(direction == "down") {
			if(this.bottom != 47) {
				for(var i = this.top; i <= this.bottom; i++) {
					if(i == this.top) {
						point("==", 0 + this.offset, i + 1);
						point("  ", 0 + this.offset, i);
					} else if(i == this.bottom) {
						point("==", 0 + this.offset, i + 1);
					} else {
						point("||", 0 + this.offset, i + 1);
					}
				}
				this.top++;
				this.bottom++;
			}
		}
	}
}
var playerPaddle = new Paddle(1);
var botPaddle = new Paddle(2);
function Ball() {
	this.x = 74;
	this.y = 23;
	this.xVelocity = -1; // negative = left, positive = right
	this.yVelocity = -1; // negative = up, positive = down
	this.moveInterval;
	var me = this;
	this.start = function() {
		if(this.x != 74 || this.y != 23) {
			window.clearInterval(this.moveInterval);
			this.x = 74;
			this.xVelocity = -1;
			this.y = 23;
			this.yVelocity = -1;
			pre.innerHTML = Game.initial;
			playerPaddle.top = 19;
			playerPaddle.bottom = 28;
		}
		this.moveInterval = window.setInterval(function() {
			if(me.y + me.yVelocity < 0 || me.y + me.yVelocity > 47) {
				me.yVelocity = -me.yVelocity;
			}
			if(me.y >= playerPaddle.top && me.y <= playerPaddle.bottom && me.x + me.xVelocity <= 1) {
				me.xVelocity = -me.xVelocity;
			} else if(me.y >= botPaddle.top && me.y <= botPaddle.bottom && me.x + me.xVelocity >= 148) {
				me.xVelocity = -me.xVelocity;
			} else if(me.x + me.xVelocity <= 1 || me.x + me.xVelocity >= 148) { // Game over
				clearInterval(me.moveInterval);
				clearInterval(botInterval);
				Game.state = 0;
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
// Player movement
document.onkeydown = function(e) {
	if(Game.state == 1) {
		if(e.keyCode == 38) {
			playerPaddle.move("up");
		} else if(e.keyCode == 40) {
			playerPaddle.move("down");
		}
	}
}
var start = document.getElementsByClassName("start")[0];
start.onclick = function(e) {
	ball.start();
	// Bot movement
	botInterval = window.setInterval(function() {
		if(ball.xVelocity > 0) {
			var targetY = botPaddle.top + 4;
			if(ball.y < targetY) {
				botPaddle.move("up");
			} else if(ball.y > targetY) {
				botPaddle.move("down");
			}
		}
	}, 50);
	Game.state = 1;
}
function point(string, x, y) {
	coord = 157 + x + 155 * y
	pre.innerHTML = pre.innerHTML.replaceAt(coord, string);
}
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}