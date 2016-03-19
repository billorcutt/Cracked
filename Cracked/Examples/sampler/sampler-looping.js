/**
 * Sampler - sound file player
 *
 * @plugin
 * @param {Object} [userParams] map of optional values
 * @param {Number} [userParams.speed=1]
 * @param {Number} [userParams.start=1]
 * @param {Number} [userParams.end=1]
 * @param {String} [userParams.path=''] path to sound file to play
 * @param {Boolean} [userParams.loop=false]
*/

//same as above but looping

__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:"true"
	}).
    dac();

//set the speed of the sampler
//uncomment to see it in action
//__("sampler").speed(0.25)

__("sampler").start();