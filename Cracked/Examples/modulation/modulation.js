//the "modulates" parameter on the gain tells it to connect
//to the frequency audio param of the 2nd sine.
__().sine(0.1).gain({gain:100,modulates:"frequency"}).sine().dac(0.15);

//same as the line above, but add a delay after the gain
__().sine(0.1).gain(100).delay({modulates:"frequency",delay:1}).sine().connect("dac");

//start up the sines
__("sine").start();