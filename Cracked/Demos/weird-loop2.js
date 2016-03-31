//sine wave w lowpass & delay
__().square(4).lowpass({id:"lp1",frequency:1000,q:30}).delay({delay:0.01,feedback:1.1}).dac(0.25);

//kick = distorted square wave click thru lowpass & ring modulator
__().square(4/4).gain(3).lowpass({frequency:100,q:20}).ring().connect("dac");
  
//modulate lowpass on the sine
__().lfo({gain:400,frequency:3,type:"sine"}).connect("#lp1");

//modulates the delay
__().lfo({modulates:"delay",gain:1/512,frequency:1/8,type:"square"}).connect("delay");
  
__.play();