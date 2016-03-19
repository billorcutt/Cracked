//input (adc) and output (dac)* are singletons- 
//they can only be created once per script (you 
//can invoke them multiple times but they will 
//always point to the same instance). 

//example - input into delay into output
//both objects take an optional argument that sets 
//the level. (default is 1)
__().adc(0.25).delay({feedback:0}).dac(0.75);

//*adc = analog to digital convertor, dac = digital to analog converter


