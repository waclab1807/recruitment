app.controller('MainCtrl', ['$scope', '$http', 'notify', '$location', function($scope, $http, notify, $location) {

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

}]);