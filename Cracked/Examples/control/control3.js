//set up an audio chain to control
__().sine().lowpass().gain().overdrive({drive:0}).panner().dac().play();

//add a delay in parallel
__("sine").delay().connect("gain");

//use shorthand controllers
setTimeout(function(){
    __("sine").detune(6);
},1000);

setTimeout(function(){
    __("sine").frequency(240);
},1500);

setTimeout(function(){
    __("lowpass").q(15);
},2000);

setTimeout(function(){
    __("lowpass").frequency(200);
},2500);

setTimeout(function(){
    __("gain").volume(0.5);
},3000);

setTimeout(function(){
    __("overdrive").drive(1);
},3500);

setTimeout(function(){
    __("delay").feedback(2);
},4000);

setTimeout(function(){
    __("delay").time(0.01);
},4500);

setTimeout(function(){
    __("panner").pan(-1);
},5000);

setTimeout(function(){
    __("panner").pan(1);
},5500);

setTimeout(function(){
    __("panner").pan(0);
},6000);

setTimeout(function(){
    __("delay").time(0);
    __("delay").feedback(0);
    __("sine").stop();
},6500);



