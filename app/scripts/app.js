'use strict';

/**
 * @ngdoc overview
 * @name spiritBreaker226GitHubPageApp
 * @description
 * # spiritBreaker226GitHubPageApp
 *
 * Main module of the application.
 */
angular
  .module('spiritBreaker226GitHubPageApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
