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

//target & time can be arrays of values

//set up some sounds
__().saw(180).gain(0).dac();

//start the saw
__("saw").start();

//ramp from 0 to 1 then back again in 1 second; do it four times
__("gain").ramp(
    [1,0,1,0,1,0,1,0],
    [1/2,1/2,1/2,1/2,1/2,1/2,1/2,1/2],
    "gain",
    0
);