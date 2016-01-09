(function() {
  'use strict';

  angular
    .module('app')
    .controller('NodespanelController', NodespanelController);

  NodespanelController.$inject = [
    '$scope',
    '$window',
    'dialogService',
    'notificationService',
    'localStorageService'
  ];

  function NodespanelController($scope, 
                                $window,
                                dialogService,
                                notificationService,
                                localStorageService) {
    
    // HEAD //
    var vm = this;
    vm.nodes = null;
    vm.newTree = newTree;
    vm.select  = select;
    vm.remove  = remove;
    vm.collapseGroup = collapseGroup;
    
    _create();
    _activate();
    $scope.$on('$destroy', _destroy);

    // BODY //
    function _getGroupState(fullName) {
      var state = localStorageService.load('b3groups.'+fullName);
      if (!state) {
        state = {
          collapsed: false
        };
      }

      return state;
    }
    function _saveGroupState(fullName, state) {
      localStorageService.save('b3groups.'+fullName, state);
    }

    function _createGroup(groupName, fullName) {
      fullName = groupName;
      return {
        groups    : {},
        nodes     : [],
        collapsed : _getGroupState(fullName).collapsed,
        name      : groupName,
        fullName  : fullName
      };
    }
    function _insertToGroup(node, groupName, groups, fullName) {
      if (!groupName) return;

      var i = groupName.indexOf('.');
      var nextGroup = '';
      if (i >= 0) {
        nextGroup = groupName.substring(i+1);
        groupName = groupName.substring(0, i);
      }

      // We use this to get the collapsed status from localStorage 
      if (!fullName) {
        fullName = groupName;
      } else {
        fullName = fullName+'.'+groupName;
      }

      if (!groups[groupName]) {
        groups[groupName] = _createGroup(groupName, fullName);
      }
      var group = groups[groupName];

      if (nextGroup) {
        _insertToGroup(node, nextGroup, group.groups, fullName);
      } else {
        group.nodes.push(node.prototype.name);
      }
    }
    
    function _activate() {  
      vm.trees = [];
      vm.nodes = {
        'composites' : _createGroup('composites'),
        'inputs'     : _createGroup('inputs'),
        'modulators' : _createGroup('modulators'),
        'outputs'    : _createGroup('outputs'),
      };

      for (var key in b3e.nodes) {
        var node = b3e.nodes[key];
        if (node.category === b3e.ROOT) continue;

        _insertToGroup(node, node.category+'s.'+node.group, vm.nodes);
      }

      var project = $window.editor.project.get();
      var selected = project.trees.getSelected();
      project.trees.each(function(tree) {
        var root = tree.nodes.getRoot();
        vm.trees.push({
          'id'       : tree._id,
          'name'     : root.title || 'A behavior tree',
          'active'   : tree===selected,
        });
      });
    }

    function _event(e) {
      setTimeout(function() {$scope.$apply(function() { _activate(); });}, 0);
    }

    function _create() {
      // $window.editor.on('nodechanged', _event);
      $window.editor.on('treeadded', _event);
      $window.editor.on('treeselected', _event);
      $window.editor.on('treeremoved', _event);
      $window.editor.on('treeimported', _event);
    }

    function _destroy() {
      $window.editor.off('treeadded', _event);
      // $window.editor.off('nodechanged', _event);
      $window.editor.off('treeselected', _event);
      $window.editor.off('treeremoved', _event);
      $window.editor.off('treeimported', _event);
    }

    function newTree() {
      var p = $window.editor.project.get();
      p.trees.add();
    }

    function collapseGroup(group) {
      console.log(group);

      var state = _getGroupState(group.fullName);
      state.collapsed = !state.collapsed;
      _saveGroupState(group.fullName, state);

      group.collapsed = state.collapsed;
    }

    function select(id) {
      var p = $window.editor.project.get();
      p.trees.select(id);
    }

    function remove(id) {
      dialogService.
        confirm(
          'Remove tree?', 
          'Are you sure you want to remove this tree?\n\nNote: all blocks using this tree will be removed.'
        ).then(function() {
          var p = $window.editor.project.get();
          p.trees.remove(id);
          notificationService.success(
            'Tree removed',
            'The tree has been removed from this project.'
          );
        });
    }
  }
})();