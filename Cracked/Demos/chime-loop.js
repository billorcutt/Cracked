//set up sounds- sine -> adsr -> delay -> out
__().sine(600).adsr().delay().dac();

//create a reverb & gain and connect to the existing adsr and dac. make play
__("adsr").reverb().gain(.5).connect("dac").play();

//configure the loop. 8 steps, each step 400ms
__.loop({steps:8,interval:400});		

//bind the sine & adsr to the step event
//bind args- event type ("step"), callback(), data array []
__("sine,adsr").bind("step",function(index,data,array) {
//random note from the major scale
    __.frequency(
        __.pitch2freq(
            __.scales("major")[__.random(0,6)] + __.random(5,7) * 12
        )
    );
//trigger based on data from the array we've passed
   if(data) { __.adsr("trigger",0.1); }

},[1,1,0,0,1,0,0,1]);

//start the sequence
__.loop("start");