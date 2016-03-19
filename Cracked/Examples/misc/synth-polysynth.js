/**
 * polysynth
 *
 * Simple polyphonic synth
 *
 * @param {Object} [params] map of optional values
   expected format
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
   } 
 */

//create and connect a polysynth to output
__().polysynth().dac().play();

//play a chord
__("polysynth").polysynth("noteOn",60);
__("polysynth").polysynth("noteOn",64);
__("polysynth").polysynth("noteOn",67);

//call noteoff after three seconds
setTimeout(function(){
  __("polysynth").polysynth("noteOff",60);
  __("polysynth").polysynth("noteOff",64);
  __("polysynth").polysynth("noteOff",67);
},3000);