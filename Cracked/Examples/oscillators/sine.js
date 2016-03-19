/**
 * Sine Wave Oscillator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440]
 * @param {Number} [params.detune=0]
 * @param {String} [params.type=sine]
 */

//create & connect a sine to output
//frequency of 180 and detune of 120
__().sine({frequency:180,detune:120}).dac(.25);

//create a sine with a frequency of 360
__().sine(360).connect("dac");

//one more sine - default frequency of 440
__().sine().connect("dac");

//start all sines
__("sine").start();

//enough already
//__("sine").stop();