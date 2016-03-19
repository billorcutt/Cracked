/**
 * Overdrive, waveshaper with additional parameters
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.drive=0.5]
 * @param {Number} [params.color=800]
 * @param {Number} [params.postCut=3000]
*/

//trebly overdrive
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    overdrive({
  		drive:50,
  		color:5000,
  		postCut:8000
	}).
    dac(0.25);

__("sampler").start();