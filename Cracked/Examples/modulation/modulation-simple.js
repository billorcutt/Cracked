//simple frequency modulation
//the "modulates" parameter on the gain tells it to connect
//to the frequency audio param of the 2nd sine.
__().sine(0.1).gain({gain:100,modulates:"frequency"}).sine().dac(0.25);

//start up the sines
__("sine").start();