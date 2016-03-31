//set up some sounds
__().sine({frequency:180,id:"bass"}).lowpass(120).compressor({release:0}).dac(0.5);
__().sine(80).adsr({id:"kick",envelope:0.1}).connect("compressor"); //100ms envelope
__().pink().adsr({id:"snare",envelope:0.05}).connect("compressor"); //50ms
__().white().adsr({id:"hihat",envelope:0.01}).connect("compressor").play(); //10ms
//configure sequencer- emits "step" events every 150ms
__.loop(150);
//bind first sine to step events
//callback iterates thru the data array passed as the 2nd arg to bind
__("#bass").bind("step",function(index,data,array){
  	//freq from data in array
	__.frequency(data);
  //fill array with 16 random values
},__.fill_array(16,function(){
	return __.random(120,240);
}));
//bind to kick
__("#kick").bind("step",function(index,data,array){
   //trigger when there's a one
	if(data) { 
            __.adsr("trigger");
   }
},[1,1,0,0,1,0,1,0]);
//bind to snare
__("#snare").bind("step",function(index,data,array){
	if(data) {
             __.adsr("trigger"); 
   }
},[0,0,0,1,0,0,0,1]);
//bind to hihat
__("#hihat").bind("step",function(index,data,array){
	if(data) {
            __.adsr("trigger");
   }
},[1,1,1,1,1,1,1,1]);
//start it up
__.loop("start");