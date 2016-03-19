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

//ramp frequency on a lowpass filter
__().sine().lowpass({q:20,frequency:100}).dac();

__("sine,lfo").start();

setInterval(function(){
    //parameters: target, time (in secs), param to ramp &amp; init value (optional)
    //initialize lowpass to 1000 then ramp the frequency
    //to 100 in .25 seconds.  
	__("lowpass").ramp(100,.25,"frequency",1000);
},1000);