"use strict";angular.module("spiritBreaker226GitHubPageApp",["ngAnimate","ngResource","ngRoute","duScroll"]).config(function(){}).controller("mainCtrl",function(){}),angular.module("spiritBreaker226GitHubPageApp").directive("carouselFeature",function(){return{templateUrl:"views/templates/carouselFeature.html",restrict:"E"}}),angular.module("spiritBreaker226GitHubPageApp").directive("aboutMe",function(){return{templateUrl:"views/templates/aboutme.html",restrict:"E"}}),angular.module("spiritBreaker226GitHubPageApp").controller("PortfolioCtrl",["$scope","$http",function(a,b){var c=this;c.projects=[],this.hideProjectEndDate=function(a){return""===a},b.get("scripts/siteContentProjects.json").success(function(a){c.projects=a,c.numberOfProjects=Math.ceil(c.projects.length/4)+1,c.projectOrder="name"})}]).directive("portfolio",function(){return{templateUrl:"views/templates/portfolio.html",restrict:"E",controllerAs:"project"}}),angular.module("spiritBreaker226GitHubPageApp").directive("contact",function(){return{templateUrl:"views/templates/contact.html",restrict:"E"}});