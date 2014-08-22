'use strict';

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:banner
 * @description
 * # banner
 */
angular.module('spiritBreaker226GitHubPageApp')
  .directive('banner', function () {
    return {
      templateUrl: 'views/banners.html',
      restrict: 'E'
    };
  });
