(function() {
  'use strict';

  angular
    .module('app')
    .directive('propText', TextDirective);

  TextDirective.$inject = ['$parse'];
  function TextDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      template    : templateFunction,
      link        : linkFunction,
    };
    return directive;

    function templateFunction($element, $attrs) {
      /* jshint -W043 */
      return '<textarea id="property-{{model.name}}"\
                        class="form-control" \
                        ng-change="doChange()" \
                        ng-model="value" \
                        ng-keydown="onKeydown($event)"><small></small>';
    }

    function linkFunction($scope, $element, $attrs, $ctrl) {
      var model = $parse($attrs.ngModel)($scope);
      var change = $parse($attrs.ngChange)($scope);
      $scope.model = model;
      $scope.value = model.value;
      $scope.doChange = function() {
        model.value = $scope.value;
        change();
      };
      $scope.onKeydown = function(e) {
        if (e.ctrlKey && e.keyCode == 90) {
          e.preventDefault();
        }
        return false;
      };
    }
  }

})();