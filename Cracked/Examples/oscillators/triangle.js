/**
 * Triangle Wave Oscillator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440]
 * @param {Number} [params.detune=0]
 * @param {String} [params.type=sine]
 */

//create &amp; connect a triangle to output
//frequency of 180 and detune of 120
__().triangle({frequency:180,detune:120}).dac(.25);

//create a triangle with a frequency of 360
__().triangle(360).connect("dac");

//one more triangle - default frequency of 440
__().triangle().connect("dac");

//start all triangles
__("triangle").start();