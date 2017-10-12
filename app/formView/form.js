'use strict';

app.controller('FormCtrl', ['$scope', '$http', '$filter', 'notify', 'localStorageService', function($scope, $http, $filter, notify, localStorageService) {

    $scope.todos = [];
    $scope.loader = true;    // turn on spinner

    /**
     * get todos from API (limited to 15)
     *
     * (temporary solution because of this API):
     * read todos from Local Storage if exists
     */
    if (localStorageService.get('todos')) {
        $scope.todos = localStorageService.get('todos');
        // turn off loader
        $scope.loader = false;
    } else {
        $http.get("http://jsonplaceholder.typicode.com/todos?_limit=15")
            .then(function (response) {
                // set comments list
                $scope.todos = response.data;
                localStorageService.set('todos', $scope.todos);
                // turn off loader
                $scope.loader = false;
            }).catch(function (data) {
            // handle error
            var msg = '<span>Przepraszamy, wystąpił problem z pobraniem listy zadań, spróbuj ponownie, bądź skontaktuj się z administratorem strony.</span>';
            notify({messageTemplate: msg, classes: 'alert alert-danger'});
            // turn off loader
            $scope.loader = false;
        });
    }

    // create form data template
    $scope.form = {
        id: 201,
        userId: 11,
        title: "",
        completed: false
    };

    /**
     * method for adding new todos
     * (fake adding because of jsonplaceholder api)
     */
    $scope.addTodo = function () {
        if (!$scope.form.title) {
            // show notification
            notify({message: 'Pole nie może być puste!', classes: 'alert alert-warning'});
            return;
        }

        // create object with all required data
        var obj = {
            userId: $scope.form.userId,
            id: $scope.form.id,
            title: $scope.form.title,
            completed: $scope.form.completed
        };

        // turn on loader
        $scope.loader = true;

        /**
         * send fake POST request to jsonplaceholder API
         * with new TODO
         */
        $http.post("http://jsonplaceholder.typicode.com/todos", obj)
            .then(function(response) {
                // show notification
                notify({message: 'Pomyślnie dodano nowe zadanie', classes: 'alert alert-success'});
                $scope.todos.push(obj);
                // save to Local Storage to make it look like not fake (temporary solution)
                localStorageService.set('todos', $scope.todos);
                // clear form
                $scope.form = {};
                // turn off loader
                $scope.loader = false;
            }).catch(function (data) {
                // handle error
                notify({message: 'Niestety nie udało się dodać zadania', classes: 'alert alert-danger'});
                // turn off loader
                $scope.loader = false;
            });
    }

}]);