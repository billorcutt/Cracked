//feedback thing

//input connected to a gain and then to a panner to an output
__().adc().gain().panner().compressor({attack:1,release:0.5}).dac(0.25);

//lfo modulates the panner
__().lfo({gain:1,frequency:1,type:"square",modulates:"pan"}).connect("panner");

//modulates the gain- set the gain on lfo to suit your taste and system
__().lfo({modulates:"gain",gain:100,frequency:10}).connect("gain");

//start it up
__.play();