b3e.editor.ConnectionSystem = function(editor) {
  "use strict";

  var connections = [];
  var lastOutNode = null;

  this.update = function(delta) {};

  this.onMouseDown = function(e) {
    // Accepts only left click
    if (e.nativeEvent.which !== 1) return;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get node under the click
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);

    // Return if clicked on empty
    if (connections.length || !node) return;

    // User left click on OUT anchor
    if (node.display.hitOutAnchor(x, y)) {
      var c = tree.connections.add(node, null);
      connections.push(c);

    // User left click on IN anchor
    } else if (node.display.hitInAnchor(x, y)) {
      if (!node.inConnections.length) return;

      connections = node.inConnections;
      node.inConnections = [];      
      lastOutNode = node;
      for (var i=0; i<connections.length; i++) {
        connections[i].outNode = null;
      }

    }
  };

  this.onMouseMove = function(e) {
    // Return if not draggin any connection
    if (!connections.length) return;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get current mouse position
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;

    // Redraw all dragging connections
    for (var i=0; i<connections.length; i++) {
      connections[i].display.redraw(null, null, x, y);
    }
  };

  this.onMouseUp = function(e) {
    // Accepts only left click
    if (e.nativeEvent.which !== 1) return;

    // Return if there is no connection
    if (!connections.length) return;

    // Get current project
    var project = editor.project.get();
    if (!project) return;

    // Get selected tree
    var tree = project.trees.getSelected();
    if (!tree) return;

    // Get node under cursor, if any
    var point = tree.view.getLocalPoint();
    var x = point.x;
    var y = point.y;
    var node = tree.nodes.getUnderPoint(x, y);

    //
    project.history._beginBatch();

    for (var i=0; i<connections.length; i++) {
      var connection = connections[i];
      var inNode = connection.inNode;

      // Remove connection if there is no node
      if (!node) {
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if node is connecting itself
      if (node === inNode) {
        tree.connections.remove(connection);
        continue;
      }

      // Remove connection if nodes are already connected
      var doubleConnection = false;
      for (var j=0; j<inNode.outConnections.length; j++) {
        var outNode = inNode.outConnections[j].outNode;
        if (outNode === node) {
          tree.connections.remove(connection);
          doubleConnection = true;
          break;
        }
      }

      if (doubleConnection) {
        continue;
      }

      // Do the connection
      connection.outNode = node;
      node.inConnections.push(connection);
      var _old = [tree.connections, tree.connections._remove, [node]];
      var _new = [tree.connections, tree.connections.add, [inNode, node]];
      project.history._add(new b3e.Command(_old, _new));
      
      connection.display.redraw();
    }


    // if (!block || block === connection._inBlock || block.category === 'root') {
    //   if (lastOutNode) {
    //     // Add again to connection in order to create history 
    //     lastOutNode._inConnection = connection;
    //     connection._outBlock = lastOutNode;
    //   }
    //   tree.connections.remove(connection);
    // } else {
    //   var c;

    //   // if double parent on node
    //   if (block._inConnection) {

    //     c = block._inConnection;
    //     tree.connections.remove(c);
    //   }

    //   // if double children on root
    //   if ((connection._inBlock.category === 'root' ||
    //        connection._inBlock.category === 'decorator') &&
    //        connection._inBlock._outConnections.length > 1) {

    //     c = connection._inBlock._outConnections[0];
    //     tree.connections.remove(c);
    //   }

    //   connection._outBlock = block;
    //   block._inConnection = connection;

    //   var _old = [tree.connections, tree.connections._remove, [block]];
    //   var _new = [tree.connections, tree.connections.add, [connection._inBlock, block]];
    //   project.history._add(new b3e.Command(_old, _new));

    //   connection._redraw();
    // }
    project.history._endBatch();

    connections = [];
  };

  editor._game.stage.on('stagemousedown', this.onMouseDown, this);
  editor._game.stage.on('stagemousemove', this.onMouseMove, this);
  editor._game.stage.on('stagemouseup', this.onMouseUp, this);
};
