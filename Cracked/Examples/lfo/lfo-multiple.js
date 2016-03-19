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
//set master gain to .25
__().lfo({
  		frequency:4,
  		type:"sine",
  		gain:10,
  		id:"lfo1"
	}).sine().
	dac(.25);

//create & connect an lfo to the first lfo
//modulate the gain
__().lfo({
		frequency:.1,
  		modulates:"gain",
  		gain:50,
  		type:"sine"
	}).
	connect("#lfo1");

//start
__("sine,lfo").start();