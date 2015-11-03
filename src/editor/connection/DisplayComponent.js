(function() {
  'use strict';

  var DisplayComponent = function(connection) {
    this.Container_constructor();

    this._settings = null;

    this.connection = connection;
    this.shape = new createjs.Shape();
    this.addChild(this.shape);
  };
  var p = createjs.extend(DisplayComponent, createjs.Container);

  /**
   * Apply the editor settings to this connection.
   *
   * @method _applySettings
   * @param Object {b3e.SettingsManager} The settings object.
   * @protected
   */
  p._applySettings = function(settings) {
    this._settings = settings;
    this.redraw();
  };

  /**
   * Redraw the connection.
   *
   * @method redraw
   * @protected
   */
  p.redraw = function(x1, y1, x2, y2) {
    var inNode = this.connection.inNode;
    var outNode = this.connection.outNode;

    if (! ((inNode||x1||y1) && (outNode||x2||y2)) ) {
      return;
    }

    var s          = this._settings;
    var graphics   = this.shape.graphics;
    var width      = s.get('connection_width');
    var color      = s.get('connection_color');
    var diff       = s.get('anchor_radius') + s.get('anchor_border_width');
    var arrowWidth = s.get('anchor_radius')/2;
    var layout     = s.get('layout');

    var dx=0; var dy=0; var angle=0; var ax=0; var ay=0;
    // var inAnchor = outNode._getInAnchorPosition();
    // var outAnchor = inNode._getOutAnchorPosition();

    if (!(x1 === 0||x1)) {
      var outAnchor = inNode.display.getOutAnchorPosition();
      if (layout === 'horizontal') {
        x1 = outAnchor.x;
        y1 = inNode.display.y;
      } else {
        x1 = inNode.display.x;
        y1 = outAnchor.y;
      }
    }

    if (!(x2 === 0||x2)) {
      var inAnchor = outNode.display.getInAnchorPosition();
      if (layout === 'horizontal') {
        x2 = inAnchor.x - diff;
        y2 = outNode.display.y;
      } else {
        x2 = outNode.display.x;
        y2 = inAnchor.y - diff;
      }
    }

    if (layout === 'horizontal') {
      dx = 2.5*(x2 - x1)/4;
      ax = -arrowWidth;
    } else {
      dy = 2.5*(y2 - y1)/4;
      ay = -arrowWidth;
      angle = 90;
    }

    graphics.clear();
    graphics.setStrokeStyle(width, 'round');
    graphics.beginStroke(color);
    graphics.moveTo(x1, y1);
    graphics.bezierCurveTo(x1+dx, y1+dy, x2-dx, y2-dy, x2, y2);
    graphics.beginFill(color);
    graphics.drawPolyStar(x2+ax, y2+ay, arrowWidth, 3, 0, angle);
    graphics.endFill();
    graphics.endStroke();
  };


  b3e.connection.DisplayComponent = createjs.promote(DisplayComponent, 'Container');
})();