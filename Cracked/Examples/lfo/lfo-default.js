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

//create & connect an lfo to a sine and then to output
//lfo defaults: type=sawtooth, frequency=6, gain=1000, modulates=frequency
__().lfo().sine().dac(.15);

//start up lfo &amp; sine
__("sine,lfo").start();