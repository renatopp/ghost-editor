(function () {
  "use strict";

  /**
   * A selecion box in the screen.
   *
   * @class CutCircle
   * @constructor
   */
  var CutCircle = function() {
    this.Shape_constructor();

    this._settings = null;
    this.visible = false;
    this.radius = 30;
  };
  var p = createjs.extend(CutCircle, createjs.Shape);

  /**
   * Apply the editor settings to the selection box.
   *
   * @method _applySettings
   * @param Object {b3e.SettingsManager} The settings object.
   * @protected
   */
  p._applySettings = function(settings) {
    this._settings = settings;
    this._redraw();
  };

  /**
   * Redraw the box.
   *
   * @method _redraw
   * @protected
   */
  p._redraw = function(x, y) {
    var color = this._settings.get('selection_color');
    this.graphics.setStrokeStyle(3);
    this.graphics.beginStroke(color);
    this.graphics.drawCircle(0, 0, this.radius);
  };

  b3e.CutCircle = createjs.promote(CutCircle, 'Shape');
})();