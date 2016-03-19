//how many sine waves
var sines = 30;

//create a stub to connect everything to
__().compressor().dac(0.25);

//for loop to create sines->lowpass->panner + an lfo to modulate the lowpass
for(var i=0;i<sines;i++){
  __().
  		sine(__.pitch2freq(
		  //random note from the wholetone scale
    			__.scales("wholetone")[__.random(0,6)]+(__.random(5,10)*12)
  			)
    	).
  		lowpass({frequency:100,id:"lp"+i,q:__.random(1,30)}).
  		panner(__.random(-100,100)/100).
  		connect("compressor");
  //lfo with a very low frequency
  __().lfo({type:"sine",gain:1000,frequency:__.random(1,100)/5000}).connect("#lp"+i);
}  

//start it
__.play();