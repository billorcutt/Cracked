/**
 * Delay
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.delay=1] delay time in seconds
 * @param {Number} [params.damping=0.84] feedback input gain
 * @param {Number} [params.cutoff=1500] frequency of lowpass filtering on feedback loop
 * @param {Number} [params.feedback=0.5] feedback gain output
*/

//delay with default settings
__().
    sampler({
  		path:"../../Sounds/various/stein.mp3"
	}).
    delay().
    dac().
    play();