/**
 * monosynth - Simple monophonic synth
 *
 * @param {Object} [params] map of optional values
   {
       lfo_type:"sawtooth",
       lfo_intensity:0,
       lfo_speed:5,
       osc_type:"sine",
       osc_frequency:440,
       osc_detune:0,
       lp_q:0,
       lp_frequency:440,
       adsr_envelope:0.5,
       gain_volume:1
   }*/

//create a mono synth and connect it to output
__().monosynth().dac().play();

//call noteon with note number value of 60
__("monosynth").monosynth("noteOn",60);

//call noteon with note number value of 64
setTimeout(function(){
    __("monosynth").monosynth("noteOn",64);
},1000);

//call noteon with note number value of 67
setTimeout(function(){
    __("monosynth").monosynth("noteOn",67);
},2000);

//call noteoff 
setTimeout(function(){
	__("monosynth").monosynth("noteOff");
},3000);