"use strict";

var app = angular.module("spiritBreaker226GitHubPageApp");

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:contact
 * @description
 * # contact
 */
app
  .controller("ContactCtrl", function ($scope) {
    $scope.contactThankYouMesage = function () {
      angular
        .element("#contact-thank-you-message")
        .html("<p>Thank you, your question has been submitted</p>");
      angular.element("#contact-form-container").fadeOut({
        duration: 500,
      });
    };
  })
  .directive("contact", function () {
    return {
      templateUrl: "views/templates/contact.html",
      restrict: "E",
    };
  });
