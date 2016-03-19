/**
 * Pink Noise
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.channels=1]
 * @param {Number} [params.length=1]
*/

//pink noise, with default settings
__().pink().dac(0.5);

//2 seconds buffered & 2 channels.
//more channels & longer length = slower startup
__().pink({channels:2,length:2}).connect("dac");

//start it
__.play();