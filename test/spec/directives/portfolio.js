'use strict';

describe('Add Projects To Directive: portfolio', function () {
  var element;
  var scope;

  // load the directive's module
  beforeEach(module('spiritBreaker226GitHubPageApp'));

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element(
      '<div class="col-md-3 col-xs-6">' + 
        '<div class="thumbnail">' + 
          '<div class="caption">' + 
            '<header class="projectHeader">' + 
              '<a href="javascript:void()"><img src="images/ProjectIcons/{{icon}}" alt="{{name}}" class="img-circle img-responsive">' + 
              '<h3>A Simple Chess Game (iOS)</h3></a>' + 
              '(<time datetime="{{projectStartDate}}">{{projectStartDate}}</time> - <time datetime="{{projectEndDate}}">{{projectEndDate}}</time>)' + 
            '</header>' + 
            '<span class="hidden-sm hidden-xs">{{summary}}</span>' + 
          '</div>' + 
        '</div>' + 
      '</div>' + 
      '<div class="col-md-3 col-xs-6">' + 
        '<div class="thumbnail">' + 
          '<div class="caption">' + 
            '<header class="projectHeader">' + 
              '<a href="javascript:void()"><img src="images/ProjectIcons/{{icon}}" alt="{{name}}" class="img-circle img-responsive">' + 
              '<h3>My Personal Site</h3></a>' + 
              '(<time datetime="{{projectStartDate}}">{{projectStartDate}}</time> - <time datetime="{{projectEndDate}}">{{projectEndDate}}</time>)' + 
            '</header>' + 
            '<span class="hidden-sm hidden-xs">{{summary}}</span>' + 
          '</div>' + 
        '</div>' + 
      '</div>'
      );

    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should add in the name of the project', inject(function () {
    var nameOfProjects = element.find('h3');

    expect(nameOfProjects.length).toBe(2);
    expect(nameOfProjects.eq(0).text()).toBe('A Simple Chess Game (iOS)');
    expect(nameOfProjects.eq(1).text()).toBe('My Personal Site');
  }));


  it('should bind the content', inject(function () {
    var contentOfProjects = element.find('img');

    expect(contentOfProjects.length).toBe(2);
    expect(contentOfProjects.eq(0).text()).toBe('A Simple Chess Game (iOS)');
    expect(contentOfProjects.eq(1).text()).toBe('My Personal Site');
  }));
});
