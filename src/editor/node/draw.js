/** @module b3e */

(function () {
  "use strict";

  /**
   * Draw a node.
   */
  b3e.node.draw = function(node, settings) {
    var symbol = _makeSymbol(node, settings);

    var bounds = symbol.getBounds();
    var w = Math.max(bounds.width+15, node.display.width);
    var h = Math.max(bounds.height+15, node.display.height);
    node.display.width = w;
    node.display.height = h;

    var shape = _makeShape(node, settings);

    node.display.addChild(shape);
    node.display.addChild(symbol);

    node.display.shape = shape;
  };

  function _makeSymbol(node, settings) {
    var attrs = node.attributes;
    var title = attrs.getTitle();
    var symbolColor = settings.get('block_symbol_color');
    var symbol = _makeText(title, symbolColor);

    return symbol;
  }

  function _makeShape(node, settings) {
    // settings
    var anchorOffsetX = settings.get('anchor_offset_x');
    var anchorRadius = settings.get('anchor_radius');
    var anchorBg = settings.get('anchor_background_color');
    var anchorBorderWidth = settings.get('anchor_border_width');
    var borderColor = settings.get('block_border_color');
    var nodeColor = settings.get('composite_color');
    var nodeBorderWidth = settings.get('block_border_width');

    // variables
    var attrs = node.attributes;
    var category = attrs.category;

    var w = node.display.width;
    var h = node.display.height;
    var hasInAnchor = (category==='composite')||
                      (category==='output')||
                      (category==='modulator');
    var hasOutAnchor = (category==='root')||
                       (category==='composite')||
                       (category==='input')||
                       (category==='modulator');

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w/2+anchorOffsetX;
    } else {
      y = h/2+anchorOffsetX;
    }

    // create and draw the shape
    var shape = new createjs.Shape();
    if (hasInAnchor) {
      _drawAnchor(shape, -x, -y, 
                  anchorRadius,
                  anchorBg,
                  anchorBorderWidth,
                  borderColor);
    }
    if (hasOutAnchor) {
      _drawAnchor(shape, x, y, 
                  anchorRadius,
                  anchorBg,
                  anchorBorderWidth,
                  borderColor);
    }
    _drawRect(shape, w, h, 15, nodeColor, nodeBorderWidth, borderColor);

    return shape;
  }

  function _makeText(s, color) {
    var text = new createjs.Text(s, '18px Arial', color);
    text.textAlign = 'center';

    var bounds = text.getBounds();
    text.regY = bounds.height/2;

    return text;
  }

  function _drawAnchor(shape, x, y, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.drawCircle(x, y, radius);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  }

  function _drawRect(shape, w, h, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.drawRoundRect(-w/2, -h/2, w, h, radius);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  }
})();