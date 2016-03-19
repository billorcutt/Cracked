/**
 * Brown Noise
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.channels=1]
 * @param {Number} [params.length=1]
*/

//brown noise, default settings
__().brown().dac(0.5);

//2 seconds buffered & 2 channels.
//more channels & longer length = slower startup
__().brown({channels:2,length:2}).connect("dac");

//start it up
__.play();