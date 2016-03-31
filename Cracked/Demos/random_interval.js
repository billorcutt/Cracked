//convenience
var r = __.random;

//set up basic sound one. wrap in a macro to namespace it
__().begin("m1").monosynth().overdrive().panner().end("m1").dac();

//call a function at a random interval
__.random_interval(function(time){
  //time until next call.
  var t = time/r(1000,2000);
  //call noteon 
  __("m1 monosynth").monosynth("noteOn",{pitch:r(20,90),envelope:t,velocity:r(10,127)});
  //ramp freq on the lowpass, set the q
  __("m1 monosynth lowpass").ramp(r(10,1000),t,"frequency",r(10,1000)).q(r(10,60));
  //set the lfo freq and intensity
  __("m1 monosynth lfo").frequency(r(1,20)).volume(r(1000,5000));
  //set overdrive level
  __("m1 overdrive").drive(r(0,1000));
    //pan it
  __("m1 panner").ramp(r(-100,100)/100,t,"pan",0);
  
},50,300);

//set up basic sound two. wrap in a macro to namespace it
__().begin("m2").monosynth().overdrive().panner().end("m2").connect("dac").play();

//call a function at a random interval
__.random_interval(function(time){
  //time until next call.
  var t = time/r(1000,2000);
  //call noteon
  __("m2 monosynth").monosynth("noteOn",{pitch:r(20,90),envelope:t,velocity:r(10,127)});
  //ramp freq on the lowpass, set the q
  __("m2 monosynth lowpass").ramp(r(10,1000),t,"frequency",r(10,1000)).q(r(10,60));
  //set the lfo freq and intensity
  __("m2 monosynth lfo").frequency(r(1,20)).volume(r(1000,5000));
  //set overdrive level
  __("m1 overdrive").drive(r(0,1000));
  //pan it
  __("m2 panner").ramp(r(-100,100)/100,t,"pan",0);

},50,300);

