(function() {
  'use strict';

  /**
   * This class represents the visual of nodes and procedures related to the 
   * visual.
   * 
   * The DisplayComponent inherits from CreateJS container. Thus, it must be 
   * added to the tree container.
   *
   * @class DisplayComponent
   * @constructor
   */
  var DisplayComponent = function(node) {
    this.Container_constructor();

    this._settings = null;

    this.node = node;
    this.width = null;
    this.height = null;

    this.isEnabled = true;
    this.isSelected = null;
    this.isDragging = null;
    this.dragOffsetX = null;
    this.dragOffsetY = null;

    this.shape = null;
    this._shadow = null;
    this._disabledOverlay = null;
  };
  var p = createjs.extend(DisplayComponent, createjs.Container);

  /**
   * Apply the editor settings to this block.
   *
   * @method _applySettings
   * @param Object {b3e.SettingsManager} The settings object.
   * @protected
   */
  p._applySettings = function(settings) {
    this._settings = settings;

    var color = this._settings.get('selection_color');
    this._shadow = new createjs.Shadow(color, 0, 0, 10);
    this._disabledOverlay = new createjs.Shape();
    this._disabledOverlay.alpha = 0.6;
    this._disabledOverlay.visible = !this.isEnabled;

    this.redraw();

    var g = this._disabledOverlay.graphics;
    g.beginFill('#414141');
    g.drawRoundRect(
      -this.width/2, -this.height/2,
      this.width, this.height,
      10
    );

  };

  /**
   * Redraw the block.
   *
   * @method redraw
   * @protected
   */
  p.redraw = function() {
    this.removeAllChildren();
    
    this.width = this._settings.get('block_action_width');
    this.height = this._settings.get('block_action_height');
    b3e.node.draw(this.node, this._settings);
    
    this.addChild(this._disabledOverlay);
  };

  /**
   * Snap the block according to the snap settings.
   *
   * @method snap
   * @protected
   */
  p.snap = function() {
    var snap_x = this._settings.get('snap_x');
    var snap_y = this._settings.get('snap_y');
    var dx = this.x%snap_x;
    var dy = this.y%snap_y;

    if (dx < 0) dx = snap_x+dx;
    if (dy < 0) dy = snap_y+dy;

    this.x -= dx;
    this.y -= dy;
  };

  /**
   * Enable/disable node
   */
  p.invertEnabled = function() {
    this.isEnabled = !this.isEnabled;
    this._disabledOverlay.visible = !this.isEnabled;
  };
  p.enable = function() {
    this.isEnabled = true;
    this._disabledOverlay.visible = false;
  };
  p.disable = function() {
    this.isEnabled = false;
    this._disabledOverlay.visible = true;
  };

  /**
   * Select a block, adding a shadow effect to it.
   *
   * @method select
   * @protected
   */
  p.select = function() {
    this.isSelected = true;
    this.shape.shadow = this._shadow;
  };

  /**
   * Deselect a block, removing the shadow effect.
   *
   * @method deselect
   * @protected
   */
  p.deselect = function() {
    this.isSelected = false;
    this.shape.shadow = null;
  };

  p.collapse = function() {};
  p.expand = function() {};
  
  /**
   * Verifies if the position (x, y) hits any part of the block. This is 
   * equivalent to:
   *
   *     block.hitBody(x, y) || block.hitInAnchor(x, y) || block.hitOutAnchor(x, y)
   *
   * @method hitTest
   * @param {Integer} x The x position.
   * @param {Integer} y The y position.
   * @returns {Boolean} Whether hit the block or not.
   * @protected
   */
  p.hitTest = function(x, y) {
    return this.shape.hitTest(x-this.x, y-this.y);
  };

  /**
   * Verifies if the position (x, y) hits the body of the block.
   * 
   * @method hitBody
   * @param {Integer} x The x position.
   * @param {Integer} y The y position.
   * @returns {Boolean} Whether hit the block's body or not.
   * @protected
   */
  p.hitBody = function(x, y) {
    if (this._settings.get('layout') === 'horizontal') {
      return (Math.abs(x-this.x) < this.width/2);
    }
    return (Math.abs(y-this.y) < this.height/2);
  };

  /**
   * Verifies if the position (x, y) hits the in anchor of the block.
   * 
   * @method hitInAnchor
   * @param {Integer} x The x position.
   * @param {Integer} y The y position.
   * @returns {Boolean} Whether hit the in anchor or not.
   * @protected
   */
  p.hitInAnchor = function(x, y) {
    if (this._settings.get('layout') === 'horizontal') {
      var dx = x-this.x;
      return (Math.abs(dx) > this.width/2 && dx < 0);
    }
    var dy = y-this.y;
    return (Math.abs(dy) > this.height/2 && dy < 0);
  };

  /**
   * Verifies if the position (x, y) hits the out anchor of the block.
   * 
   * @method hitOutAnchor
   * @param {Integer} x The x position.
   * @param {Integer} y The y position.
   * @returns {Boolean} Whether hit the out anchor or not.
   * @protected
   */
  p.hitOutAnchor = function(x, y) {
    if (this._settings.get('layout') === 'horizontal') {
      var dx = x-this.x;
      return (Math.abs(dx) > this.width/2 && dx > 0);
    }
    var dy = y-this.y;
    return (Math.abs(dy) > this.height/2 && dy > 0);
  };

  /**
   * Verifies if this block is contained inside a given rectangle.
   * 
   * @method isContainedIn
   * @param {Integer} x1 The x position.
   * @param {Integer} y1 The y position.
   * @param {Integer} x2 The x+w position.
   * @param {Integer} y2 The y+h position.
   * @returns {Boolean} Whether the block is contained in the rectangle or not.
   * @protected
   */
  p.isContainedIn = function(x1, y1, x2, y2) {
    if (x1 < this.x-this.width/2 &&
        y1 < this.y-this.height/2 &&
        x2 > this.x+this.width/2 &&
        y2 > this.y+this.height/2) {
      return true;
    }

    return false;
  };

  /**
   * Returns the center position of the in anchor.
   *
   * @method getInAnchorPosition
   * @returns {Object} An object {x, y}.
   * @protected
   */
  p.getInAnchorPosition = function() {
    return {
      x: this.x-this.width/2-this._settings.get('anchor_offset_x'),
      y: this.y-this.height/2-this._settings.get('anchor_offset_x')
    };
  };

  /**
   * Returns the center position of the out anchor.
   *
   * @method getOutAnchorPosition
   * @returns {Object} An object {x, y}.
   * @protected
   */
  p.getOutAnchorPosition = function() {
    return {
      x: this.x+this.width/2+this._settings.get('anchor_offset_x'),
      y: this.y+this.height/2+this._settings.get('anchor_offset_x')
    };
  };

  b3e.node.DisplayComponent = createjs.promote(DisplayComponent, 'Container');
})();