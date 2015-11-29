/** @module b3e */

(function () {
  "use strict";

  /**
   * The Node class provides base variables and methods for all nodes in 
   * the editor. 
   *
   * This class has a display component, which is in fact a CreateJS container
   * that will be used to render the node in the canvas. This component also 
   * provides methods to verify hit tests and other visual effects.
   *
   * It is recommended the use of the shortcut `b3e.node.create` instead of
   * this class directly.
   *
   * @class Node
   * @constructor
   */
  var Node = new JS.Class('Node', {
    id: null,
    display: null,
    inConnections: null,
    outConnections: null,
    name: null,
    category: null,
    title: null,
    description: null,
    properties: null,
    maxInConnections: -1,
    maxOutConnections: -1,

    onAdd: function(e) {},
    onLoad: function(e) {},
    onRemove: function(e) {},
    onSelect: function(e) {},
    onDeselect: function(e) {},
    onConnected: function(e) {},
    onInConnected: function(e) {},
    onOutConnected: function(e) {},
    onDisconnected: function(e) {},
    onInDisconnected: function(e) {},
    onOutDisconnected: function(e) {},
    onPropertyChange: function(e) {},

    initialize: function() {
      this.id = b3e.createID();
      this.display = new b3e.node.DisplayComponent(this);
      this.inConnections = [];
      this.outConnections = [];

      this.properties = {};
      for (var i=0; i<this.constructor.properties.length; i++) {
        var p = this.constructor.properties[i];
        var name = p[0];
        var Cls = p[1];
        var params = p[2] || [];

        /* jshint -W058 */
        this.properties[name] = new (Function.prototype.bind.apply(Cls, params));
        this.properties[name].name = name;

      }
    },

    getTitle: function() {
      var s = this.title || this.name;

      var self = this;
      var title = s.replace(/(<\w+>)/g, function(match, key) {
        var attr = key.substring(1, key.length-1);
        if (self.properties.hasOwnProperty(attr)) {
          return self.properties[attr];
        } else {
          return match;
        }
      });

      if (b3e.ENV === b3e.DEVELOPMENT) {
        title += ' <'+this.id+'>';
      }
      return title;
    },

    traversal: function(callback, thisarg) {
      var nodes = [this];
      while (nodes.length > 0) {
        var node = nodes.pop();
        if (callback.call(thisarg, node) === false) return;

        for (var i=node.outConnections.length-1; i>=0; i--) {
          var c = node.outConnections[i];
          if (c.outNode) nodes.push(c.outNode);
        }
      }
    },

    copy: function() {
      var other = new this.constructor();
      other._applySettings(this.display._settings);

      other.fromJson(this.toJson());
      other.display.x = this.display.x;
      other.display.y = this.display.y;

      return other;
    },

    fromJson: function(data) {
      data = data || {};
      data.properties = data.properties || {};

      this.name = data.name;
      this.title = data.title;
      this.category = data.category;
      this.description = data.description;
      var self = this;
      Object.keys(data.properties).forEach(function(key) {
        self.properties[key].fromJson(data.properties[key]);
      });
    },

    toJson: function() {
      var properties = {};
      var self = this;
      Object.keys(this.properties).forEach(function(key) {
        properties[key] = self.properties[key].toJson();
      });

      return {
        name        : this.name,
        title       : this.title,
        category    : this.category,
        description : this.description,
        properties  : properties,
      };
    },


    _applySettings: function(settings) {
      this.display._applySettings(settings);
    },

  });

  Node.extend({
    title: null,
    category: null,
    description: null,
    properties: null,
    maxInConnections: -1,
    maxOutConnections: -1,
  });

  b3e.node.Node = Node;
})();