'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngSanitize',
  'ngRoute',
  'ui.select',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.config(['$routeProvider', 'uiSelectConfig', function($routeProvider, uiSelectConfig) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  uiSelectConfig.theme = 'bootstrap';
}])
.service('OptionService', ['$timeout', function($timeout) {
	function get() {
		var AMOUNT = 20;
		var TIMEOUT = 200;

		var options = _.map(new Array(AMOUNT), function() {
			var uniqueId = _.uniqueId();

			return { id: uniqueId, label: 'label - ' + uniqueId };
		});

		return $timeout(function() {
			return options;
		}, TIMEOUT);
	}

	console.log('initialized OptionService');

	return {
		get: get
	};
}])
;
