'use strict';

app.controller('TableCtrl', ['$scope', '$http', '$filter', 'notify', 'localStorageService', function($scope, $http, $filter, notify, localStorageService) {

    $scope.users = [];
    $scope.loader = true;                   // turn on spinner
    $scope.sortType = 'id';                 // set the default sort type
    $scope.sortReverse = false;             // set the default sort order
    $scope.searchField = '';                // set the default search/filter term
    $scope.range = localStorageService.get('range') || 5;               // set default number of items on single table page
    $scope.startPoint = 0;                  // default index of first showed elem in table
    $scope.endPoint = $scope.range;         // default index of last showed elem in table
    $scope.currentPage = 1;                 // set default page in table

    /**
     * get users list from API
     */
    $http.get("http://jsonplaceholder.typicode.com/users")
        .then(function(response) {
            // set users list
            $scope.users = response.data;
            // calculate users list length
            $scope.usersLength = $scope.users.length;
            // generate new pages list under table
            $scope.generatePages();
            // turn off loader
            $scope.loader = false;
        }).catch(function (data) {
            // handle error
            var msg = '<span>Przepraszamy, wystąpił problem z pobraniem danych, spróbuj ponownie, bądź skontaktuj się z administratorem strony.</span>';
            notify({messageTemplate: msg, classes: 'alert alert-danger'});
        // turn off loader
            $scope.loader = false;
        });

    /**
     * method for switching pages from list below table
     * @param page to switch into
     */
    $scope.switchPage = function (page) {
        if (page > $scope.currentPage) {
            $scope.startPoint = Number($scope.startPoint) + Number($scope.range*(page-$scope.currentPage));
            $scope.endPoint = Number($scope.endPoint) + Number($scope.range*(page-$scope.currentPage));
        } else {
            $scope.startPoint = Number($scope.startPoint) - Number($scope.range*($scope.currentPage-page));
            $scope.endPoint = Number($scope.endPoint) - Number($scope.range*($scope.currentPage-page));
        }
        $scope.currentPage = page;
    };

    /**
     * called when search field is being used
     * recalculates pages array
     */
    $scope.search = function () {
        // recalculate users list length after filtering with search value
        $scope.usersLength = $filter("filter")($scope.users, $scope.searchField).length;

        // generate new pages list under table
        $scope.generatePages();
    };

    /**
     * method for switching page in table to the next one
     */
    $scope.next = function () {
        $scope.startPoint = Number($scope.startPoint) + Number($scope.range);
        $scope.endPoint = Number($scope.endPoint) + Number($scope.range);
        $scope.currentPage++;
    };

    /**
     * method for switching page in table to the previous one
     */
    $scope.prev = function () {
        $scope.startPoint = Number($scope.startPoint) - Number($scope.range);
        $scope.endPoint = Number($scope.endPoint) - Number($scope.range);
        $scope.currentPage--;
    };

    /**
     * method for sorting specific columns
     * @param type to sort by
     */
    $scope.changeSortType = function (type) {
        $scope.sortType = type;
        $scope.sortReverse = !$scope.sortReverse;
    };

    /**
     * method for generating list of
     * pages with data
     */
    $scope.generatePages = function () {
        $scope.pages = [];
        for (var i=0; i< ($scope.usersLength / $scope.range); i++) {
            $scope.pages.push(i + 1);
        }
    };

    /**
     * watch for changing values on page count
     */
    $scope.$watch('range', function() {
        localStorageService.set('range', $scope.range);

        // set starting & ending point
        $scope.startPoint = 0;
        $scope.endPoint = $scope.startPoint + Number($scope.range);

        // generate new pages list under table
        $scope.generatePages();
    });
}]);