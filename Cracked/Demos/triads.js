__().sine({class:"s1",frequency:100}).gain({id:"vol1",gain:0.075}).panner(-0.75).overdrive().dac();

__().sine({class:"s1",frequency:300}).connect("#vol1");

__().sine({class:"s1",frequency:500}).connect("#vol1");

__().stepper({gain:100,modulates:"detune",length:2,steps:4,fn:(function(){
  	var arr = [1,5,3,5];
	return function(){
    	return arr.pop();
    };
})()}).connect(".s1");

__().sine({class:"s2",frequency:500}).gain({id:"vol2",gain:0.05}).panner(0.75).connect("overdrive");

__().sine({class:"s2",frequency:300}).connect("#vol2");

__().sine({class:"s2",frequency:500}).connect("#vol2");

__().stepper({gain:100,modulates:"detune",length:1/2,steps:4,fn:(function(){
  var arr = [1,3,5,3];
	return function(){
    	return arr.shift();
    };
})()}).connect(".s2");

__().sine({class:"s3",frequency:300}).gain({id:"vol3",gain:0.075}).lowpass({frequency:500,q:20}).panner(0).connect("overdrive");

__().sine({class:"s3",frequency:900}).connect("#vol3");

__().sine({class:"s3",frequency:1500}).connect("#vol3");

__().stepper({gain:100,modulates:"detune",length:8,steps:2,fn:(function(){
	var arr = [1,3];
	return function(){
		return arr.shift();
	};
})()}).connect(".s3");

__().lfo({frequency:1/8,gain:200,type:"sine"}).connect("lowpass");

__.play();