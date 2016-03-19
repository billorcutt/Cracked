/**
 * Public method to ramp a parameter on currently selected nodes
 * Target & timeToRamp parameters can be numbers or arrays of numbers
 * for multisegement ramps. Initial value param is optional, if
 * omitted, then the current value is used as the initial value.
 * If loop is running, then ramp start times are snapped to the
 * sequencer grid.
 *
 * @function
 * @public
 * @param {Number|Array} target value to ramp to
 * @param {Number|Array} timeToRamp length of ramp in seconds
 * @param {String} paramToRamp name of parameter to ramp
 * @param {Number} initial value to start the ramp at
 *
 */

//ramp multiple parameters on multiple nodes
__().sine(1000).gain(0).dac();

__("sine").start();

//init frequency on sine to 1000, then ramp to 80 in 5 secs,
//then ramp back to 1000 in 5 more
__("sine").ramp([80,1000],[5,5],"frequency",1000);

//init gain on the gain node to 0, then ramp to 1 in 5 secs,
//then ramp back to 0 in another 5 secs
__("gain").ramp([1,0],[5,5],"gain",0);