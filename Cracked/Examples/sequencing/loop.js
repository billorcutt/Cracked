//set up sounds
__().sine(70).gain(0).dac(0.125).play();

//loop emits "step" events at 100ms intervals
__.loop(100);

//listening for step events... bind a step event handler to the sine & gain.
//handler iterates over the array passed as the 3rd arg to bind
__("sine,gain").bind("step",function(index,data,array){
  //from the data array
  //if it's a one
  if(data) {
    //noteon - set the sine & gain
    __.frequency(__.random(100,5000)).volume(1);
  } else {
    //gain to 0, noteoff
	__.volume(0);
  }
},[0,1,0,1]);

//start the loop
__.loop("start");

