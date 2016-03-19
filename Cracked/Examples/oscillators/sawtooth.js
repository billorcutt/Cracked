/**
 * Sawtooth Wave Oscillator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440]
 * @param {Number} [params.detune=0]
 * @param {String} [params.type=sine]
 */

//create & connect a sawtooth to output
//frequency of 180 and detune of 120
__().saw({frequency:180,detune:120}).dac(.15);

//shorthand param- if just one numerical argument, then it sets frequency
//create a sawtooth with a frequency of 360
__().saw(360).connect("dac");

//one more sawtooth - default frequency of 440
__().saw().connect("dac");

//start all sawtooths
__("saw").start();

//enough already
//__("saw").stop();