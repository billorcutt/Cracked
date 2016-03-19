//set up sounds- lfo->sine->lowpass->adsr->out
//10 second envelope on the adsr
__().lfo().sine(300).lowpass({q:30}).adsr(10).dac(0.25).play();

//start the envelope
__("adsr").adsr("trigger");

//ramp the frequency of the lfo. 10 to 100, back to 10 
__("lfo").ramp([100,10],[5,5],"frequency",10);

//ramp the frequency of the lowpass. 900 to 150, back to 900 
__("lowpass").ramp([150,900],[5,5],"frequency",900);