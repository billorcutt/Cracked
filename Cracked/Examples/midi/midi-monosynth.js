//create the synth
__().monosynth().dac().play();

//initialize midi
__.midi_init(function(){
	//call noteon
  __.midi_noteon(function(data){
    __("monosynth").monosynth("noteOn",{pitch:data[1],velocity:data[2]});
  });
	//call noteoff
  __.midi_noteoff(function(data){
    __("monosynth").monosynth("noteOff",{pitch:data[1],envelope:0.25});
  });
	//handle midi control messagaes
  __.midi_control(function(data){
    switch(data[1]) {
      case 0:
        __("monosynth lfo").frequency(__.scale(data[2],0,127,0,250,"log"));
        break;
      case 1:
        __("monosynth lfo").volume(__.scale(data[2],0,127,0,1000,"log"));
        break;
      case 2:
        __("monosynth lowpass").frequency(__.scale(data[2],0,127,0,1000,"log"));
        break;
      case 3:
        __("monosynth lowpass").q(__.scale(data[2],0,127,0,100,"log"));
        break;
    }
  });

});