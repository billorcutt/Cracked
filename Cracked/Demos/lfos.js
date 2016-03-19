//lfo's modulating lfo's modulating sines
__().lfo({frequency:4,type:"sine",gain:20,id:"lfo1"}).sine().waveshaper(1).dac();
__().lfo({frequency:0.15,modulates:"gain",gain:150,type:"sine"}).connect("#lfo1");

__().lfo({frequency:2,type:"sine",gain:10,id:"lfo2"}).sine().connect("waveshaper");
__().lfo({frequency:0.1,modulates:"gain",gain:300,type:"sine"}).connect("#lfo2");

__().lfo({frequency:8,type:"sine",gain:30,id:"lfo3"}).sine().connect("waveshaper");
__().lfo({frequency:0.1,modulates:"gain",gain:500,type:"sine"}).connect("#lfo3");

__("sine,lfo").start();