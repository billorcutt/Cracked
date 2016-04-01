__().brown().lowpass().compressor().dac().play()

//simplest loop configuration, just an interval. callbacks are bound separately to selected nodes

//loop args - number only
__.loop(500);

//bind a callback to the lowpass filter
__("lowpass").bind("step",function(index,data,array){
  
  	//index, data & array passed to the function
	console.log(index,data,array);
  	__("lowpass").frequency(__.random(100,1000)).q(__.random(5,50));
  
},[1,2,3,4]);

__.loop("start");