(function() {
  'use strict';

  angular
    .module('app')
    .directive('propChoice', ChoiceDirective);

  ChoiceDirective.$inject = ['$parse'];
  function ChoiceDirective($parse) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/choice.property.html',
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
        var options = [];
        var selected = null;
        for (var i=0; i<model.options.length; i++) {
          var opt = model.options[i];
          var item;
          if (Array.isArray(opt)) {
            item = {id:opt[0], label:opt[1]};
          } else {
            item = {id:opt, label:opt};
          }

          if (model.value === item.id) {
            selected = item;
          }

          options.push(item);
        }

        $scope.model = model;
        $scope.value = selected;
        $scope.options = options;
      };

      // EVENTS ---------------------------------------------------------------
      $scope.doChange = function() {
        // change value
        if ($scope.value !== null) {
          model.value = $scope.value.id;
        } else {
          model.value = $scope.value;
        }

        onChange();
      };

      // DO INITIALIZE --------------------------------------------------------
      initialize();
    }
  }

})();