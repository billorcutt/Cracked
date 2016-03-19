//brown noise as a modulation source
__().brown().gain({modulates:"frequency",gain:1000}).sine().dac(0.25);

//lfo modulates the gain
__().lfo({frequency:1/8,modulates:"gain",type:"sine"}).connect("gain");

//start it up
__("sine,lfo,brown").start();