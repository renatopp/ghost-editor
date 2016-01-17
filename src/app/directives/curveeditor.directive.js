(function () {
  'use strict';

  angular
    .module('app')
    .directive('curveEditor', curveEditorDirective);

  curveEditorDirective.$inject = ['$window'];
  function curveEditorDirective($window) {
    var directive = {
      restrict : 'E',
      templateUrl : 'directives/curveeditor.html',
      link     : link,
    };
    return directive;

    function link($scope, $element, $attrs) {
      var _selectedPointer = null;
      var _focus = null;

      // Scope
      $scope.controls = {
        type: 'linear',
        x0: 0,
        x1: 1,
        y0: 0,
        y1: 1
      };
      $scope._doChangeControls = _doChangeControls;
      $scope._doChangeCurve = _doChangeCurve;

      // D3 variables
      var d3;
      var svg;
      var g;
      var data;
      var xScale;
      var yScale;
      var curveType = 'linear';
      var xDomain = [0, 1];
      var yDomain = [0, 1];
      var xAxisTicks;
      var yAxisTicks;
      var functions;
      var behaviors;

      // Parameters
      var margins = {top:10, right:40, bottom:35, left:40};
      var rawWidth = 720;
      var rawHeight = 405;
      var width = rawWidth - margins.left - margins.right;
      var height = rawHeight - margins.top - margins.bottom;

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

        data = [
          {x:xDomain[0], y:yDomain[0]},
          {x:xDomain[1], y:yDomain[1]},
        ];

        _initializeSVG();
        _initializeDraw();

        _draw();
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
      }

      function _drawCurve() {
        var curve = g.selectAll('.curve')
          .attr('d', functions[curveType](data));

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
        var pointers = g.selectAll('.pointer')
          .data(data);
        
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



      // ======================================================================
      // EVENTS
      // ======================================================================
      function _onPointerMouseDown() {
        _focus.focus();
        _stopPropagation();

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
      }
      function _onSVGMouseMove() {
        var button = (typeof d3.event.buttons !== 'undefined')?d3.event.buttons:d3.event.which;

        // Drag pointer if button is pressed
        if (button && _selectedPointer) {
          var i = parseInt(_selectedPointer.attr('data-i'));
          var d = data[i];
            
          if (i !== 0 && i !== data.length-1) {
            d.x = xScale.invert(_getMouseX());
            d.x = _snap(d.x, xAxisTicks, Math.abs(xDomain[0]-xDomain[1])/90);
          }
          d.y = yScale.invert(_getMouseY());
          d.y = _snap(d.y, yAxisTicks, Math.abs(yDomain[0]-yDomain[1])/90);

          _draw();

        // Disable drag if no button is pressed
        } else if (_selectedPointer) {
          // Guarantee to call mouse up
          _onSVGMouseUp();
        }
      }
      function _onSVGMouseUp() {
        _focus.focus();
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

      // ======================================================================
      // EVENTS
      // ======================================================================
      function _doChangeControls() {
        var x0 = parseInt($scope.controls.x0);
        var x1 = parseInt($scope.controls.x1);
        var y0 = parseInt($scope.controls.y0);
        var y1 = parseInt($scope.controls.y1);

        if (!_isNumber(x0) || !_isNumber(x1) ||
            !_isNumber(y0) || !_isNumber(y1)) {
          return;
        }
        _rescale([x0, x1], [y0, y1]);
        xDomain[0] = x0;
        xDomain[1] = x1;
        yDomain[0] = y0;
        yDomain[1] = y1;

        _draw();
      }
      function _doChangeCurve() {
        curveType = $scope.controls.type;
        _drawCurve();
      }
    }
  }
}());