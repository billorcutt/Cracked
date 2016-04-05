__().sampler({path:"/Sounds/various/gun-cock.wav",speed:1/4,start:0.15}).dac();

//play the sample every 200ms
__.loop(400,function(){
  //need to stop before you can start
	__("sampler").stop().start();
});

//start loop
__.loop("start");