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
  	var data = {
		    labels: [
		    	'Ruby on Rails',
		    	'Ruby',
		    	'PHP',
					'C#',
					'Objective-C',
					'JavaScript',
					'jQuery',
		    	'AngularJS',
		    	'ReactJS',
		    	'Flux',
		    	'AJAX', 
		    	'JSON',
		    	'HTML5',
		    	'CSS3',
		    	'Sass',
		    	'Cordova / Phonegap',
					'Bootstrap',
					'Foundation',
		    	'SQL',
		    	'MS SQL', 
		    	'mySQL', 
		    	'SQLite', 
		    	'PostgreSQL',
		    	'Git'
		    ],
		    datasets: [
		        {
		            label: 'Skill Set',
		            fillColor: 'rgb(170, 15, 19)',
		            highlightFill: 'rgba(170, 15, 19, 0.75)',
		            highlightStroke: 'rgba(170, 15, 19, 1)',
		            data: [
		            	8.5,
		            	8.5,
		            	7.5,
		            	7.5,
		            	6,
		            	8,
		            	7.5,
		            	6.5,
		            	6,
		            	5.5,
		            	8,
		            	7,
		            	8,
		            	8,
		            	6,
									7.5,
		            	7.5,
									6.5,
		            	7.8,
		            	7.5,
		            	7.5,
		            	6.8,
		            	6.5,
		            	9
		            ]
		        }
		    ]
		};

		var options = {
			responsive: true,
			scaleShowVerticalLines: false,
			scaleFontSize: 12,
    	scaleFontColor: '#FFF',
    	scaleGridLineColor: '#FFF',
    	tooltipFillColor: 'rgba(97, 101, 104, 0.8)'
		};

  	 $scope.chart = new Chart(document.getElementById('chartContainer').getContext('2d')).Bar(data, options);

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
