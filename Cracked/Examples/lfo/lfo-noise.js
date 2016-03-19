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

//lfo with pink noise as its type.
__().
    lfo({type:"pink",gain:5000,modulates:"detune"}).
    sine(180).
    dac(0.25);

//start it up
__("sine,lfo").start();