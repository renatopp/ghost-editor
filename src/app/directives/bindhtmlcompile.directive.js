(function () {
  'use strict';

  angular
    .module('app')
    .directive('bindHtmlCompile', BindHtmlCompileDirective);

  BindHtmlCompileDirective.$inject = [
    '$compile'
  ];

  function BindHtmlCompileDirective($compile) {
    var directive = {
      restrict    : 'A',
      link        : link,
    };
    return directive;

    function link($scope, $element, $attrs) {
      $scope.$watch(function () {
          return $scope.$eval($attrs.bindHtmlCompile);
      }, function (value) {
          $element.html(value);
          $compile($element.contents())($scope);
      });
    }
  }
}());