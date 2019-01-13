/**
 * adc - system in — input with a master volume
 * @plugin
 * @category Miscellaneous
 * @param {Number} [params=1] system in gain
 * @function
 * @memberof cracked
 * @name cracked#adc
 * @public
 */

/**
 * dac - system out — destination with a master volume. Output is clipped if gain is 1 or less.
 * @plugin
 * @category Miscellaneous
 * @param {Number} [params=1] system out gain
 * @function
 * @memberof cracked
 * @name cracked#dac
 * @public
 */

//*adc = analog to digital convertor, dac = digital to analog converter

//input (adc) and output (dac)* are singletons-
//they can only be created once per script (you 
//can invoke them multiple times but they will 
//always point to the same instance). 

//example - input into delay into output
//both objects take an optional argument that sets 
//the level. (default is 1)
__().adc(0.25).delay({feedback:0}).dac(0.75);

//there's also "out" object which is an alias for dac if you wanna avoid acronyms.
__().adc(0.25).delay({feedback:0}).out(0.75);