(function() {
  'use strict';

  angular
    .module('app')
    .directive('propFloatrange', FloatrangeDirective);

  FloatrangeDirective.$inject = ['$parse'];
  function FloatrangeDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/floatrange.property.html',
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
        $scope.model        = model;
        $scope.startValue    = model.startValue;
        $scope.endValue      = model.endValue;
        $scope.minStartValue = model.minStartValue;
        $scope.maxStartValue = model.maxStartValue;
        $scope.minEndValue   = model.minEndValue;
        $scope.maxEndValue   = model.maxEndValue;
        $scope.errors       = {};
        validate();
      };

      // VALIDATION ----------------------------------------------------------
      var isFloat = function(v) {
        return v===null || (/^(-?)([0-9])*\.?([0-9])*$/).test(''+v);
      };
      var validate = function() {
        var sv = $scope.startValue;
        var ev = $scope.endValue;
        var errors = {};

        if (typeof sv === 'undefined' || !isFloat(sv)) {
          errors.invalid = 'Invalid START value.';
        }
        if (typeof ev === 'undefined' || !isFloat(ev)) {
          errors.invalid = 'Invalid END value.';
        }

        if (ev < sv) {
          errors.order = 'END must be greater than START.';
        }

        if (model.minStartValue !== null && sv < model.minStartValue) {
          errors.minStart = 'START value cannot be lesser than '+model.minStartValue+'.';
        }

        if (model.maxStartValue !== null && sv > model.maxStartValue) {
          errors.maxStart = 'START value cannot be greater than '+model.maxStartValue+'.';
        }

        if (model.minEndValue !== null && ev < model.minEndValue) {
          errors.minEnd = 'END value cannot be lesser than '+model.minEndValue+'.';
        }

        if (model.maxEndValue !== null && ev > model.maxEndValue) {
          errors.maxEnd = 'END value cannot be greater than '+model.maxEndValue+'.';
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
        model.startValue = $scope.startValue;
        model.endValue = $scope.endValue;
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