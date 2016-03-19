/**
 * Bitcrusher
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.frequency=0.1]
 * @param {Number} [params.bits=6]
*/

//create & connect a sampler to a bitcrusher (default settings) and then to dac (output volume 50%)
__().
    sampler({
  		path:"../../Sounds/various/gun-cock.wav",
  		loop:true
	}).
    bitcrusher().
    dac(0.5);

//start the sampler playing
__("sampler").start();