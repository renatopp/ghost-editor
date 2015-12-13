(function() {
  'use strict';

  angular
    .module('app')
    .directive('propFloatslider', FloatsliderDirective);

  FloatsliderDirective.$inject = ['$parse'];
  function FloatsliderDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/floatslider.property.html',
      link        : linkFunction,
    };
    return directive;

    function linkFunction($scope, $element, $attrs, $ctrl) {
      // VARIABLES ------------------------------------------------------------
      // The property model
      var model = $parse($attrs.ngModel)($scope);

      // The property input
      var input = $element.children()[0];

      // On change callback (from propertiespanel controller)
      var onChange = $parse($attrs.ngChange)($scope);

      // INITIALIZE -----------------------------------------------------------
      var initialize = function() {
        $scope.model      = model;
        $scope.value      = model.value;
        $scope.valueRange = model.value;
        $scope.minValue   = model.minValue;
        $scope.maxValue   = model.maxValue;
        $scope.step       = model.step;
        $scope.errors     = {};
        validate();
      };

      // VALIDATION ----------------------------------------------------------
      var isFloat = function(v) {
        return v===null || (/^(-?)([0-9])*\.?([0-9])*$/).test(''+v);
      };
      var validate = function() {
        var v = $scope.value;
        var errors = {};

        if (typeof v === 'undefined' || !isFloat(v)) {
          errors.invalid = 'Invalid value.';
        }

        if (model.minValue !== null && v < model.minValue) {
          errors.min = 'Number cannot be lesser than '+model.minValue+'.';
        }

        if (model.maxValue !== null && v > model.maxValue) {
          errors.max = 'Number cannot be greater than '+model.maxValue+'.';
        }

        if (model.enforceStep) {
          var temp = (v/model.step).toFixed(2);
          if (parseInt(temp) !== parseFloat(temp)) {
            errors.step = 'Number must respect the step of '+model.step+'.';
          }
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
        $scope.valueRange = parseFloat($scope.value);
        onChange();
      };
      $scope.doChangeRange = function() {
        // validate
        if (!validate()) return;

        // change value
        model.value = parseFloat($scope.valueRange);
        $scope.value = parseFloat($scope.valueRange);
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