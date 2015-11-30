=====================
Creating custom nodes
=====================

This session describes how nodes in Ghost editor are organized and how they work.

**Summary**:

- Nodes are located physically in the `editor/nodes` folder.
- Nodes are located logically in the `b3e.nodes` namespace.
- All nodes must inherit from `b3e.node.Node`.
- You can use the function `b3e.node.create` as shortcut to create custom nodes.


--------------
How node works
--------------

All nodes must be inherited from `b3e.node.Node`. This class provides the base structure and methods for all nodes:

Base attributes:

- **id**: the unique identifier of a node.
- **name**: name used to identify the node in code (i.e., it must be the same to the node classes name in node).
- **category**: a category constant (can be `b3e.COMPOSITE`, `b3e.MODULATOR`, `b3e.INPUT`, `b3e.OUTPUT`).
- **title**: the node title, used only to customize the identification of individual nodes in the editor. You can use templates like "Wait <milliseconds>", where "<milliseconds>" will be replaced to the respective property value of that node.
- **description**: a help or simple description of what that node does.
- **properties**: a dict "<key, value>" with the node properties (will be replaced soon to a new system).

Graph structure:

- **maxInConnections**: maximum number of incoming connections. Use -1 to unlimited.
- **maxOutConnections**: maximum number of outgoing connections. Use -1 to unlimited.
- **traversal(callback, thisarg)**: a helper method to visit all successor nodes. The `callback` function will be called for each node using `thisarg` as `this`.

Real-time callbacks (callbacks called during the editor usage):

- **onAdd**: called when the node is added to the canvas by the user.
- **onLoad**: called when the node is added to the canvas by the user or by importing/open/loading a tree or project.
- **onRemove**: called when the node is removed from the canvas.
- **onSelect**: called when a node is selected.
- **onDeselect**: called when a node is deselected.
- **onConnected**: called when the user create a new connection using this node.
- **onInConnected**: called when the user connects another node to its input.
- **onOutConnected**: called when the user connects another node to its output. 
- **onDisconnected**: called when a connection is removed from this node.
- **onInDisconnected**: called when an input connection is removed from this node.
- **onOutDisconnected**: called when an output connection is removed from this node.
- **onPropertyChange**: called when the user changes the values of node properties.


------------
Custom nodes
------------

The editor provides a shortcut function to create new nodes, the `b3e.node.create` function::

    [nodeclass] = b3e.node.create(name, category, kwargs)

The `create` function receives the node name and category as obligatory arguments, and an optional object with attributes and callbacks. The example below shows the complete list of attributes and callbacks accepted by this object::

    var MyNode = b3e.node.create('MyNode', b3e.COMPOSITE, {
      title: 'My custom node',
      description: 'You may use a long description here.',
      properties: [
        ['property name': b3e.properties.String],
        ['other prop': b3e.properties.Sample, [param1, param2]],
      ],
      maxInConnections: -1,
      maxOutConnections: 2,
      onAdd: function() {},
      onLoad: function() {},
      onSelect: function() {},
      onDeselect: function() {},
      onConnected: function() {},
      onInConnected: function() {},
      onOutConnected: function() {},
      onDisconnected: function() {},
      onInDisconnected: function() {},
      onOutDisconnected: function() {},
      onPropertyChange: function() {},
      onRemove: function() {},
    });
