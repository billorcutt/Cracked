__().square(1/4).lowpass({frequency:100,q:45}).gain(0.25).ring().compressor({release:0.01}).dac();

__().square(4/2).highpass({frequency:6000,q:35}).gain(2).connect("ring");

__().square(4/7).highpass({frequency:6000,q:35}).gain(6).connect("ring");

__().square(7/7).highpass({frequency:6000,q:35}).gain(8).connect("ring");

__().square(10).highpass({frequency:12000,q:15}).gain(3).panner(1).connect("compressor");

__().lfo({modulates:"pan",gain:1,frequency:1/4,type:"square"}).connect("panner");

__.play();