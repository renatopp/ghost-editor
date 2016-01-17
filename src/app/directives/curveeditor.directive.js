(function () {
  'use strict';

  angular
    .module('app')
    .directive('curveEditor', curveEditorDirective);

  curveEditorDirective.$inject = ['$window'];
  function curveEditorDirective($window) {
    var directive = {
      restrict : 'E',
      template : '<svg></svg>',
      link     : link,
    };
    return directive;

    function link($scope, $element, $attrs) {
      var _selectedPointer = null;

      // D3 variables
      var d3;
      var svg;
      var g;
      var data;
      var xScale;
      var yScale;
      var xDomain = [0, 1];
      var yDomain = [0, 1];
      var functions;
      var behaviors;

      // Parameters
      var margins = {top:40, right:40, bottom:40, left:40};
      var rawWidth = 720;
      var rawHeight = 405;
      var width = rawWidth - margins.left - margins.right;
      var height = rawHeight - margins.top - margins.bottom;

      _initialize();
      function _initialize() {
        d3 = $window.d3;
        if (!d3) {
          console.error('d3 has not been loaded.');
          return;
        }

        data = [
          {x:0, y:0},
          {x:0.5, y:0.5},
          {x:1, y:1},
        ];

        _initializeSVG();
        _initializeDraw();

        _draw();
      }

      function _initializeSVG() {
        svg = d3.select($element.children()[0])
          .attr('width', rawWidth)
          .attr('height', rawHeight)
          .attr('tabindex', 1)
          .attr('viewBox', '0 0 '+rawWidth+' '+rawHeight)
          .attr('preserveAspectRatio', 'xMidYMid')
          .classed('curve-editor', true)
          .on('keydown', _onSVGKeydown)
          .on('mousemove', _onSVGMouseMove)
          .on('mousedown', _onSVGMouseDown)
          .on('mouseup', _onSVGMouseUp);

        svg.append('g')
          .attr('transform', 'translate(0, '+(height+margins.top)+')')
          .classed('x-axis', true)
          .classed('axis', true)
          .classed('minor', true);
        svg.append('g')
          .attr('transform', 'translate(0, '+(height+margins.top)+')')
          .classed('x-axis', true)
          .classed('axis', true)
          .classed('major', true);

        svg.append('g')
          .attr('transform', 'translate('+margins.left+', 0)')
          .classed('y-axis', true)
          .classed('axis', true)
          .classed('minor', true);
        svg.append('g')
          .attr('transform', 'translate('+margins.left+', 0)')
          .classed('y-axis', true)
          .classed('axis', true)
          .classed('major', true);

        g = svg.append('g');

        g.append('path')
          .classed('curve', true);
      }

      function _initializeDraw() {
        var _lastDatum = null;
        var _invalid = null;

        functions = {
          linear: d3.svg.line()
            .x(function(d, i) {
              _invalid = !_isValidPosition(d, i);

              if (_invalid) {
                return xScale(_lastDatum.x);
              }
              _lastDatum = d;
              return xScale(d.x);
            })
            .y(function(d, i) {
              if (_invalid) {
                return yScale(_lastDatum.y);
              }
              return yScale(d.y);
            })
            .interpolate('linear'),
        };
      }






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
          .attr('d', functions.linear(data));
      }

      function _drawAxes() {
        var xAxisMajor = d3.svg.axis()
          .scale(xScale)
          .ticks(5)
          .innerTickSize(-height)
          .orient('bottom');
        var xAxisMinor = d3.svg.axis()
          .scale(xScale)
          .ticks(10)
          .innerTickSize(-height)
          .orient('bottom');

        var yAxisMajor = d3.svg.axis()
          .scale(yScale)
          .ticks(5)
          .innerTickSize(-width)
          .orient('left');
        var yAxisMinor = d3.svg.axis()
          .scale(yScale)
          .ticks(10)
          .innerTickSize(-width)
          .orient('left');

        svg.selectAll('.x-axis.major')
          .call(xAxisMajor)
          .selectAll('text')
            .attr('dy', '1em');

        svg.selectAll('.x-axis.minor').call(xAxisMinor);
        
        svg.selectAll('.y-axis.major')
          .call(yAxisMajor)
          .selectAll('text')
            .attr('x', -7);

        svg.selectAll('.y-axis.minor').call(yAxisMinor);
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

      function _isValidPosition(d, i) {
        if (!_selectedPointer || _selectedPointer.attr('data-i')!==(''+i))
          return true;
        
        if (i > 0 && d.x < data[i-1].x)
          return false;

        if (i < data.length-1 && d.x > data[i+1].x)
          return false;

        return true;
      }
      function _stopPropagation() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        d3.event.stopImmediatePropagation();
      }

      function _onPointerMouseDown() {
        svg[0][0].focus();
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
        // Insert a new pointer
        var x = xScale.invert(d3.event.pageX-svg[0][0].offsetLeft);
        var y = yScale.invert(d3.event.pageY-svg[0][0].offsetTop);
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
        var button = d3.event.which;

        // Drag pointer if button is pressed
        if (button && _selectedPointer) {
          var i = parseInt(_selectedPointer.attr('data-i'));
          var d = data[i];
          
          if (i !== 0 && i !== data.length-1) {
            d.x = xScale.invert(d3.event.pageX-svg[0][0].offsetLeft);
          }
          d.y = yScale.invert(d3.event.pageY-svg[0][0].offsetTop);

          _draw();

        // Disable drag if no button is pressed
        } else if (_selectedPointer) {
          // Guarantee to call mouse up
          _onSVGMouseUp();
        }
      }
      function _onSVGMouseUp() {
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

        console.log('Pointer:', _selectedPointer);
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

    }
  }
}());