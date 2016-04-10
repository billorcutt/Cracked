//lowpass filtered brown noise modulates the frequency of the sine
__().
	brown().
	lowpass({frequency:20,q:30}).
	gain({gain:1000,modulates:"frequency"}).
	sine(40).
	dac(0.25);
	
//lfo modulates the frequency of the lowpass
__().lfo({frequency:0.15,gain:5}).connect("lowpass");

//start sine, brown noise & lfo
__("sine,brown,lfo").start();