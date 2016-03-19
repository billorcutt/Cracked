//create the synth
__().polysynth().dac().play();

//initialize midi
__.midi_init(function(){

  __.midi_noteon(function(data){
    __("polysynth").polysynth("noteOn",{pitch:data[1],velocity:data[2]});
  });

  __.midi_noteoff(function(data){
    __("polysynth").polysynth("noteOff",{pitch:data[1],envelope:1});
  });

  __.midi_control(function(data){
    switch(data[1]) {
      case 0:
        __("polysynth").polysynth("update",{lfo_speed:__.scale(data[2],0,127,0,250,"log")});
        break;
      case 1:
        __("polysynth").polysynth("update",{lfo_intensity:__.scale(data[2],0,127,0,1000,"log")});
        break;
      case 2:
        __("polysynth").polysynth("update",{lp_frequency:__.scale(data[2],0,127,0,1000,"log")});
        break;
      case 3:
        __("polysynth").polysynth("update",{lp_q:__.scale(data[2],0,127,0,100,"log")});
        break;
    }
  });

});