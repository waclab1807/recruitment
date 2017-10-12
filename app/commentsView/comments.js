'use strict';

app.controller('CommentsCtrl', ['$scope', '$http', 'notify', function($scope, $http, notify) {
    $scope.comments = [];
    $scope.loader = true;   // turn on spinner
    $scope.limitNr = 10;    // set default limit for comments

    /**
     * get comments from API
     * @param start range id
     * @param end range id
     */
    $scope.getComments = function (start, end) {
        // turn on spinner
        $scope.loader = true;
        $http.get("http://jsonplaceholder.typicode.com/comments?id_gte=" + start + "&id_lte=" + end)
            .then(function(response) {
                // check if all comments were downloaded
                if (response.data.length == 0) {
                    // disable 'load more' button
                    $scope.allCommentsDownloaded = true;
                    notify({message: 'Nie ma więcej komentarzy', classes: 'alert alert-info'});
                }
                // set comments list
                for (var i=0; i < response.data.length; i++) {
                    $scope.comments.push(response.data[i]);
                }
                // turn off loader
                $scope.loader = false;
            }).catch(function (data) {
            // handle error
            var msg = '<span>Przepraszamy, wystąpił problem z pobraniem komentarzy, spróbuj ponownie, bądź skontaktuj się z administratorem strony.</span>';
            notify({messageTemplate: msg, classes: 'alert alert-danger'});
            // turn off loader
            $scope.loader = false;
        });
    };

    /**
     * method for loading more comments
     */
    $scope.loadMore = function() {
        $scope.getComments($scope.limitNr + 1, $scope.limitNr + 10);
        $scope.limitNr += 10;
    };
}]);