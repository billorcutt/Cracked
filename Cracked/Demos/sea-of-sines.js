//create a stub with a compressor, reverb & an output
__().compressor().reverb().out(0.5);

//declare & assign some variables:
//number of voices, between 6 & 24
var voices = __.random(6,25),
    //pointer to random function to save on typing
    r = __.random,
    //major scale
    maj = __.scales("major");

//loop and create voices to connect to stub above
for(var i=0;i<voices;i++) {
  
  //freq for this voice from the major scale
  var freq = __.pitch2freq(maj[r(0,maj.length-1)] + (r(1,6)*12));
  //direction to pan, L or R
  var dir = r(0,100) > 50 ? 1 : -1;
  //position the sound in the stereo field
  dir = r(1,100)/100 * dir;
  //type of oscillator- other options: square, sawtooth
  var type = r(0,100) > 50 ? "sine" : "triangle";
  
  //lfo to modulate the frequency of the voice, then the voice itself (either sine or triangle), then gain, a panner and connect to the compressor defined above
  __().lfo({frequency:r(0,100)/1000,gain:r(1,200)/70}).osc({type:type,frequency:freq}).gain({gain:0,id:i+"_voice"}).panner({pan:dir,id:i+"_panner"}).connect("compressor");
  //add an additonal lfo to modulate the gain of the voice
  __().lfo({modulates:"gain",frequency:(r(1,100))/1000,gain:r(1,100)/40}).connect("#"+i+"_voice");
  //add one last lfo to modulate the voice's panner
  __().lfo({modulates:"pan",type:"sine",frequency:r(40,100)/100,gain:1}).connect("#"+i+"_panner");
  
}  

//start the whole thing up
__.play();
