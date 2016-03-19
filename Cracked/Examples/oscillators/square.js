/**
 * Square Wave Oscillator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440]
 * @param {Number} [params.detune=0]
 * @param {String} [params.type=sine]
 */

//create & connect a square to output
//frequency of 180 and detune of 120
__().square({frequency:180,detune:120}).dac(.10);

//create a square with a frequency of 360
__().square(360).connect("dac");

//one more square - default frequency of 440
__().square().connect("dac");

//start all squares
__("square").start();

//shut up
//__("square").stop();

