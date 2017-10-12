app.config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider', function($locationProvider, $routeProvider, localStorageServiceProvider) {
	$locationProvider.hashPrefix('!');

	// configure routes
	$routeProvider
		.when('/commentsView', {
			templateUrl: 'commentsView/comments.html',
			controller: 'CommentsCtrl'
		})
		.when('/chartView', {
			templateUrl: 'chartView/charts.html',
			controller: 'ChartCtrl'
		})
		.when('/tableView', {
			templateUrl: 'tableView/table.html',
			controller: 'TableCtrl'
		})
		.when('/formView', {
			templateUrl: 'formView/form.html',
			controller: 'FormCtrl'
		});

	$routeProvider.otherwise({redirectTo: '/commentsView'});

	// set prefix for Local Storage
	localStorageServiceProvider
		.setPrefix('angularJSapp');
}]);