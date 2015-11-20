$(document).ready(function() {
	$(".upgradesHolder").hide();
	var boxes = [];
	var upgrades = [];
	var money = 0;
	$(".money").html("Money: " + money);
	var attack = 10;
	$(".attack").html("Attack: " + attack);
	function redOrBlue() {
		var color = Math.random();
		if(color < 0.5) {
			return "red";
		} else {
			return "blue";
		}
	}
	function upgrade(id, title, description, cost) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.cost = cost;
		this.createUpgrade = function() {
			$(".upgradesHolder").append("<div class=\"upgrade\" id=\"" + this.id + "\"></div>");
			$("#" + this.id + ".upgrade").append("<div class=\"infoHolder\" id=\"" + this.id + "\"></div>");
			$("#" + this.id + ".infoHolder").append("<p class=\"title\" id=\"" + this.id + "\">" + this.title + "</p>");
			$("#" + this.id + ".infoHolder").append("<p class=\"description\" id=\"" + this.id + "\">" + this.description + "</p>");
			$("#" + this.id + ".upgrade").append("<p class=\"cost\" id=\"" + this.id + "\">" + this.cost + "</p>");
		}
		this.createUpgrade();
	}
	function box(id, loseHealthRate, gainHealthRate, cooldownRate) {
		var me = this;
		this.id = id;
		this.health;
		this.gainInterval;
		this.cooldownInterval;
		this.loseHealthRate = loseHealthRate;
		this.gainHealthRate = gainHealthRate;
		this.cooldownRate = cooldownRate;
		this.resultValue = 0;
		this.onCooldown = false;
		this.now;
		this.before;
		this.color;
		this.createBox = function() {
			$(".boxHolder").append("<div class=\"box\" id=\"" + (this.id) + "\"></div>");
			this.color = redOrBlue();
			$("#" + (this.id)).css("background-color", this.color);
			if(this.color == "red") {
				$("#" + (this.id)).addClass("red");
			} else if(this.color == "blue") {
				$("#" + (this.id)).addClass("blue");
			}
		}
		this.createBox();
		this.health = parseInt($("#" + (this.id)).css("width"), 10);
		this.loseHealth = function(color) {
			var box = "#" + this.id;
			if(parseInt($(box).css("width"), 10) >= this.loseHealthRate && parseInt($(box).css("border-right-width"), 10) <= (100 - this.loseHealthRate)) {
				var width = parseInt($(box).css("width"), 10) - this.loseHealthRate;
				var borderWidth = parseInt($(box).css("border-right-width"), 10) + this.loseHealthRate;
				$(box).css("border-right", borderWidth + "px" + " solid " + color);
				$(box).css("width", width + "px");
			} else if(parseInt($(box).css("width"), 10) < this.loseHealthRate && parseInt($(box).css("border-right-width"), 10) > (100 - this.loseHealthRate)) {
				$(box).css("border-right", 100 + "px" + " solid " + color);
				$(box).css("width", 0 + "px");
			}
		}
		this.gainHealth = function() {
			var box = "#" + this.id;
			this.before = new Date();
			this.gainInterval = window.setInterval(function() {
				me.now = new Date();
				var a = me.gainHealthRate;
				var elapsedTime = (me.now.getTime() - me.before.getTime());
				if(elapsedTime > 100) {
					//Recover the motion lost while inactive.
					if(a * Math.floor(elapsedTime / 100) + parseInt($(box).css("width"), 10) > 100) {
						$(box).css("border-right-width", 0 + "px");
						$(box).css("width", 100 + "px");
						window.clearInterval(me.gainInterval);
					} else {
						a = a * Math.floor(elapsedTime / 100);
						$(box).css("border-right-width", parseInt($(box).css("border-right-width"), 10) - a + "px");
						$(box).css("width", parseInt($(box).css("width"), 10) + a + "px");
						if(parseInt($(box).css("width"), 10) >= 100) {
							window.clearInterval(me.gainInterval);
						}
					}
				} else {
					$(box).css("border-right-width", parseInt($(box).css("border-right-width"), 10) - a + "px");
					$(box).css("width", parseInt($(box).css("width"), 10) + a + "px");
					if(parseInt($(box).css("width"), 10) >= 100) {
						window.clearInterval(me.gainInterval);
					}
				}
				me.before = new Date();
			}, 100);
		}
		this.cooldown = function() {
			var box = "#" + this.id;
			this.before = new Date();
			$(box).css("border-left", 0 + "px solid " + "#800000");
			this.cooldownInterval = window.setInterval(function() {
				me.now = new Date();
				var a = me.cooldownRate;
				var elapsedTime = (me.now.getTime() - me.before.getTime());
				me.onCooldown = true;
				if(elapsedTime > 100) {
					if(a * Math.floor(elapsedTime / 100) + parseInt($(box).css("border-left-width"), 10) > 100) {
						$(box).css("border-left-width", 0 + "px");
						$(box).css("border-right-width", 0 + "px");
						$(box).css("width", 100 + "px");
						me.onCooldown = false;
						window.clearInterval(me.cooldownInterval);
					} else {
						a = a * Math.floor(elapsedTime / 100);
						$(box).css("border-right-width", parseInt($(box).css("border-right-width"), 10) - a + "px");
						$(box).css("border-left-width", parseInt($(box).css("border-left-width"), 10) + a + "px");
						if(parseInt($(box).css("border-left-width"), 10) == 100) {
							$(box).css("border-left-width", 0 + "px");
							$(box).css("width", 100 + "px");
							me.onCooldown = false;
							window.clearInterval(me.cooldownInterval);
						}
					}
				} else {
					$(box).css("border-right-width", parseInt($(box).css("border-right-width"), 10) - me.cooldownRate + "px");
					$(box).css("border-left-width", parseInt($(box).css("border-left-width"), 10) + me.cooldownRate + "px");
					if(parseInt($(box).css("border-left-width"), 10) == 100) {
						$(box).css("border-left-width", 0 + "px");
						$(box).css("width", 100 + "px");
						me.onCooldown = false;
						window.clearInterval(me.cooldownInterval);
					}
				}
				me.before = new Date();
			}, 100);
		}
	}
	for(var i = 0; i < 192; i++) {
		boxes[i] = new box(i + 1, 10, 1, 10);
	}
	$(".box").click(function() {
		var boxId = parseInt($(this).attr("id"), 10);	
		if($(this).attr("class").includes("red") && !boxes[boxId - 1].onCooldown) {
			boxes[boxId - 1].loseHealth("black");
			window.clearInterval(boxes[boxId - 1].gainInterval);
			if(parseInt($(this).css("width"), 10) != 0) {
				boxes[boxId - 1].gainHealth();
			} else {
				boxes[boxId - 1].cooldown();
			}
		} else if ($(this).attr("class").includes("blue")) {
			money++;
			$(".money").html("Money: " + money);
		}
	});
	$(".dropDown").click(function() {
		$(".upgradesHolder").slideToggle();
	});
	for(var i = 0; i < 10; i++) {
		upgrades[i] = new upgrade(i + 1, "Title", "Desription", "Cost");
	}
	if(localStorage.getItem("cat") == null) {
		var cat = "";
		for(var i = 0; i < boxes.length; i++) {
			if(boxes[i].color == "red") {
				cat += "R";
			} else if(boxes[i].color == "blue") {
				cat += "B";
			}
		}
		console.log("created");
	} else {
		var cat = localStorage.getItem("cat");
	}
	localStorage.setItem("cat", cat);
	$(".add").click(function() {
		cat++;
		localStorage.setItem("cat", cat);
		console.log(localStorage.getItem("cat"));
	});
	$(".subtract").click(function() {
		cat--;
		localStorage.setItem("cat", cat);
		console.log(localStorage.getItem("cat"));
	});
	console.log(localStorage.getItem("cat"));
});

/* IDEAS
Click button to increase health of boxes (get some other currency in return?)
Somehow differentiate health and width since they'll eventually have different values
*/
