;
(function(Highcharts) {

  function TickPositioner() {
    var _self;

    this.init = function() {
      _self = this;
      return this;
    };

    this.positioner = function(multiple) {
      this.multiple = multiple || false;

      return function(min, max) {
        if (typeof min === 'undefined' || min === null || typeof max === 'undefined' || max === null) {
          return;
        }
        var chart = this.chart;

        if (!multiple || !_self.zero_align) {
          return createArrayFromRange(min, max, 6);
        } else {
          if (!_self.maxminLookup) {
            // ----------------------------
            // Computed once for both axes
            // ----------------------------
            _self.maxminLookup = {};
            _self.maxmin = [];
            _self.axesCanon = [];
            
            for (var i in chart.axes) {
              var axis = chart.axes[i];
              if (axis.coll === "yAxis") {
                if (typeof axis.max === 'undefined' || axis.max === null || typeof axis.min === 'undefined' || axis.min === null) {
                  // Don't have min/max values for both axes yet.
                  // Clean up processed values from other axis.
                  _self.maxminLookup = undefined;
                  _self.maxmin = undefined;
                  _self.axesCanon = undefined;
                  // Exit. Process in next call.
                  return createArrayFromRange(min, max, 6);
                }
                _self.maxmin.push({ id: axis.options.index, min: axis.min, max: axis.max });
              }
            }
            
            for (var i in _self.maxmin) {
              _self.maxminLookup[_self.maxmin[i].id] = _self.maxmin[i];
            }
            _self.axesCanon = _self.maxminCanon();
          }

          var _min = _self.maxminLookup[this.options.index].min;
          var _max = _self.maxminLookup[this.options.index].max;
          
          // set 0 at top of chart 
          // ['----', '-0--', '---0']
          if (_self.axesCanon[0].min <= 0 && _self.axesCanon[0].max <= 0 && _self.axesCanon[1].min <= 0 && _self.axesCanon[1].max <= 0) {
            _max = 0;
          }
          // set 0 at bottom of chart
          // ['++++', '0+++', '++0+']
          else if (_self.axesCanon[0].min >= 0 && _self.axesCanon[0].max >= 0 && _self.axesCanon[1].min >= 0 && _self.axesCanon[1].max >= 0) {
            _min = 0;
          }
          // set min equal to the min/max fraction of smallest axis
          // ['-+-+', '-+++', '-+0+', '++-+', '0+-+']
          else if (_self.axesCanon[0].max == _self.axesCanon[1].max) {
            var idx = (_self.maxmin[0].min <= _self.maxmin[1].min) ? 0 : 1;
            var f = _self.maxmin[idx].min / _self.maxmin[idx].max;
            _min = f * _self.maxminLookup[this.options.index].max;
          }
          // set max equal to the max/min fraction of largest axis
          // ['-+--','-+-0',  '---+', '-0-+']
          else if (_self.axesCanon[0].min == _self.axesCanon[1].min) {
            var idx = (_self.maxmin[0].max > _self.maxmin[1].max) ? 0 : 1;
            var f = _self.maxmin[idx].max / _self.maxmin[idx].min;
            _max = f * _self.maxminLookup[this.options.index].min;
          }
          // set 0 at center of chart
          // ['--++', '-0++', '--0+', '-00+', '++--', '++-0', '0+--', '0+-0']
          else {
            if (_self.maxminLookup[this.options.index].min < 0) {
              _max = Math.abs(_min);
            } else {
              _min = 0 - _max;
            }
          }
          
          return createArrayFromRange(_min, _max, 6);
        }
      }
    };
  };

  TickPositioner.prototype.maxminCanon = function() {
    var canon = [];
    var extremes = ['min', 'max'];
    for (var i in this.maxmin) {
      canon[i] = {};
      for (var j in extremes) {
        if (this.maxmin[i][extremes[j]] === 0) {
          canon[i][extremes[j]] = 0;
        } else if (this.maxmin[i][extremes[j]] > 0) {
          canon[i][extremes[j]] = 1;
        } else {
          canon[i][extremes[j]] = -1;
        }
      }
    }
    return canon;
  };

  function createArrayFromRange(start, end, n) {
    var result = [];
    var increase = (end - start) / (n - 1);
    var i;
    
    for (i = start; i < end; i += increase) {
      result.push(correctFloat(i));
    }
    result.push(correctFloat(end));
    return result;
  }

  function correctFloat(num) {
    return parseFloat(
      num.toPrecision(3)
    );
  }

  Highcharts.Chart.prototype.callbacks.push(function(chart) {
    var tickPositioner = new TickPositioner().init();
    var multiple = (chart.axes.length > 2 ? true : false);
    tickPositioner.zero_align = true;
    for (var i in chart.axes) {
      if (chart.axes[i].coll === "yAxis") {
        chart.axes[i].update({
          tickPositioner: (tickPositioner.positioner(multiple))
        }, false);
      }
    }
    chart.redraw();
    chart.axes[0].update();
  });
}(Highcharts));
