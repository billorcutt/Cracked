//set up a sine with a delay 
__().sine(300).delay().compressor({release:.01}).dac(0.5);

//lfo's modulating the delay time & feedback parameters of the delay
__().lfo({type:"sine",modulates:"feedback",frequency:.05,gain:1}).connect("delay");	
__().lfo({modulates:"delay",frequency:15,gain:0.015,id:"lfo1"}).connect("delay");

//another lfo modulating the frequency the 2nd lfo above
__().lfo({modulates:"frequency",frequency:0.01,gain:0.5}).connect("#lfo1");

//start it up
__("sine,lfo").start();