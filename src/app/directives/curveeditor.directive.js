(function () {
  'use strict';

  angular
    .module('app')
    .directive('curveEditor', curveEditorDirective);

  curveEditorDirective.$inject = ['$window', '$parse'];
  function curveEditorDirective($window, $parse) {
    var directive = {
      restrict    : 'E',
      templateUrl : 'directives/curveeditor.html',
      link        : link,
      scope       : {
        ngModel        : '=',
        lockYDomain    : '=',
        lockXAxis      : '=',
        lockYAxis      : '=',
        disabledTypes  : '=',
        disableNew     : '=',
        disableEdition : '=',
        disableSnap    : '=',
        hidePointers   : '=',
      }
    };
    return directive;

    function link($scope, $element, $attrs, $ctrl) {
      var _selectedPointer = null;
      var _focus = null;
      var _model = $scope.ngModel || {};

      // D3 variables
      var d3;
      var svg;
      var g;
      var xScale;
      var yScale;
      var xAxisTicks;
      var yAxisTicks;
      var functions;
      var behaviors;
      var curveType = _model.type || 'linear';
      var xDomain   = JSON.parse(JSON.stringify(_model.xDomain || [0, 1]));
      var yDomain   = JSON.parse(JSON.stringify(_model.yDomain || [0, 1]));
      var data      = [
        {x:xDomain[0], y:yDomain[0]},
        {x:xDomain[1], y:yDomain[1]},
      ];
      var bell = {y:yDomain[1], std:0.1};
      
      var _data;
      if (curveType === 'bell') {
        _data = JSON.parse(JSON.stringify((_model.data || {})));
        if (typeof _data.y !== 'undefined') bell.y = _data.y;
        if (typeof _data.std !== 'undefined') bell.std = _data.std;

      } else {
        _data = JSON.parse(JSON.stringify((_model.data || [])));
        if (_data.length >= 2) {
          data = _data;
        }
      }

      // Parameters
      var margins   = {top:10, right:40, bottom:35, left:40};
      var rawWidth  = 720;
      var rawHeight = 405;
      var width     = rawWidth - margins.left - margins.right;
      var height    = rawHeight - margins.top - margins.bottom;
      var params    = {
        lockXDomain    : $scope.lockXDomain || false,
        lockYDomain    : $scope.lockYDomain || false,
        lockXAxis      : $scope.lockXAxis || false,
        lockYAxis      : $scope.lockYAxis || false,
        disabledTypes  : $scope.disabledTypes || [],
        disableNew     : $scope.disableNew || false,
        disableEdition : $scope.disableEdition || false,
        disableSnap    : $scope.disableSnap || false,
        hidePointers   : $scope.hidePointers || false,
      };

      // Scope
      $scope.controls = {
        type: curveType,
        x0: xDomain[0],
        x1: xDomain[1],
        y0: yDomain[0],
        y1: yDomain[1]
      };
      $scope._doChangeControls = _doChangeControls;
      $scope._doChangeCurve = _doChangeCurve;
      $scope._isCurveEnabled = function(curve) {
        if (params.disabledTypes)
          return params.disabledTypes.indexOf(curve) < 0;
        else
          return true;
      };

      $scope.params = params;

      _initialize();


      // ======================================================================
      // INITIALIZATION
      // ======================================================================
      function _initialize() {
        _focus = $element.find('input');
        _focus = _focus[_focus.length-1];

        d3 = $window.d3;
        if (!d3) {
          console.error('d3 has not been loaded.');
          return;
        }

        _initializeSVG();
        _initializeDraw();

        _draw();
        _updateModel();
      }

      function _initializeSVG() {
        svg = d3.select($element.find('svg')[0])
          .attr('width', rawWidth)
          .attr('height', rawHeight)
          .attr('viewBox', '0 0 '+rawWidth+' '+rawHeight)
          .attr('preserveAspectRatio', 'xMidYMid')
          .classed('curve-editor', true)
          .on('mousemove', _onSVGMouseMove)
          .on('mousedown', _onSVGMouseDown)
          .on('mouseup', _onSVGMouseUp);

        d3.select(_focus)
          .on('keydown', _onSVGKeydown);

        svg.append('g')
          .attr('transform', 'translate(0, '+(height+margins.top)+')')
          .classed('x-axis', true)
          .classed('axis', true);

        svg.append('g')
          .attr('transform', 'translate('+margins.left+', 0)')
          .classed('y-axis', true)
          .classed('axis', true);

        svg.append('rect')
          .attr('x', margins.left)
          .attr('y', margins.top)
          .attr('width', width)
          .attr('height', height)
          .classed('frame', true);

        g = svg.append('g');

        g.append('path').classed('guide', true);
        g.append('path').classed('curve', true);
        
        var controls = g.append('g');
        controls.classed('bell-controls', true);
        controls.append('circle')
          .attr('r', 2)
          .classed('bell-controls-anchor', true);
        controls.append('path')
          .classed('bell-controls-path', true);
        controls.append('circle')
          .attr('r', 4)
          .classed('bell-controls-handler', true)
          .on('mousedown', _onPointerMouseDown);
      }

      function _initializeDraw() {
        var _lastDatum = null;
        var _invalid = null;
        var baseX = function(d, i) {
          _invalid = !_isValidPosition(d, i);

          if (_invalid) {
            return xScale(_lastDatum.x);
          }
          _lastDatum = d;
          return xScale(d.x);
        };
        var baseY = function(d, i) {
          if (_invalid) {
            return yScale(_lastDatum.y);
          }
          return yScale(d.y);
        };

        functions = {
          linear: d3.svg.line()
            .x(baseX)
            .y(baseY)
            .interpolate('linear'),

          step: d3.svg.line()
            .x(baseX)
            .y(baseY)
            .interpolate('step'),

          smooth: d3.svg.line()
            .x(baseX)
            .y(baseY)
            .interpolate('monotone'),

          spline: d3.svg.line()
            .x(baseX)
            .y(baseY)
            .interpolate('basis'),

          bell: d3.svg.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); }),
        };
      }



      // ======================================================================
      // DRAW LOOP
      // ======================================================================
      function _draw() {
        xScale = d3.scale.linear()
          .domain(xDomain)
          .clamp(true)
          .range([margins.left, width+margins.left]);

        yScale = d3.scale.linear()
          .domain(yDomain)
          .clamp(true)
          .range([height+margins.top, margins.top]);

        _drawAxes();
        _drawCurve();
        _drawPointers();
        _drawBellControls();
      }

      function _drawCurve() {
        var d = (curveType==='bell'?_computeBellData():data);

        var curve = g.selectAll('.curve')
          .attr('d', functions[curveType](d));

        var guide = g.selectAll('.guide');
        if (curveType === 'spline') {
          guide
            .attr('d', functions.linear(data))
            .classed('hide', false);
        } else {
          guide.classed('hide', true);
        }
      }

      function _drawAxes() {
        var xAxis = d3.svg.axis()
          .scale(xScale)
          .ticks(10)
          .innerTickSize(-height)
          .outerTickSize(0)
          .orient('bottom');
        var yAxis = d3.svg.axis()
          .scale(yScale)
          .ticks(10)
          .innerTickSize(-width)
          .outerTickSize(0)
          .orient('left');

        var axis;
        axis = svg.selectAll('.x-axis')
          .call(xAxis);
        axis.selectAll('.tick')
          .classed('major', function(d, i) { return i%2===0; })
          .classed('minor', function(d, i) { return i%2!==0; });
        axis.selectAll('text')
          .attr('dy', '1em');

        axis = svg.selectAll('.y-axis')
          .call(yAxis);
        axis.selectAll('.tick')
          .classed('major', function(d, i) { return i%2===0; })
          .classed('minor', function(d, i) { return i%2!==0; });
        axis.selectAll('text')
          .attr('x', -7);


        xAxisTicks = xAxis.scale().ticks(xAxis.ticks()[0]);
        yAxisTicks = yAxis.scale().ticks(yAxis.ticks()[0]);
      }

      function _drawPointers() {
        if (params.hidePointers) return;

        var pointers = g.selectAll('.pointer')
          .data(data);

        if (curveType === 'bell') {
          pointers.style('opacity', 0);
          return;
        }

        pointers.enter()
          .append('circle')
            // .call(behaviors.drag)
            .attr('cx', function(d, i) { return xScale(d.x); })
            .attr('cy', function(d, i) { return yScale(d.y); })
            .attr('r', 4)
            .attr('data-i', function(d, i) { return i; })
            .classed('pointer', true)
            .on('mousedown', _onPointerMouseDown)
            .on('mouseenter', _onPointerMouseEnter)
            .on('mouseleave', _onPointerMouseLeave);

        pointers.transition()
          .duration(0)
          .attr('data-i', function(d, i) { return i; })
          .attr('cx', function(d, i) { return xScale(d.x); })
          .attr('cy', function(d, i) { return yScale(d.y); })
          .style('opacity', function(d, i) {
            return _isValidPosition(d, i)?1:0;
          });

        pointers.exit()
          .remove();
      }

      function _drawBellControls() {
        if (params.hidePointers) return;

        if (curveType !== 'bell') {
          g.selectAll('.bell-controls')
            .style('opacity', 0);
          return;
        }

        var anchorX = (xDomain[1]+xDomain[0])/2;
        var anchorY = (yDomain[1]+yDomain[0])/2;
        var handlerX = anchorX + bell.std*(xDomain[1]-xDomain[0])/2;
        var handlerY = anchorY;
        var handlerHeight = anchorY/5;

        g.selectAll('.bell-controls')
          .style('opacity', 1);

        g.selectAll('.bell-controls-anchor')
          .attr('cx', xScale(anchorX))
          .attr('cy', yScale(anchorY));

        g.selectAll('.bell-controls-path')
          .attr('d', functions.linear([{x:anchorX, y:anchorY},
                                       {x:handlerX, y:handlerY}]));

        g.selectAll('.bell-controls-handler')
          .attr('cx', xScale(handlerX))
          .attr('cy', yScale(handlerY));
      }



      // ======================================================================
      // EVENTS
      // ======================================================================
      function _onPointerMouseDown() {
        _focus.focus();
        _stopPropagation();

        if (curveType === 'bell') {
          g.select('.bell-controls-handler')
            .classed('dragging', true);
          return;
        }

        // Deselect previous selecter pointer
        if (_selectedPointer) {
          _selectedPointer.classed('selected', false);
        }

        // Get pointer under the mouse and add classes
        var pointer = d3.select(d3.event.target)
          .classed('selected', true)
          .classed('dragging', true);
        _selectedPointer = pointer;
      }
      function _onPointerMouseEnter() {
        d3.select(d3.event.target).classed('over', true);
      }
      function _onPointerMouseLeave() {
        d3.select(d3.event.target).classed('over', false);
      }
      function _onSVGMouseDown() {
        _focus.focus();

        if (curveType === 'bell') {
          return;
        }

        if (params.disableNew || params.disableEdition || params.hidePointers) {
          return;
        }

        // Insert a new pointer
        var x = xScale.invert(_getMouseX());
        var y = yScale.invert(_getMouseY());
        var last = data[data.length-1];

        var i;
        for (i=0; i< data.length; i++) {
          if (x < data[i].x || data === last) {
            data.splice(i, 0, {x:x, y:y});
            break;
          }
        }

        // Draw to create the new pointer
        _draw();

        // Select the new pointer
        if (_selectedPointer) {
          _selectedPointer
            .classed('selected', false)
            .classed('dragging', false);
        }
        _selectedPointer = d3.select('[data-i="'+i+'"]')
          .classed('selected', true)
          .classed('dragging', true);

        $scope.$apply(function() {
          _updateModel();
        });
      }
      function _onSVGMouseMove() {
        var button = (typeof d3.event.buttons !== 'undefined')?d3.event.buttons:d3.event.which;

        if (curveType === 'bell') {
          var handler = g.select('.bell-controls-handler');

          if (button && handler.classed('dragging') && !params.disableEdition && !params.hidePointers) {
            var x = xScale.invert(_getMouseX());
            var meanX = (xDomain[1]+xDomain[0])/2;
            x = Math.abs(x - meanX);
            x = 2*x/(xDomain[1]-xDomain[0]);
            bell.std = Math.max(0.01, x);
          }

          _draw();
          $scope.$apply(function() {
            _updateModel();
          });

          return;
        }

        // Drag pointer if button is pressed
        if (button && _selectedPointer && !params.disableEdition && !params.hidePointers) {
          var i = parseInt(_selectedPointer.attr('data-i'));
          var d = data[i];
            
          if (i !== 0 && i !== data.length-1 && !params.lockXAxis) {
            d.x = xScale.invert(_getMouseX());
            if (!params.disableSnap) {
              d.x = _snap(d.x, xAxisTicks, Math.abs(xDomain[0]-xDomain[1])/90);
            }
          }
          if (!params.lockYAxis) {
            d.y = yScale.invert(_getMouseY());
            if (!params.disableSnap) {
              d.y = _snap(d.y, yAxisTicks, Math.abs(yDomain[0]-yDomain[1])/90);
            }
          }

          _draw();

          $scope.$apply(function() {
            _updateModel();
          });

        // Disable drag if no button is pressed
        } else if (_selectedPointer) {
          // Guarantee to call mouse up
          _onSVGMouseUp();
        }
      }
      function _onSVGMouseUp() {
        _focus.focus();
        if (curveType === 'bell') {
          g.select('.bell-controls-handler')
            .classed('dragging', false);
          return;
        }

        if (_selectedPointer) {
          if (_selectedPointer.classed('dragging')) {
            var i = parseInt(_selectedPointer.attr('data-i'));
            var d = data[i];

            if (!_isValidPosition(d, i)) {
              _selectedPointer.remove();
              _selectedPointer = null;
              data.splice(i, 1);
              _draw();
            }
          }
          else {
            _selectedPointer.classed('dragging', false);
          }
        }
      }
      function _onSVGKeydown() {
        var key = d3.event.which;

        if (key === 46 && _selectedPointer) {
          var i = parseInt(_selectedPointer.attr('data-i'));

          if (i !== 0 && i !== data.length-1) {
            _selectedPointer.remove();
            _selectedPointer = null;
            data.splice(i, 1);
            _draw();
          }
        }

        $scope.$apply(function() {
          _updateModel();
        });
      }



      // ======================================================================
      // HELPERS
      // ======================================================================
      /**
       * Snap a value `v` fot some value in `list` if distance is lesser than
       * `factor`.
       */
      function _snap(v, list, factor) {
        for (var i=0; i<list.length; i++) {
          var z = list[i];
          if (Math.abs(v-z) < factor) {
            return z;
          }
        }

        return v;
      }

      /**
       * Tells if wether a position `d` if valid or not (this is attached to
       * the _selectedPointer).
       */
      function _isValidPosition(d, i) {
        if (!_selectedPointer || _selectedPointer.attr('data-i')!==(''+i))
          return true;
        
        if (i > 0 && d.x < data[i-1].x)
          return false;

        if (i < data.length-1 && d.x > data[i+1].x)
          return false;

        return true;
      }

      /**
       * Stop the propagation of the current event.
       */
      function _stopPropagation() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        d3.event.stopImmediatePropagation();
      }

      function _getMouseX() {
        var rect = svg[0][0].getBoundingClientRect();
        var pageX = d3.event.pageX||d3.event.clientX;
        return pageX-rect.left;
      }

      function _getMouseY() {
        var rect = svg[0][0].getBoundingClientRect();
        var pageY = d3.event.pageY||d3.event.clientY;
        return pageY-rect.top;
      }

      function _rescale(x, y) {
        var xF = xDomain[0];
        var yF = yDomain[0];
        var xT = x[0];
        var yT = y[0];
        var dFx = Math.abs(xDomain[0] - xDomain[1]);
        var dFy = Math.abs(yDomain[0] - yDomain[1]);
        var dTx = Math.abs(x[0] - x[1]);
        var dTy = Math.abs(y[0] - y[1]);

        for (var i=0; i<data.length; i++) {
          var d = data[i];

          d.x = ( (d.x-xF)/dFx )*dTx + xT;
          d.y = ( (d.y-yF)/dFy )*dTy + yT;
        }
      }

      function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      function _updateModel() {
        _model.xDomain = JSON.parse(JSON.stringify(xDomain));
        _model.yDomain = JSON.parse(JSON.stringify(yDomain));
        _model.type = curveType;
        if (curveType === 'bell') {
          _model.data = {std: bell.std};
        } else {
          _model.data = JSON.parse(JSON.stringify(data));
        }
      }

      function _computeBellData() {
        var x0 = xDomain[0];
        var x1 = xDomain[1];
        var step = (x1-x0)/500;
        var results = [];

        var meanX = (x1+x0)/2;
        var std = bell.std;

        var c1 = 1/(std*Math.sqrt(2*Math.PI));
        var c2 = 2*std*std;

        var minY = _gaussian(x0, meanX, c1, c2);
        var maxY = _gaussian(meanX, meanX, c1, c2);

        for (var x=x0; x<=(x1+step); x+=step) {
          var y = _gaussian(x, meanX, c1, c2);
          y = (y)/maxY;
          results.push({x:x, y:y});
        }

        return results;
      }

      function _gaussian(x, mean, c1, c2) {
        var d = (x-mean);
        return c1*Math.exp(-(d*d)/c2);
      }

      // ======================================================================
      // EVENTS
      // ======================================================================
      function _doChangeControls() {
        var x0 = parseInt($scope.controls.x0);
        var x1 = parseInt($scope.controls.x1);
        var y0 = parseInt($scope.controls.y0);
        var y1 = parseInt($scope.controls.y1);

        if (!_isNumber(x0) || !_isNumber(x1) ||
            !_isNumber(y0) || !_isNumber(y1) ||
            (x0 === x1) || (y0 === y1)) {
          return;
        }
        _rescale([x0, x1], [y0, y1]);
        xDomain[0] = x0;
        xDomain[1] = x1;
        yDomain[0] = y0;
        yDomain[1] = y1;

        _draw();
        _updateModel();
      }
      function _doChangeCurve() {
        curveType = $scope.controls.type;
        _draw();
        _updateModel();
      }
    }
  }
}());