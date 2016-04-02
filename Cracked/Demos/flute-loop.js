__().sine({id:"sin1"}).lowpass({id:"lp1"}).panner(1).compressor({release:0.05}).dac(0.5);
__().sine({id:"sin2"}).lowpass({id:"lp2"}).panner(-1).compressor({release:0.05}).dac(0.5);

var time = 200,
    freq = 0,
    freq2 = 0;

__.loop({interval:time},function() {
	
	freq= __.random(600,1200);
	__("#sin1").ramp(freq,(time/1000),"frequency");
	__("#lp1").ramp(freq,(time/1000),"frequency").q(__.random(0,60));

	freq2= __.random(600,1200);   
	__("#sin2").ramp(freq2,(time/1000),"frequency");
	__("#lp2").ramp(freq2,(time/1000),"frequency").q(__.random(0,60));
	
},[]);

__.loop("start").play();


