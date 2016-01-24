(function() {
  'use strict';

  angular
    .module('app')
    .directive('propCurve', CurveDirective);

  CurveDirective.$inject = ['$parse', '$compile'];
  function CurveDirective($parse, $compile) {
    var directive = {
      require     : 'ngModel',
      restrict    : 'E',
      templateUrl : 'properties/curve.property.html',
      link        : linkFunction,
    };
    return directive;

    function linkFunction($scope, $element, $attrs, $ctrl) {
      // VARIABLES ------------------------------------------------------------
      var modalElement = null;
      var modalTemplate = null;

      // The property model
      var model = $parse($attrs.ngModel)($scope);

      // On change callback (from propertiespanel controller)
      var onChange = $parse($attrs.ngChange)($scope);

      // INITIALIZE -----------------------------------------------------------
      var initialize = function() {
        $scope.model = model;
        $scope.tempData = null;
        modalTemplate = $element.find('modal');
        modalTemplate.remove();
        modalTemplate = modalTemplate.html();

      };

      var copy = function(d) {
        return JSON.parse(JSON.stringify(d));
      };

      // EVENTS ---------------------------------------------------------------
      $scope.doChange = function() {
        // change value
        if (onChange) onChange();
      };
      $scope.openEditor = function() {
        $scope.tempData = {
          type: model.type,
          data: copy(model.data),
          xDomain: copy(model.xDomain),
          yDomain: copy(model.yDomain),
        };

        modalElement = $compile(modalTemplate)($scope);
        document.body.appendChild(modalElement[0]);
      };
      $scope.closeEditor = function() {
        modalElement.remove();
      };
      $scope.saveEditor = function() {
        model.type = $scope.tempData.type;
        model.data = $scope.tempData.data;
        model.xDomain = $scope.tempData.xDomain;
        model.yDomain = $scope.tempData.yDomain;
        modalElement.remove();
        $scope.doChange();
      };

      // DO INITIALIZE --------------------------------------------------------
      initialize();
    }
  }

})();