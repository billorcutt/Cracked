__().brown().lowpass().compressor().dac().play()

//loop configured with an interval and a single callback-

//loop args - number, fn
__.loop(500,function(){
  
  //no data, index or array
  	__("lowpass").frequency(__.random(100,1000)).q(__.random(5,50));
  
});

__.loop("start");