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

//parameters : attack, decay, sustain, release
__().saw(30).adsr({id:"a2"}).dac().play();

//envelope arguments can be a param to the node constructor or the trigger method
__("#a2").adsr("trigger",[0.025,0.15,0.15,1]);