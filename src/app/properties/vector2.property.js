(function() {
  'use strict';

  angular
    .module('app')
    .directive('propVector2', Vector2Directive);

  Vector2Directive.$inject = ['$parse'];
  function Vector2Directive($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/vector2.property.html',
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
        $scope.model  = model;
        $scope.x      = model.x;
        $scope.y      = model.y;
        $scope.errors = {};
        validate();
      };

      // VALIDATION ----------------------------------------------------------
      var isFloat = function(v) {
        return v===null || (/^(-?)([0-9])*\.?([0-9])*$/).test(''+v);
      };
      var validate = function() {
        var errors = {};

        if (typeof $scope.x === 'undefined' || !isFloat($scope.x)) {
          errors.invalid_x = 'Invalid X value.';
        }
        if (typeof $scope.y === 'undefined' || !isFloat($scope.y)) {
          errors.invalid_y = 'Invalid Y value.';
        }

        $scope.errors = errors;
        $scope.hasError = !!Object.keys(errors).length;
        return !$scope.hasError;
      };

      // EVENTS ---------------------------------------------------------------
      $scope.doChange = function() {
        // validate
        if (!validate()) return;
        
        // change value
        model.x = $scope.x;
        model.y = $scope.y;
        onChange();
      };
      $scope.onKeydown = function(e) {
        // Prevent propagation of CTRL+Z and CTRL+SHIT+Z
        if (e.ctrlKey && e.keyCode == 90) {
          e.preventDefault();
        }
        return false;
      };

      // DO INITIALIZE --------------------------------------------------------
      initialize();
    }
  }

})();