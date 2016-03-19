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

//set up a sine with a delay
__().sine(300).delay().dac(.25);

//lfo modulating the delay time & feedback parameters of the delay
__().lfo({type:"sine",modulates:"feedback",frequency:.5,gain:1}).connect("delay");
__().lfo({type:"sine",modulates:"delay",frequency:15,gain:.015}).connect("delay");

__("sine,lfo").start();