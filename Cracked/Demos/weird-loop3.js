__().square({frequency:160,id:"sq1"}).lowpass({q:30,frequency:600}).dac(0.5);

__().lfo({gain:500,frequency:4,type:"sine"}).connect("lowpass");

__().square(4/2).gain(30).lowpass({frequency:100,q:30}).connect("dac");

__().square(4/4).connect("gain");

__().lfo({gain:100,frequency:1/4,type:"square"}).connect("#sq1");

__.play();