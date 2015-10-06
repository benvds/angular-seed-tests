'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	console.log('$routeProvider:', $routeProvider);
	debugger
	
	$routeProvider.when('/view1', {
		templateUrl: 'view1/view1.html',
		controller: 'View1Ctrl'
	});
}])
.controller('View1Ctrl', ['$scope', 'OptionService', function($scope, OptionService) {
	// var options  = [
	// 	{ id: 1, label: "one"},
	// 	{ id: 2, label: "two"},
	// 	{ id: 3, label: "three"}
	// ];

	function next() {
		var lastId = _.last($scope.vm.choice).id;
		var curIndex = _.findIndex($scope.options, function(option) {
			return option.id === lastId;
		});

		$scope.vm.choice = [$scope.options[curIndex + 1]];
	}

	function hasOneChoice() {
		return $scope.vm.choice && $scope.vm.choice.length === 1;
	}

	function hasNextOption() {
		return _.any($scope.vm.choice) &&
		_.first($scope.vm.choice).id !== _.last(_.pluck($scope.options, 'id'));
	}

	function getOptions(search) {
		return OptionService
		.get(search)
		.then(function(options) {
			$scope.options = options;
		})
	}

	$scope.vm = { 
		choice: undefined
	};

	$scope.getOptions = getOptions;
	$scope.options = [];
	$scope.next = next;

	$scope.$watch('vm.choice', function watchChoice(current, old) {
		$scope.canSelectNextOption = hasOneChoice() && hasNextOption();
		$scope.hasOneChoice = hasOneChoice();
	}, true);
	// $scope.hasNextOption = hasNextOption;

}]);