(function () {
  "use strict";

  var Tree = function(editor, project) {
    this.Container_constructor();

    // Variables
    this._id = b3.createUUID();
    this._editor = editor;
    this._project = project;
    this._selectedNodes = [];
    this._selectionBox = null;
    this._root = null;

    this._nodes = [];
    this._connections = [];
    
    // Layers
    this._connectionsLayer = new createjs.Container();
    this._nodesLayer = new createjs.Container();
    this._overlayLayer = new createjs.Container();

    // Managers
    this.nodes = null;
    this.connections = null;
    this.edit = null;
    this.selection = null;
    this.view = null;
    this.organizer = null;

    this._initialize();
  };
  var p = createjs.extend(Tree, createjs.Container);

  p._initialize = function() {
    this.nodes = new b3e.tree.NodeManager(this._editor, this._project, this);
    this.connections = new b3e.tree.ConnectionManager(this._editor, this._project, this);
    this.edit = new b3e.tree.EditManager(this._editor, this._project, this);
    this.selection = new b3e.tree.SelectionManager(this._editor, this._project, this);
    this.view = new b3e.tree.ViewManager(this._editor, this._project, this);
    this.organize = new b3e.tree.OrganizeManager(this._editor, this._project, this);

    this.addChild(this._connectionsLayer);
    this.addChild(this._nodesLayer);
    this.addChild(this._overlayLayer);

    this._selectionBox = new b3e.SelectionBox();
    this._overlayLayer.addChild(this._selectionBox);

    this._root = this.nodes.add('Root', 0, 0);
    this._applySettings(this._editor._settings);

    this.view.center();
  };

  p._applySettings = function(settings) {
    this._selectionBox._applySettings(settings);

    this.nodes._applySettings(settings);
    this.connections._applySettings(settings);
    this.edit._applySettings(settings);
    this.selection._applySettings(settings);
    this.view._applySettings(settings);
    this.organize._applySettings(settings);
  };

  b3e.tree.Tree = createjs.promote(Tree, 'Container');
})();