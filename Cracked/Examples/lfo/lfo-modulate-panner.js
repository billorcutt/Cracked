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

//create saw->panner->dac
__().saw().panner().dac(0.25);
//create an lfo and connect it to modulate the panner
__().lfo({type:"square", modulates:"pan", frequency:1}).connect("panner").play();