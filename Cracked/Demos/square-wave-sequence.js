//configure the loop- emits step events every 100ms
__.loop(100);

//set up the sounds = square->adsr->ring->compressor->dac
__().square(90).adsr().lowpass({q:30}).ring().compressor({release:0.1}).dac().play();

//bind adsr & lowpass to the "step" event
__("adsr,lowpass").bind("step",function() {

  //trigger the adsr
  __.adsr("trigger",0.05);
  //ramp the frequency on the lowpass
  __.ramp(50,0.05,"frequency",500);

},[1]);

//bind square to the "step" event
__("square").bind("step",function(index,data,array) {

  //set the square wave to a random frequency
  __.frequency(__.random(100,1000));

},[1]);

//start it
__.loop("start");