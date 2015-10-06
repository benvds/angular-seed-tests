'use strict';

describe('myApp.view1 module', function() {

    var $routeProvider = {
        when: _.noop
    };
    var scope;
    var controller;
    var OptionService;

    beforeEach(function() {

        // http://www.bradoncode.com/blog/2015/05/24/ngmock-fundamentals-angularjs-unit-testing/
        // http://www.bradoncode.com/blog/2015/05/27/ngmock-fundamentals-angularjs-testing-inject/

        // module('ngRoute'); // load original module, not necessary
        // angular.mock.module('ngRoute')
        // angular.mock.module('ui.router', [])
        // 	.value('$routeProvider', 'DI sucks');
        // angular.mock.module(function($provide) {
        // 	$provide.value('ui.router', []);
        // });

        angular.mock.module('myApp.view1', ['$provide', function($provide) {
            $provide.value('OptionService', OptionService);
            $provide.value('$routeProvider', $routeProvider);
        }]);

        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('View1Ctrl', { $scope: scope });
        });
    });

    describe('view1 controller', function() {

        it('should stub out the route provider', inject(function($routeProvider) {
            expect($routeProvider.$get).toEqual(undefined);
            expect($routeProvider.when).toEqual(_.noop);
        }));

        xit('starts with an empty view model', inject(function() {
            expect(scope.vm).toEqual({ choice: undefined });
        }));

        xit('starts with an empty options list', inject(function() {
            expect(scope.options).toEqual([]);
        }));
    });
});
