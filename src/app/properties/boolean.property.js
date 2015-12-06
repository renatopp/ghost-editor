(function() {
  'use strict';

  angular
    .module('app')
    .directive('propBoolean', BooleanDirective);

  BooleanDirective.$inject = ['$parse'];
  function BooleanDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/boolean.property.html',
      link        : linkFunction,
    };
    return directive;

    function linkFunction($scope, $element, $attrs, $ctrl) {
      // VARIABLES ------------------------------------------------------------
      // The property model
      var model = $parse($attrs.ngModel)($scope);

      // On change callback (from propertiespanel controller)
      var onChange = $parse($attrs.ngChange)($scope);

      // INITIALIZE -----------------------------------------------------------
      var initialize = function() {
        console.log(model);
        $scope.model = model;
        $scope.value = model.value;
      };

      // EVENTS ---------------------------------------------------------------
      $scope.doChange = function() {
        // change value
        model.value = $scope.value;
        onChange();
      };

      // DO INITIALIZE --------------------------------------------------------
      initialize();
    }
  }

})();