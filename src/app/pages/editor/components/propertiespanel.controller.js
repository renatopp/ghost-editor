(function() {
  'use strict';

  angular
    .module('app')
    .controller('PropertiespanelController', PropertiespanelController);

  PropertiespanelController.$inject = [
    '$scope',
    '$window',
    '$sce'
  ];

  function PropertiespanelController($scope, $window, $sce) {
    var self = this;
    self.node = null;
    self.properties = [];
    self.keydown = keydown;
    self.change = change;

    _create();
    _activate();

    $scope.$on('$destroy', _destroy);

    function _activate() {
      var p = $window.editor.project.get();
      var t = p.trees.getSelected();
      var s = t.nodes.getSelected();

      if (s.length === 1) {
        self.node = s[0];
        self.properties = [];
        Object.keys(self.node.properties).forEach(function(key) {
          var p = self.node.properties[key];
          self.properties.push({
            name : key,
            obj  : p,
            html : _makeProperty(p)
          });
        });
      } else {
        self.node = false;
      }
    }
    function _event(e) {
      setTimeout(function() {$scope.$apply(function() { _activate(); });}, 0);
      
    }
    function _create() {
      $window.editor.on('nodeselected', _event);
      $window.editor.on('nodedeselected', _event);
      $window.editor.on('noderemoved', _event);
      $window.editor.on('treeselected', _event);
      $window.editor.on('nodechanged', _event);
    }
    function _destroy() {
      $window.editor.off('nodeselected', _event);
      $window.editor.off('nodedeselected', _event);
      $window.editor.off('noderemoved', _event);
      $window.editor.off('treeselected', _event);
      $window.editor.off('nodechanged', _event);
    }
    function _makeProperty(p) {
      var elName = p.html();
      var element = '<'+elName;
      element += ' ng-change="propertiespanel.change"';
      element += ' ng-model="p.obj"';

      element += '></'+elName+'>';

      return $sce.trustAsHtml(element);
    }

    function change() {
      $window.editor.trigger('nodechanged', self.node);
      self.node.display.redraw();
    }

    function keydown(e) {
      if (e.ctrlKey && e.keyCode == 90) {
        e.preventDefault();
      }
      return false;
    }
  }
})();