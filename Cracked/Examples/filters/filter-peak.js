/**
 * Peaking Filter
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440] frequency
 * @param {Number} [params.q=0] Q
 * @param {Number} [params.gain=0] gain
*/

//create & connect white noise and
//peaking filter with a frequency of 
//1200 and q of 30 to a dac
__().
	white().
	peaking({
		frequency:800,
  		q:30,
  		gain:1
	}).
	dac(.25);

//connect to the previously created white noise and
//create a peaking filter (with a frequency of 600)
// and connect to output
__("white").peaking(300).connect("dac");

//connect to the previously created white noise and
//create a peaking filter (default frequency 440)
// and connect to output
__("white").peaking().connect("dac");

__("white").start();