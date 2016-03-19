/**
 * Convolver Reverb
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Boolean} [params.reverse=false] reverse reverb
 * @param {String} [params.path] path to impulse file. if no path, impulse is generated.
 * @param {Number} [params.seconds=3] if generated impulse, length in seconds.
 * @param {Number} [params.decay=2] if generated impulse, length of decay in seconds
 * @param {Function} [params.fn=buildImpulse] custom function to generate an impulse buffer
*/
__().
	sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    comb({
      feedback:1.18,
      cutoff:6000,
      damping:.8,
      delay:.025
    }).
    dac(.25).
    play();