b3e.tree.ConnectionManager = function(editor, project, tree) {
  'use strict';

  /** Needed to history manager */
  this._remove = function(inNode, outNode) {
    var connection;
    for (var i=0; i<inNode.outConnections.length; i++) {
      if (inNode.outConnections[i].outNode === outNode) {
        connection = inNode.outConnections[i];
        break;
      }
    }

    if (!connection) return;
    project.history._lock();
    this.remove(connection);
    project.history._unlock();
  };

  this.add = function(inNode, outNode) {
    var connection = new b3e.connection.Connection();

    if (inNode) {
      connection.inNode = inNode;
      inNode.outConnections.push(connection);

      editor.trigger('nodeconnected', inNode, {
        type       : 'outConnection',
        connection : connection,
        other      : outNode,
      });
    }

    if (outNode) {
      connection.outNode = outNode;
      outNode.inConnections.push(connection);

      editor.trigger('nodeconnected', outNode, {
        type       : 'inConnection',
        connection : connection,
        other      : inNode,
      });
    }

    if (inNode && outNode) {
      var _old = [this, this._remove, [inNode, outNode]];
      var _new = [this, this.add, [inNode, outNode]];
      project.history._add(new b3e.Command(_old, _new, 
        'Add connection between '+inNode.id+' and '+outNode.id
      ));
    }

    connection._applySettings(editor._settings);
    tree._connections.push(connection);
    tree._connectionsLayer.addChild(connection.display);

    // editor.trigger('connectionadded', connection);
    return connection;
  };

  this.remove = function(connection) {
    var inNode = connection.inNode;
    var outNode = connection.outNode;

    if (inNode && outNode) {
      var _old = [this, this.add, [inNode, outNode]];
      var _new = [this, this._remove, [inNode, outNode]];
      project.history._add(new b3e.Command(_old, _new,
        'Remove connection between '+inNode.id+' and '+outNode.id
      ));
    }

    if (inNode) {
      inNode.outConnections.remove(connection);
      connection.inNode = null;
    }

    if (outNode) {
      outNode.inConnections.remove(connection);
      connection.outNode = null;
    }

    tree._connectionsLayer.removeChild(connection.display);
    tree._connections.remove(connection);
    editor.trigger('connectionremoved', connection);
  };
  this.getUnderPoint = function(x, y) {
    if (!x || !y) {
      var point = tree.view.getLocalPoint();
      x = point.x;
      y = point.y;
    }

    // Get node under the mouse
    var connections = this.getAll();
    for (var i=connections.length-1; i>=0; i--) {
      var connection = connections[i];

      if (connection.display.hitTest(x, y)) return connection;
    }
  };
  this.getAll = function() {
    return tree._connections;
  };
  this.each = function(callback, thisarg) {
    tree._connections.forEach(callback, thisarg);
  };

  this._applySettings = function(settings) {
    this.each(function(connection) {
      connection._applySettings(settings);
    });
  };
};
