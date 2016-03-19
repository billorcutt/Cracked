//input connected to a panner to an output
__().adc().panner().dac();

//lfo modulates the panner
__().lfo({gain:1,frequency:1,type:"square",modulates:"pan"}).connect("panner");

//start it up
__.play();