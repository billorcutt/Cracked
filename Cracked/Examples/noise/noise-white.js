/**
 * White Noise
 *
 * @plugin
 * @param {Object} [params] map of optional values
 * @param {Number} [params.channels=1]
 * @param {Number} [params.length=1]
*/

//defaults to 1 channel & 1 seconds of buffered noise
__().white().dac(0.5);

//2 seconds buffered & 2 channels.
//more channels & longer length = slower startup
__().white({channels:2,length:2}).connect("dac");

//start it up
__.play();