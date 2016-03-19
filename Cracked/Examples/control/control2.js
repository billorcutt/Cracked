//set up sounds to control
__().sine(200).lowpass().gain().dac();
//add a square
__().square(10).connect("lowpass");

//starting and stopping

//start the sine
__("sine").start();

setTimeout(function(){
  //stop the sine
  __("sine").stop();
},1000);

setTimeout(function(){
    //start the square and the sine
  __("sine,square").start();
},2000);

setTimeout(function(){
  //stop the square
  __("square").stop();
},4000);

setTimeout(function(){
  //stop everything;
  __("*").stop();
},6000);