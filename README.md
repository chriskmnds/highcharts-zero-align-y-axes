# Highcharts: zero-align y-axes

Highcharts extension that zero-aligns the scales of primary and secondary y-axes.

## Description

The extension adds a new tick positioner that aligns the scales of primary and secondary y-axes. Defaults to a minimal tick positioner in case of a single y-axis. Axes are aligned as follows:

### All-positive scales

i.e. scales whose min max values are both +ve.

**Alignment**: Zero (0) set at the bottom of the chart. Consider the example:

Original Chart             |  Extended Chart
:-------------------------:|:-------------------------:
![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_1_original.png "Original Chart") | ![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_1_extended.png "Extended Chart")

### All-negative scales

i.e. scales whose min max values are both -ve.

**Alignment**: Zero (0) set at the top of the chart.

### At least one y-axis with both -ve and +ve values

i.e. primary y: [min:-ve, max:+ve], secondary y2: [min:-ve, max:+ve].

**Alignment**: Min of both axes set equal to the min/max fraction of the axis with the smallest min. Consider the example:

Original Chart             |  Extended Chart
:-------------------------:|:-------------------------:
![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_2_original.png "Original Chart") | ![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_2_extended.png "Extended Chart")

### One y-axis with all -ve values and the other with both -ve and +ve values

i.e. primary y: [min:-ve, max:-ve], secondary y2: [min:-ve, max:+ve].

**Alignment**: Max of both axes set equal to the max/min fraction of the axis with the largest max. Consider the example:

Original Chart             |  Extended Chart
:-------------------------:|:-------------------------:
![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_3_original.png "Original Chart") | ![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_3_extended.png "Extended Chart")

### Non-overlaping scales 

i.e. scales that are in the opposite extremes e.g. primary y: [min:-ve, max:-ve], secondary y2: [min:+ve, max:+ve].

**Alignment**: Zero (0) set at the center of the chart. Consider the example:

Original Chart             |  Extended Chart
:-------------------------:|:-------------------------:
![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_4_original.png "Original Chart") | ![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-zero-align-y-axes/master/snapshots/example_4_extended.png "Extended Chart")


## Usage/Demo

See working [plunker](http://plnkr.co/edit/rwanoyydu6LbDBx2lf1l?p=preview "Plunker Demo") for a live demo. You may activate/deactivate the alignment by toggling the variable *tickPositioner.zero_align*.

## Compatibility

Compatible with Highcharts 4.1.7 and earlier.

## License

MIT
