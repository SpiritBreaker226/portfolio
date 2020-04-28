"use strict";

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:viewButtons
 * @description
 * # viewButtons
 */
angular
  .module("spiritBreaker226GitHubPageApp")
  .directive("viewButtons", function () {
    return {
      templateUrl: "views/templates/viewbuttons.html",
      restrict: "E",
    };
  });
