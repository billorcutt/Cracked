/**
 * Low Frequency Oscillator
 *
 * @plugin
 * @param {Object} [userParams] map of optional values
 * @param {String} [userParams.modulates=frequency]
 * @param {String} [userParams.type=saw]
 * @param {Number} [userParams.frequency=6]
 * @param {Number} [userParams.gain=1000]
*/

//create sine & gain nodes and connect to output
__().sine(180).gain().dac(0.5);

//cheap tremolo effect
__().lfo({modulates:"gain",frequency:10,gain:1,type:"triangle"}).connect("gain");

//start
__("sine,lfo").start();