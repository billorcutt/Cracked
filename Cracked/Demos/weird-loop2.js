__().square(4).lowpass({id:"lp1",frequency:1000,q:30}).delay({delay:0.01,feedback:1}).dac(0.25);

__().square(4/4).gain(3).lowpass({frequency:100,q:20}).ring().connect("dac");
  
__().lfo({gain:400,frequency:3,type:"sine"}).connect("#lp1");
  
__.play();