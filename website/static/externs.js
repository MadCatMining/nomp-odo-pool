/**
 * @externs
 */

/**
 * @typedef {Object}
 */
var jQuery = {};

/**
 * @typedef {function(!string):!jQuery}
 */
jQuery.html;

/**
 * @typedef {function(!string):!jQuery}
 */
jQuery.attr;

/**
 * @typedef {function(!string):!jQuery}
 */
jQuery.hasClass;

/**
 * @typedef {function(!string):!jQuery}
 */
jQuery.addClass;

/**
 * @typedef {function(!string):!jQuery}
 */
jQuery.removeClass;

/**
 * @typedef {function(!string,!string,!Function):!jQuery}
 */
jQuery.on;

/**
 * @typedef {function(!(string|Array|Function|Object)):jQuery}
 */
var $ = {};

/**
 * @typedef {function(!string,!Function)}
 */
$.getJSON;

/**
 * @const
 */
var nv = {};

/**
 * @typedef {function(!Function):!Object}
 */
nv.addGraph;

/**
 * @const
 */
nv.models = {};

/**
 * @typedef {Object}
 */
nv.StackedAreaChart;

/**
 * @typedef {function(!Function):!nv.StackedAreaChart}
 */
nv.StackedAreaChart.x;

/**
 * @typedef {function(!Function):!nv.StackedAreaChart}
 */
nv.StackedAreaChart.y;

/**
 * @typedef {function(!Object):!nv.StackedAreaChart}
 */
nv.StackedAreaChart.margin;

/**
 * @typedef {function(!boolean):!nv.StackedAreaChart}
 */
nv.StackedAreaChart.useInteractiveGuideline;

/**
 * @typedef {function(!boolean):!nv.StackedAreaChart}
 */
nv.StackedAreaChart.clipEdge;

/**
 * @typedef {Object}
 */
nv.LineChart;

/**
 * @typedef {function(!Function):!nv.LineChart}
 */
nv.LineChart.x;

/**
 * @typedef {function(!Function):!nv.LineChart}
 */
nv.LineChart.y;

/**
 * @typedef {function(!Object):!nv.LineChart}
 */
nv.LineChart.margin;

/**
 * @typedef {function(!boolean):!nv.LineChart}
 */
nv.LineChart.useInteractiveGuideline;

/**
 * @typedef {Object}
 */
nv.MultiBarChart;

/**
 * @typedef {function(!Function):!nv.MultiBarChart}
 */
nv.MultiBarChart.x;

/**
 * @typedef {function(!Function):!nv.MultiBarChart}
 */
nv.MultiBarChart.y;

/**
 * @typedef {function():!nv.StackedAreaChart}
 */
nv.models.stackedAreaChart;

/**
 * @typedef {function():!nv.LineChart}
 */
nv.models.lineChart;

/**
 * @typedef {function():!nv.MultiBarChart}
 */
nv.models.multiBarChart;

/**
 * @const
 */
nv.utils = {};

/**
 * @typedef {function(!Function)}
 */
nv.utils.windowResize;

var d3 = {}

/**
 * @typedef {function(!string):!d3.Elements}
 */
d3.select;

/**
 * @typedef {Object}
 */
d3.Elements;

/**
 * @typedef {function(!Array):!Function}
 */
d3.Elements.datum;
