/**
 * Overdrive, waveshaper with additional parameters
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.drive=0.5]
 * @param {Number} [params.color=800]
 * @param {Number} [params.postCut=3000]
*/

//crank the drive to 100
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    overdrive(100).
    dac(0.25);

__("sampler").start();