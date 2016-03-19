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
__().sine(180).gain(0.75).dac(0.5);

//create an lfo and connect to the gain node
//slow sawtooth ramp
__().lfo({modulates:"gain",frequency:0.15,gain:1}).connect("gain");

//start
__("sine,lfo").start();