__().brown().lowpass().compressor().dac().play()

//loop args- interval, steps, callback, data array
__.loop({interval:500,steps:12},function(index,data,array){
  
    //index, data & array passed to the function
	console.log(index,data,array);
  	__("lowpass").frequency(__.random(100,1000)).q(__.random(5,50));

},[1,2,3,4,5,6,7,8,9,10,11,12]);

__.loop("start");


