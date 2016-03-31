__().square(16).lowpass({frequency:100,q:30}).panner().dac();

__().lfo({modulates:"frequency",gain:15,frequency:0.5,type:"sine"}).connect("lowpass");

__().lfo({modulates:"pan",type:"square",gain:1,frequency:0.25,id:"panlfo"}).connect("panner");

__.play();