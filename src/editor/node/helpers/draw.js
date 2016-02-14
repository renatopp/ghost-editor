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
    node.display.width = 300;
    node.display.height = symbol.$height;

    var image = _makeImage(node, settings);
    var shape = _makeShape(node, settings, symbol);

    node.display.addChild(shape);
    node.display.addChild(symbol);
    node.display.addChild(image);

    node.display.shape = shape;
  };

  function _makeSymbol(node, settings) {
    var w = 300;//node.display.width;
    var h = 150;//node.display.height;

    var title = node.getTitle();
    var name = node.name;
    var color = settings.get('block_symbol_color');
    var x = 0;
    var y = 0;

    var txtTitle = _makeText(title, x, y, '22px', color, null, 20);
    var txtName = _makeText(name, x, y+30, '18px', color, null, 25);

    var container = new createjs.Container();
    container.addChild(txtTitle);
    container.addChild(txtName);
    y += 70;

    var hasProperties = false;
    var properties = node.properties;
    Object.keys(properties).forEach(function(key) {
      hasProperties = true;
      var property = properties[key];
      var txtKey = _makeText(property.name, x, y, '18px');
      var txtValue = _makeText(property.toValue(), w-20, y, '16px', color, 'right');
      container.addChild(txtKey);
      container.addChild(txtValue);
      y += txtKey.getBounds().height + 10;
    });
    
    if (hasProperties) {
      y += 10;
    }
    // container.regY = -container.$height/2;
    container.$height = y;
    container.$hasProperty = hasProperties;

    container.x = -w/2+10;
    container.y = -y/2+10;
    return container;
  }

  function _makeImage(node, settings) {
    var w = node.display.width;
    var h = node.display.height;

    var path = 'imgs/nodes_svg/'+node.category+'s/'+node.name+'.svg';
    if (node.image) {
      path = 'imgs/nodes_svg/'+node.image+'.svg';
    }
    var bitmap = new createjs.Bitmap(path);
    bitmap.scaleX = 0.5;
    bitmap.scaleY = 0.5;
    bitmap.regX = 121;
    bitmap.x = w/2-10;
    bitmap.y = -h/2+5;
    bitmap.alpha = 0.7;
    
    return bitmap;
  }

  function _makeShape(node, settings, symbol) {
    // settings
    var anchorOffsetX = settings.get('anchor_offset_x');
    var anchorRadius = settings.get('anchor_radius');
    var anchorBg = settings.get('anchor_background_color');
    var anchorBorderWidth = settings.get('anchor_border_width');
    var borderColor = settings.get('block_border_color');
    var nodeColor = settings.get('composite_color');
    var nodeBorderWidth = settings.get('block_border_width');

    // variables
    var category = node.category;

    var w = 300;//node.display.width;
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


    // body
    _drawRect(shape, 0, 0, w, h, 10, nodeColor, nodeBorderWidth, borderColor);

    // header
    if (symbol.$hasProperty) {
      _drawRect(shape, 0, -h/2+35, w, 70, [10, 10, 0, 0], nodeColor, nodeBorderWidth, borderColor);
    } else {
      _drawRect(shape, 0, -h/2+35, w, 70, 10, nodeColor, nodeBorderWidth, borderColor);
    }

    return shape;
  }

  // function _makeText(s, color) {
  //   var text = new createjs.Text(s, '18px Arial', color);
  //   text.textAlign = 'center';

  //   var bounds = text.getBounds();
  //   text.regY = bounds.height/2;

  //   return text;
  // }

  function _makeText(s, x, y, size, color, align, limit) {
    limit = limit || 15;
    if (s.length > limit) {
      s = s.substring(0, limit-2) + '...';
    }

    var text = new createjs.Text(s, (size||'18px')+' Arial', color||'#333');
    text.x = x;
    text.y = y;
    text.textAlign = align||'left';

    // var bounds = text.getBounds();
    // text.regY = bounds.height/2;
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

  function _drawRect(shape, x, y, w, h, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    if (Array.isArray(radius)) {
      shape.graphics.drawRoundRectComplex(
        x-w/2,
        y-h/2,
        w,
        h,
        radius[0],
        radius[1],
        radius[2],
        radius[3]
      );
    } else {
      shape.graphics.drawRoundRect(x-w/2, y-h/2, w, h, radius);
    }
    shape.graphics.endStroke();
    shape.graphics.endFill();
  }
})();