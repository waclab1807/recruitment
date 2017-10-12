'use strict';

app.controller('ChartCtrl', ['$scope', function($scope) {

  $scope.data = [];

  /**
   * generate fake data for chart
   */
  $scope.generateRandomData = function () {
    for (var i = 0; i < 5; i++) {

      var random = {
        name: $scope.makeRandomString(),
        y: Math.random()
      };

      $scope.data.push(random);
    }
  };

  /**
   * method generates random string
   * @returns {string}
   */
  $scope.makeRandomString = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var length = Math.floor((Math.random() * 10) + 4);

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  /**
   * config for chart (type, data, options...)
   */
  $scope.chartConfig = {
    chart: {
      type: 'pie',
      height: 600,
      width: 800
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Dane procentowe',
      data: $scope.data,
      id: 'data'
    }],
    title: {
      text: ''
    }
  }

}]);