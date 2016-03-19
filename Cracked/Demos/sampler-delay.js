//set up a sampler with a delay & a panner
__().
    sampler({path:"../Sounds/various/stein.mp3",loop:"true"}).
	delay({id:"delay1"}).
	panner(1).
    dac();

//add another delay to a another panner
	__("sampler").delay({feedback:1,delay:0.5,id:"delay2"}).gain(0.5).panner(-1).connect("dac");

//lfo to modulate one delay
	__().lfo({type:"sine",modulates:"delay",frequency:0.25,gain:0.20}).connect("#delay2");

//another lfo to modulate the other delay
	__().lfo({type:"sine",modulates:"delay",frequency:0.5,gain:0.15}).connect("#delay1");

//start it
	__.play();