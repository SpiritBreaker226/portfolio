'use strict';

describe('Directive: portfolio', function () {

  // load the directive's module
  beforeEach(module('spiritBreaker226GitHubPageApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<portfolio></portfolio>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('<h1>Portfolio</h1>');
  }));
});
