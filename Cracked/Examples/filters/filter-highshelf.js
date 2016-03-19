/**
 * Highshelf Filter
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=440] frequency
 * @param {Number} [params.q=0] Q
 * @param {Number} [params.gain=0] gain
 */

//create & connect white noise and a highshelf filter
//(with a frequency of 880, gain of 1 & Q of 10) to output
__().
	white().
	highshelf({
		frequency:880,
  		q:10,
  		gain:1
	}).
	dac(0.25);

//connect to the previously created white noise and
//create a highshelf filter (with a frequency of 600)
// and connect to output
__("white").highshelf(600).connect("dac");

//connect to the previously created white noise and
//create a highshelf filter (default frequency 440)
// and connect to output
__("white").highshelf().connect("dac");

__("white").start();