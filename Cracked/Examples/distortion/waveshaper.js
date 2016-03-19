/**
 * Native Waveshaper
 * @param {Object} [userParams] map of optional values
 * @param {Number} [userParams.drive=50]
*/

//crank the drive to 100
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    waveshaper(100).
    dac(0.25);

__("sampler").start();