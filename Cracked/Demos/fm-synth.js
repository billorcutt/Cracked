__().sine({id:"carrier"}).adsr({id:"env1"}).gain().dac();

__().sine({class:"lfo1"}).gain({class:"lfo1"}).adsr({id:"env2",modulates:"frequency"}).connect("#carrier");

__().sine({class:"lfo2"}).gain({class:"lfo2"}).adsr({id:"env3",modulates:"frequency"}).connect("#carrier");

__.random_interval(function(t){
  	__("#carrier").frequency(__.random(10,100));
	__(".lfo1").frequency(__.random(10,1000)).volume(__.random(100,1000));
	__(".lfo2").frequency(__.random(10,1000)).volume(__.random(100,1000)); 
  	__("#env1").adsr("trigger",t/1000);
   	__("#env2").adsr("trigger",__.random_envelope(t/1000));
    __("#env3").adsr("trigger",__.random_envelope(t/1000));
},100,2000);

__.play();