(function() {
  'use strict';

  angular
    .module('app')
    .directive('propString', StringDirective);

  StringDirective.$inject = [
    '$parse'
  ];

  function StringDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      template    : templateFunction,
      link        : linkFunction,
    };
    return directive;

    function templateFunction($element, $attrs) {
      return '<input class="form-control" ng-change="doChange()" ng-model="value" type="text">';
    }

    function linkFunction($scope, $element, $attrs, $ctrl) {
      var model = $parse($attrs.ngModel)($scope);
      $scope.value = model.value;
      $scope.doChange = function() {
        model.value = $scope.value;
      };
    }
  }

})();