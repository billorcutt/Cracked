//set up an audio chain to control
__().sine().lowpass().gain().dac().play();

//add a delay in parallel
__("sine").delay().connect("gain");

//use attr() to set any attribute in any combination on a node

//@ 1000ms
setTimeout(function(){
  //set the detune on the sine to 6
	__("sine").attr({"detune":6});  
},1000);
//@ 2000ms
setTimeout(function(){
  	//set the freq & q on the lowpass filter
	__("lowpass").attr({"frequency":200,"q":15});
},2000);
//@ 3000ms
setTimeout(function(){
  //set the level on the gain
	__("gain").attr({"gain":0.5});
},3000);
//@ 4000ms
setTimeout(function(){
  //set the delay params
	__("delay").attr({"delay":0.1,feedback:1});
},4000);
//@ 6000ms
setTimeout(function(){
  //all done
	__("delay").attr({"delay":0,feedback:0});  
	__("sine").stop();
},6000);



