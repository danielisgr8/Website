var input = document.getElementsByTagName("input")[0];
var answer = document.getElementsByClassName("answer")[0];
var letters = ["I", "V", "X", "L", "C", "D", "M"];
var numbers = [1, 5, 10, 50, 100, 500, 1000];
function ltn(letter) {
	return numbers[letters.indexOf(letter)];
}
String.prototype.toRomanNumerals = function() {
	if(this.length > 1) {
		var total = 0;
		for(var i = 0; i < this.length; i++) {
			if(i <= this.length - 2) {
				if(ltn(this[i]) < ltn(this[i + 1])) {
					total += ltn(this[i + 1]) - ltn(this[i]);
					if(i <= this.length - 3) {
						i++;
					} else {
						i = this.length;
					}
				} else {
					total += ltn(this[i]);
				}
			} else {
				total += ltn(this[i]);
			}
		}
		return total
	} else {
		return ltn(this[0]);
	}
};
input.oninput = function(e) {
	var initialString = input.value.toUpperCase();
	var finalString = "";
	for(var i = 0; i < initialString.length; i++) {
		if(/I|V|X|L|C|D|M/.test(initialString[i])) {
			finalString += initialString[i];
		}
	}
	if(finalString.length != 0) {
		answer.innerHTML = finalString.toRomanNumerals();
	} else {
		answer.innerHTML = "";
	}
};