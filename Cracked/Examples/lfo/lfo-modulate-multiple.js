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

//create & connect a sine to output
//default frequency = 440
//set master gain to .25
__().sine().gain(.5).dac(.25);

//create a 2nd sine with double the frequency
__().sine(880).gain(.25).connect("dac");

//connect an lfo to both sines
__().lfo({frequency:4,type:"sine",gain:20}).connect("sine");

//start
__("sine,lfo").start();