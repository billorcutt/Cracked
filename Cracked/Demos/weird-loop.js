//resonant bass pulse
__().square(1/4).lowpass({frequency:100,q:45}).gain(0.25).ring().compressor({release:0.01}).dac();

//hats sound
__().square(4/2).highpass({frequency:6000,q:35}).gain(2).connect("ring");

//hats, offbeat
__().square(4/7).highpass({frequency:6000,q:35}).gain(6).connect("ring");

//hats, resonant fill
__().square(7/7).highpass({frequency:6000,q:50}).gain(8).connect("ring");

//chatter
__().square(10).highpass({frequency:12000,q:15}).gain(3).panner(1).connect("compressor");

//modulate the pan position
__().lfo({modulates:"pan",gain:1,frequency:1/4,type:"square"}).connect("panner");

//start
__.play();