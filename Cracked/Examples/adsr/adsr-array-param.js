/**
 * Attack Decay Sustain Release envelope
 *
 * @plugin
 * @param {Array} [userParams] 5 values: attack,decay,sustain,hold,release
 * @param {Array}  [userParams] 4 values: attack,decay,sustain,release
 * @param {Array} [userParams] 3 values: attack,decay,sustain (holds until released)
 * @param {String} [userParams] "slow" or "fast"
 * @param {Number} [userParams=0.5] length of the total envelope
 */

//adsr parameters : attack, decay, sustain, hold, release (in seconds)
__().sine(80).adsr([1,1,0.35,1,2.25]).gain(1/3).dac(0.25);

__().sine(880).adsr([1.2,0.8,0.5,0.5,2.5]).gain(1/3).connect("dac");

__().sine(1760).adsr([2,1,0.35,1,2]).gain(1/3).connect("dac");

//start the oscillators
__.play();

//trigger all the envelopes at once
__("adsr").adsr("trigger");