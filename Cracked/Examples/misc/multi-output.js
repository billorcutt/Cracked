/**
 * System multi_out - destination with a master volume w/ multi-channel support
 * @plugin
 * @category Miscellaneous
 * @param {Object} [userParams] map of optional values
 * @param {Number} [userParams.gain=1]
 * @param {Number} [userParams.channel=1]
 * @function
 * @memberof cracked
 * @name cracked#out
 * @public
 */

//there's also a multi out object that allows you to address individual outputs in a multichannel
//sound interface. the argument for multi_out is the index of the channel, starting w zero.

//here's a stereo example, accessing the first & second channels at 0 & 1.
__().adc().delay({feedback:0}).multi_out(0); //right
__().adc().delay({feedback:0}).multi_out(1); //left