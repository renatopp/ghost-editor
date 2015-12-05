(function() {
  'use strict';

  angular
    .module('app')
    .directive('propInteger', IntegerDirective);

  IntegerDirective.$inject = ['$parse'];
  function IntegerDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/integer.property.html',
      link        : linkFunction,
    };
    return directive;

    function linkFunction($scope, $element, $attrs, $ctrl) {
      // VARIABLES ------------------------------------------------------------
      // The property model
      var model = $parse($attrs.ngModel)($scope);

      // The property input
      var input = $element.children();

      // On change callback (from propertiespanel controller)
      var onChange = $parse($attrs.ngChange)($scope);

      // INITIALIZE -----------------------------------------------------------
      var initialize = function() {
        $scope.model = model;
        $scope.value = model.value;
        $scope.errors = {};
        $scope.hasError = false;
        validate();
      };

      // VALIDATION ----------------------------------------------------------
      var isInt = function(v) {
        return v===null || (/^(-?)([0-9])*$/).test(''+v);
      };
      var validate = function() {
        var v = $scope.value;
        var errors = {};

        if (typeof v === 'undefined' || !isInt(v)) {
          errors.invalid = 'Invalid value.';
        }

        if (model.minValue !== null && v < model.minValue) {
          errors.min = 'Number cannot be lesser than '+model.minValue+'.';
        }

        if (model.maxValue !== null && v > model.maxValue) {
          errors.max = 'Number cannot be greater than '+model.maxValue+'.';
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
        model.value = $scope.value;
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