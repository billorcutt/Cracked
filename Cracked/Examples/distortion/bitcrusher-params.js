/**
 * Bitcrusher
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=0.1]
 * @param {Number} [params.bits=6]
*/

//decimate
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    bitcrusher({
  		bits:2,
  		frequency:0.01
	}).
    dac();

__("sampler").start();