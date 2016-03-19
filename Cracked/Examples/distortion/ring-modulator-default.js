/**
 * Ring Modulator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.distortion=1]
 * @param {Number} [params.frequency=30]
 */

//ring modulator - default settings - frequency : 30, distortion : 1
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    ring().
    dac(0.25);

__("sampler").start();