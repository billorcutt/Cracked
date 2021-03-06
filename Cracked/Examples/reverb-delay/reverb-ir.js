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

//reverb using an impulse response
__().
    sampler({
  		path:"../../Sounds/various/stein.mp3"
	}).
    reverb({
  		path:"../../Sounds/ir/hall.wav"
	}).
    dac().
    play();