var classApp = angular.module("classApp", []);
classApp.controller("subjects", ["$scope", function($scope) {
	$scope.subjectList = ["Computer Science", "Math", "Natural Science", "English"];
	var csList = [["COM S 101", "Orientation"], ["COM S 203", "Careers in Computer Science"]];
	var mathList = [["MATH 165", "Calculus I"], ["MATH 166", "Calculus II"]];
	var sciList = [["BIOL 211 & 211L", "Principles of Biology I and Laboratory"], ["BIOL 212 & 212L", "Principles of Biology II and Laboratory"]];
	var engList = [["ENGL 150", "Critical Thinking and Communication"], ["ENGL 250", "Written, Oral, Visual, and Electronic Composition"]];
	$scope.classList = [csList, mathList, sciList, engList];
	$scope.tab = 0;
	$scope.setTab = function(tab) {
		$scope.tab = tab;
	}
}]);