b3e.tree.ConnectionManager = function(editor, project, tree) {
  'use strict';

  /** Needed to history manager */
  this._remove = function(connection) {
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
      var _old = [this, this._remove, [connection]];
      var _new = [this, this.add, [inNode, outNode]];
      project.history._add(new b3e.Command(_old, _new));
    }

    connection._applySettings(editor._settings);
    tree._connections.push(connection);
    tree._connectionsLayer.addChild(connection.display);

    // editor.trigger('connectionadded', connection);
    return connection;
  };

  this.remove = function(connection) {
    if (connection.inNode && connection.outNode) {
      var _old = [this, this.add, [connection.inNode, connection.outNode]];
      var _new = [this, this._remove, [connection]];
      project.history._add(new b3e.Command(_old, _new));
    }

    if (connection.inNode) {
      connection.inNode.outConnections.remove(connection);
      connection.inNode = null;
    }

    if (connection.outNode) {
      connection.outNode.inConnections.remove(connection);
      connection.outNode = null;
    }

    tree._connectionsLayer.removeChild(connection.display);
    tree._connections.remove(connection);
    editor.trigger('connectionremoved', connection);
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
