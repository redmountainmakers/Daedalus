## [rd3](https://github.com/yang-wei/rd3) (forked from [react-d3](https://github.com/esbullington/react-d3))
Modular ReactJS charts made using d3 chart utilities.

[![npm version](https://badge.fury.io/js/rd3.svg)](https://badge.fury.io/js/rd3)

## Usage

The latest version of rd3 requires **React 0.14 or later**. If you are using older React version, please refer to [here](https://github.com/yang-wei/rd3/releases/tag/v0.5.3)

### unpkg
Thanks to [unpkg](https://unpkg.com/) you can now try out rd3 quickly:

 * https://unpkg.com/rd3/build/public/js/react-d3.js
 * https://unpkg.com/rd3/build/public/js/react-d3.min.js

Note: rd3 depends on react and d3, you will need to include those scripts if you aren't yet.

 * https://unpkg.com/react/dist/react.min.js
 * https://unpkg.com/react-dom/dist/react-dom.min.js
 * https://unpkg.com/d3

You can refer to [fiddle example](https://yang-wei.github.io/rd3/docs/new/charts/areaChart.html) too.

### NPM
Or via `npm`:

If you havn't installed `react` and `d3` then:

```
npm install react react-dom
npm install d3
```

```
npm install rd3
```

Then, import into your ReactJS project:

```js
var rd3 = require('rd3');
// es6
import rd3 from 'rd3';
```

The charts are then available under the `rd3` namespace, which you can then use as shown on the [documentation](https://yang-wei.github.io/rd3/):

### Available Charts

```js
const BarChart = rd3.BarChart;
const LineChart = rd3.LineChart;
const PieChart = rd3.PieChart;
const AreaChart = rd3.AreaChart;
const Treemap = rd3.Treemap;
const ScatterChart = rd3.ScatterChart;
const CandleStickChart = rd3.CandleStickChart;
```

For usage, please see [here](https://yang-wei.github.io/rd3).

### Support

* Chat: [![Join the chat at https://gitter.im/esbullington/react-d3](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/esbullington/react-d3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
* Issues: [rd3 issues](https://github.com/yang-wei/rd3/issues) on Github

### Background
Although there have been [several](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/) [different](http://bl.ocks.org/milroc/d22bbf92231876505e5d) approaches proposed for combining the power of d3 with the flexibility and modularity of ReactJS, the approach I'm using here was inspired by [this blog post](http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/) by Ben Smith of [Binary Consulting](http://10consulting.com/).

With this approach, React itself is responsible for generating the SVG markup.  d3.js is used for its tremendous collection of utility functions, such as those that calculate the `path` value for various chart types.

### License
MIT

Copyright (c) 2014-2016 Eric. S Bullington, Lim Yang Wei, and project [contributors](https://github.com/yang-wei/rd3/graphs/contributors)
