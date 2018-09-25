//input (adc) and output (dac)* are singletons- 
//they can only be created once per script (you 
//can invoke them multiple times but they will 
//always point to the same instance). 

//example - input into delay into output
//both objects take an optional argument that sets 
//the level. (default is 1)
__().adc(0.25).delay({feedback:0}).dac(0.75);

//*adc = analog to digital convertor, dac = digital to analog converter


//there's also "out" object which is an alias for dac if you wanna avoid acronyms.
__().adc(0.25).delay({feedback:0}).out(0.75);


//there's also a multi out object that allows you to address individual outputs in a multichannel
//sound interface. the argument for multi_out is the index of the channel, starting w zero.

//here's a stereo example, accessing the first & second channels at 0 & 1.
__().adc().delay({feedback:0}).multi_out(0);
__().adc().delay({feedback:0}).multi_out(1);