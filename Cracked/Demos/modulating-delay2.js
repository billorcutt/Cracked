//slow clicking square wave- gain to distort
__().square(1/2).gain(2).lowpass({frequency:200,q:40}).compressor({attack:0,release:0.01}).dac();

//parallel delay
__("lowpass").delay({delay:0,feedback:1}).connect("dac");

//first lfo to modulate the delay time
__().lfo({id:"lfo1",modulates:"delay",gain:0.1,frequency:0.5}).connect("delay");

//second lfo to modulate the intensity of the first lfo
__().lfo({modulates:"gain",gain:1,frequency:0.1}).connect("#lfo1");

//start it
__().play();