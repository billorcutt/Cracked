/**
 * Ring Modulator
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.distortion=1]
 * @param {Number} [params.frequency=30]
*/

//create a sampler and connect to output
//ring modulator - default settings - frequency : 30, distortion : 1
__().
    sampler({
        path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    ring({frequency:2000,distortion:50}).
    dac(0.25);

__("sampler").start();