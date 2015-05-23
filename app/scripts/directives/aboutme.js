'use strict';

var app = angular.module('spiritBreaker226GitHubPageApp');

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:portfolio
 * @description
 * # portfolio
 */
app
  .controller('AboutMeCtrl', function($scope) {
  	 $scope.chart = new CanvasJS.Chart('chartContainer', {
        theme: 'theme2',
        backgroundColor: 'rgb(97, 101, 104)',
        axisY: {
					labelFontSize: 12,
					labelFontColor: '#FFF',
					gridColor: '#FFF',
					minimum: 0,
					maximum: 10
        },
        axisX: {
					labelFontSize: 12,
					labelFontColor: '#FFF'
        },
        data: [
	        {
	          type: 'bar',
	          color: '#aa0f13',
	          dataPoints: [
	            { label: 'Git', y: 9 },
	            { label: 'SQL', y: 7.8 },
	            { label: 'Bootstrap / Foundation', y: 7.5 },
							{ label: 'Cordova / Phonegap', y: 7.5 },
							{ label: 'HTML5 / CSS3', y: 8 },
							{ label: 'AngularJS', y: 6.5 },
	            { label: 'jQuery', y: 7.5 },
							{ label: 'JavaScript', y: 8.5 },
							{ label: 'C#', y: 7.5 },
							{ label: 'PHP', y: 7.5 },
							{ label: 'Ruby on Rails', y: 8 },
	          ]
	        }
        ]
    });

    $scope.chart.render(); //render the chart for the first time
            
    $scope.changeChartType = function(chartType) {
        $scope.chart.options.data[0].type = chartType;
        $scope.chart.render(); //re-render the chart to display the new layout
    };
  })
  .directive('aboutMe', function () {
    return {
      templateUrl: 'views/templates/aboutme.html',
      restrict: 'E'
    };
  });
